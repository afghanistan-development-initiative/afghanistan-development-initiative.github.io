# Afghanistan Development Initiative (ADI)

Official public hub for the Afghanistan Development Initiative: open data, research, policy briefs, national maps and decision tools for Afghanistan's development.

## Repository role

This repository is the ADI hub. It contains:

- the public website
- lightweight embedded dashboard prototypes
- a public tool hub for module launch pages and starter datasets
- policy brief pages
- shared module and source registries
- architecture and documentation

Serious dashboards and applications should live in separate repositories once they need their own code, data pipelines, deployment or maintenance.

## Key files

- `index.html` - simple public ADI landing page that routes visitors to sectors, tools, map/data and publications
- `tools/index.html` - ADI tool hub connected to module and indicator data
- Tool Hub map language support - English, Afghanistan Dari (`prs-AF`) and Pashto (`ps-AF`) for the public map interface
- `sectors/` - simple sector pages so the homepage stays readable while each sector can go deeper
- `data/modules.json` - registry of ADI tools, modules and workstreams
- `data/sources.json` - registry of official and authoritative data sources
- `data/afghanistan_indicators.json` - first official Afghanistan indicator layer from the World Bank WDI API
- `data/afghanistan_provinces.geojson` - simplified ADM1 province boundaries generated from the OCHA/HDX COD-AB shapefile
- `data/afghanistan_province_priorities.json` - prototype province atlas layer for map priorities, gaps and tool routing
- `docs/ARCHITECTURE.md` - rules for when to use one file, one folder or a separate repository
- `docs/DATA_PIPELINE.md` - data levels, build order and near-term pipeline plan
- `publications/` - policy briefs and research notes
- `scripts/convert_adm1_shp.js` - local converter used to build the lightweight province GeoJSON

## Principle

ADI should always separate official data, authoritative open data, scientific satellite data, humanitarian operational data, modelled estimates and ADI prototype scores.
