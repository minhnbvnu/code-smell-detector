function extractLink(html) {
  const match = html.match(/href="(.*?)"/);
  return match && match[1];
}