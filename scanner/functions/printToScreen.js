function printToScreen({ params, state, entity, cache } = {}) {
  const innerHtml = appDiv.innerHTML;
  const label = formatParamLabel(state, entity);
  if (cache) {
    window.electroParams.push({ title: label, json: params });
  }
  let code = `<pre class="language-json"><code class="language-json">${JSON.stringify(
    params,
    null,
    4,
  )}</code></pre>`;
  if (label) {
    code = `<hr>${label}${code}`;
  } else {
    code = `<hr>${code}`;
  }
  appDiv.innerHTML = innerHtml + code;
  window.Prism.highlightAll();
}