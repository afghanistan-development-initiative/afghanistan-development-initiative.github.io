const fs = require('fs');

const shpPath = process.argv[2];
const dbfPath = process.argv[3];
const outPath = process.argv[4];
const tolerance = Number(process.argv[5] || 0.018);

if (!shpPath || !dbfPath || !outPath) {
  console.error('Usage: node scripts/convert_adm1_shp.js input.shp input.dbf output.geojson [tolerance]');
  process.exit(1);
}

function parseDbf(file) {
  const b = fs.readFileSync(file);
  const recordCount = b.readUInt32LE(4);
  const headerLength = b.readUInt16LE(8);
  const recordLength = b.readUInt16LE(10);
  const fields = [];
  let offset = 32;

  while (offset < headerLength && b[offset] !== 0x0d) {
    const rawName = b.slice(offset, offset + 11).toString('ascii').replace(/\0/g, '').trim();
    fields.push({
      name: rawName,
      type: String.fromCharCode(b[offset + 11]),
      length: b[offset + 16],
      decimal: b[offset + 17]
    });
    offset += 32;
  }

  const records = [];
  for (let i = 0; i < recordCount; i++) {
    const start = headerLength + i * recordLength;
    if (b[start] === 0x2a) continue;
    const row = {};
    let fieldOffset = start + 1;
    for (const field of fields) {
      const raw = b.slice(fieldOffset, fieldOffset + field.length).toString('utf8').trim();
      row[field.name] = field.type === 'N' && raw !== '' ? Number(raw) : raw;
      fieldOffset += field.length;
    }
    records.push(row);
  }
  return records;
}

function perpendicularDistance(point, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  if (dx === 0 && dy === 0) {
    return Math.hypot(point[0] - start[0], point[1] - start[1]);
  }
  const t = ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / (dx * dx + dy * dy);
  const x = start[0] + t * dx;
  const y = start[1] + t * dy;
  return Math.hypot(point[0] - x, point[1] - y);
}

function simplify(points, eps) {
  if (points.length <= 4) return points;
  const closed = points[0][0] === points[points.length - 1][0] && points[0][1] === points[points.length - 1][1];
  const work = closed ? points.slice(0, -1) : points.slice();
  if (work.length <= 3) return points;

  function rdp(slice) {
    let maxDist = 0;
    let index = 0;
    const end = slice.length - 1;
    for (let i = 1; i < end; i++) {
      const dist = perpendicularDistance(slice[i], slice[0], slice[end]);
      if (dist > maxDist) {
        maxDist = dist;
        index = i;
      }
    }
    if (maxDist > eps) {
      return rdp(slice.slice(0, index + 1)).slice(0, -1).concat(rdp(slice.slice(index)));
    }
    return [slice[0], slice[end]];
  }

  const simplified = rdp(work);
  if (closed) simplified.push(simplified[0]);
  return simplified.length >= 4 ? simplified : points;
}

function parseShp(file) {
  const b = fs.readFileSync(file);
  const records = [];
  let offset = 100;

  while (offset < b.length) {
    const contentLength = b.readInt32BE(offset + 4) * 2;
    const start = offset + 8;
    const shapeType = b.readInt32LE(start);
    if (shapeType !== 5 && shapeType !== 15) {
      offset = start + contentLength;
      continue;
    }

    const numParts = b.readInt32LE(start + 36);
    const numPoints = b.readInt32LE(start + 40);
    const partsOffset = start + 44;
    const parts = [];
    for (let i = 0; i < numParts; i++) parts.push(b.readInt32LE(partsOffset + i * 4));
    const pointsOffset = partsOffset + numParts * 4;
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const p = pointsOffset + i * 16;
      points.push([Number(b.readDoubleLE(p).toFixed(6)), Number(b.readDoubleLE(p + 8).toFixed(6))]);
    }

    const rings = parts.map((partStart, i) => {
      const partEnd = i + 1 < parts.length ? parts[i + 1] : points.length;
      return simplify(points.slice(partStart, partEnd), tolerance);
    }).filter(ring => ring.length >= 4);

    records.push(rings);
    offset = start + contentLength;
  }

  return records;
}

const geometries = parseShp(shpPath);
const properties = parseDbf(dbfPath);

const features = geometries.map((rings, index) => {
  const props = properties[index] || {};
  return {
    type: 'Feature',
    properties: props,
    geometry: { type: 'Polygon', coordinates: rings }
  };
});

const collection = {
  type: 'FeatureCollection',
  source: 'OCHA HDX COD-AB Afghanistan administrative boundaries, ADM1 province layer',
  generated_by: 'scripts/convert_adm1_shp.js',
  features
};

fs.writeFileSync(outPath, JSON.stringify(collection));
console.log(`Wrote ${features.length} features to ${outPath}`);
