# ADI data pipeline

This hub separates public strategy pages from working datasets and application pipelines.

## Data levels

1. Official national indicators: World Bank WDI, FAO, WHO/UNICEF JMP, UNESCO, UN agencies and national statistical releases where available.
2. Humanitarian and boundary layers: OCHA HDX administrative boundaries, population grids and operational datasets.
3. Scientific and satellite layers: SoilGrids, CHIRPS rainfall, Sentinel vegetation indices, GRACE groundwater signals and Global Solar Atlas.
4. ADI model outputs: suitability scores, risk classes, opportunity indices and assistant summaries. These must always cite the source inputs and method.
5. Prototype scores: early planning values used for design and prioritisation. These cannot be presented as official facts.

## Current public data files

- `data/modules.json`: ADI module registry, live app links, planned repositories, maps and outputs.
- `data/sources.json`: source registry and classification.
- `data/afghanistan_indicators.json`: first official Afghanistan national indicator layer from the World Bank WDI API.

## Build order

1. Keep the ADI hub as the public catalogue, documentation and lightweight prototype layer.
2. Keep each serious tool in a separate repository when it has a unique data pipeline or app deployment.
3. Publish static starter data in this hub first, then move heavy geospatial processing into tool repositories.
4. Every dashboard card should show the source, latest year, method type and whether the value is official, modelled or prototype.

## Near-term tool builds

- SoilSense: connect SoilGrids properties to province and district soil recovery profiles.
- WaterSense: add AQUASTAT, JMP, CHIRPS and GRACE layers for basin and groundwater analysis.
- EconomySense: expand WDI indicators and add trade, market access and livelihood layers.
- CropZone Mapper: add Sentinel NDVI, rainfall, land cover and irrigation opportunity layers.
- EnergySense: add Global Solar Atlas, electricity access, mini-grid and productive-use filters.
- Education & Society Atlas: add school, youth, gender, displacement, population and digital access layers.
- ADI AI Assistant: answer from approved ADI data files, policy briefs and tool outputs in Dari, Pashto, Dutch and English.
