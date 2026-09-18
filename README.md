# Afghanistan Development Initiative (ADI)

Official public hub for the Afghanistan Development Initiative: open data, research, policy briefs, national maps and decision tools for Afghanistan's development.

## Repository role

This repository is the ADI hub. It contains:

- the public website
- lightweight embedded dashboard prototypes
- policy brief pages
- shared module and source registries
- architecture and documentation

Serious dashboards and applications should live in separate repositories once they need their own code, data pipelines, deployment or maintenance.

## Key files

- `index.html` - public ADI site and embedded prototype dashboard
- `data/modules.json` - registry of ADI tools, modules and workstreams
- `data/sources.json` - registry of official and authoritative data sources
- `docs/ARCHITECTURE.md` - rules for when to use one file, one folder or a separate repository
- `publications/` - policy briefs and research notes

## Principle

ADI should always separate official data, authoritative open data, scientific satellite data, humanitarian operational data, modelled estimates and ADI prototype scores.
