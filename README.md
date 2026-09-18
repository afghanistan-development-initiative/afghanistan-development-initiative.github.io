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

- `index.html` - public ADI site and embedded prototype dashboard
- `tools/index.html` - ADI tool hub connected to module and indicator data
- `data/modules.json` - registry of ADI tools, modules and workstreams
- `data/sources.json` - registry of official and authoritative data sources
- `data/afghanistan_indicators.json` - first official Afghanistan indicator layer from the World Bank WDI API
- `docs/ARCHITECTURE.md` - rules for when to use one file, one folder or a separate repository
- `docs/DATA_PIPELINE.md` - data levels, build order and near-term pipeline plan
- `publications/` - policy briefs and research notes

## Principle

ADI should always separate official data, authoritative open data, scientific satellite data, humanitarian operational data, modelled estimates and ADI prototype scores.
