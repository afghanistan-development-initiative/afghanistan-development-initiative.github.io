# ADI repository architecture

ADI should use a hybrid structure.

The central website repository remains the public hub:

- `index.html` - public project page and lightweight embedded prototype dashboard.
- `data/modules.json` - registry of every ADI tool, dashboard, map layer and workstream.
- `data/sources.json` - registry of official and authoritative data sources.
- `publications/` - policy briefs and research notes.
- `docs/` - architecture, methodology and data standards.

## When to keep something in this repository

Keep work inside this repository when it is:

- static content
- a public explanation page
- a lightweight prototype
- a shared data schema
- a source registry
- a policy brief or research note
- a small JSON/CSV dataset used by the public page

Examples:

- the ADI Action Atlas overview
- the province evidence prototype
- official source registry
- module registry
- publication landing pages

## When to create a separate GitHub repository

Create a separate repository when a module becomes a real tool or dashboard with:

- its own app framework, such as Streamlit, Flask, FastAPI, React or Dash
- data processing scripts
- scheduled updates
- large datasets
- separate deployment
- separate tests
- different maintainers or collaborators
- tool-specific documentation

Examples:

- `soilsense`
- `watersense`
- `economysense`
- `cropzone-mapper`
- `energysense`
- `adi-ai-assistant`
- future `education-society-atlas`

## Connection rule

Every separate repository should connect back to the hub through:

1. A registry entry in `data/modules.json`.
2. A source entry in `data/sources.json` for every official dataset it uses.
3. A methodology file in that tool repository.
4. A public app URL when deployed.
5. A short output list: map layers, indicators, calculations and reports.

## Data-quality rule

ADI must separate:

- official data
- authoritative international data
- scientific satellite data
- humanitarian operational data
- modelled estimates
- ADI prototype scores
- field-validated observations

Prototype scores must never be presented as official rankings.

## Suggested repository layout for each real tool

```text
tool-name/
  README.md
  app.py or src/
  data/
    raw/          # ignored when large
    processed/    # publish only safe small outputs
  docs/
    METHODOLOGY.md
    SOURCES.md
  tests/
  requirements.txt
  .github/workflows/
```

## Build priority

1. Keep the ADI hub credible and source-aware.
2. Move live tools into their own repositories.
3. Build a shared province/district boundary and indicator schema.
4. Add repeatable pipelines for official data downloads.
5. Add print-ready dashboard exports and policy brief outputs.
