async function buildResponseHtml(req) {

  let headers = '';

  for (const [key, value] of req.headers.entries()) {
    headers += `
      <tr>
        <th>${key}</th>
        <td>${value}</td>
      </tr>`;
  }

  const url = new URL(req.url);
  url.searchParams.set('format', 'json');
  const jsonUrl = url.pathname + url.search;

  const reqBody = await requestBodyToString(req);

  let html = `
  <!DOCTYPE html>
  <html>

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
      <title>HTTP-Info - Analyze HTTP requests</title>
    </head>

    <body>
      <section class="section">
        <div class="container">
          <h1 class="title">
            HTTP-Info
          </h1>

          <div class="mb-4">
            <a class="button" href="${jsonUrl}">JSON</a>
          </div>

          <table class="table">
            <thead>
            </thead>

            <tbody>
              <tr>
                <th>URL</th>
                <td>${req.url}</td>
              </tr>
              <tr>
                <th>Method</th>
                <td>${req.method}</td>
              </tr>
              <tr>
                <th>Headers</th>
                <td>
                  <table>
                    <tbody>
                      ${headers}
                    </tbody>
                  </table>
              </tr>
              <tr>
                <th>Body</th>
                <td>${reqBody}</td>
              </tr>
            </tbody>
          </table>

          <div class="message is-info">
            <div class="message-header">
              <p>Info</p>
            </div>
            <div class="message-body content">
              <p>This service provides information about the incoming HTTP request.
              It is useful for debugging and analyzing HTTP clients.</p>

              <p>You can control the output format by:</p>

              <ul>
                <li>Setting the <code>Accept</code> header to <code>application/json</code> or <code>text/html</code></li>
                <li>
                  Setting the <code>?format=XXX</code> query parameter to
                  <code>json</code>, <code>html</code> or <code>echo</code></li>.
              </ul>

              <p>
                By default the output format is <code>html</code>.<br/>
                If the format is <code>echo</code>, the response will contain
                the request headers and body unchanged.
              </p>

            </div>
          </div>

          <article class="message is-link">
            <div class="message-header">
              <p>Wasmer Edge</p>
            </div>
            <div class="message-body">
              This site is hosted on <a href="https://wasmer.io/products/edge">Wasmer Edge</a>.
            </div>
          </article>
        </div>

      </section>
    </body>
  </html>
  `;

  return new Response(html, {
    headers: { "content-type": "text/html" },
  });
}