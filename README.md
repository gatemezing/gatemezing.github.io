gatemezing.github.io
=====================

This repository hosts the site served at [gatemezing.github.io](https://gatemezing.github.io/).

## Pages

- **[index.html](index.html)** &mdash; License Checker Tool. An online demo such that a
  user who has just created a dataset, using certain ontologies, can provide the dataset
  to the system, which retrieves the licenses associated with the used vocabularies
  (through [LOV](https://lov.linkeddata.es/)) and returns the licensing terms you are
  allowed to associate with the dataset w.r.t. the licenses on the vocabularies used to
  build it.
- **[voidChecker.html](voidChecker.html)** &mdash; VoID Checker. Paste a
  [VoID](https://www.w3.org/TR/void/) dataset description and check the licenses declared
  for the vocabularies it uses.
- **[about.html](about.html)** &mdash; About page, with a short bio and a link to the full
  personal site at [atemezing.org](http://atemezing.org/).

## Structure

- `css/` &mdash; Bootstrap stylesheet
- `js/` &mdash; SPARQL query helpers, license-checking logic, and vendored libraries
  (jsonld.js, n3-browser.min.js, bootstrap.js)

## Note

The License Checker and VoID Checker tools query external SPARQL endpoints (LOV, and an
Eurecom-hosted endpoint) that date back to their original 2014 demo. If a query doesn't
return results, the endpoint it depends on may no longer be reachable.
