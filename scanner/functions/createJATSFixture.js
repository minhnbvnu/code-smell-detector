function createJATSFixture ({ front = EMPTY_META, body = '', back = '' }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE article PUBLIC "${DEFAULT_JATS_SCHEMA_ID}" "${DEFAULT_JATS_DTD}">
<article xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ali="http://www.niso.org/schemas/ali/1.0">
  <front>
    ${front}
  </front>
  <body>
    ${body}
  </body>
  <back>
    ${back}
  </back>
</article>`
}