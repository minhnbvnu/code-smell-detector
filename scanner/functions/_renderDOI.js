function _renderDOI ($$, doi) {
  return $$('a').attr({
    href: `https://doi.org/${doi}`,
    target: '_blank'
  }).append(
    'https://doi.org/',
    doi
  )
}