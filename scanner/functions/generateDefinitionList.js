function generateDefinitionList(obj) {
  let html = "";
  for (const key in obj) {
    const value = obj[key];
    html += `<dt>${key}:</dt>`;
    if (typeof value === "object" && value !== null) {
      html += `<dd><dl>${generateDefinitionList(value)}</dl></dd>`;
    } else {
      html += `<dd>${value}</dd>`;
    }
  }
  return html;
}