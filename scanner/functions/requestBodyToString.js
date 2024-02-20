async function requestBodyToString(req) {
  try {
    const body = await req.text();
    return !body ? '<no body>' : body;
  } catch (e) {
    console.warn("Could not decode request body", e);
    return "<non-utf8 body>";
  }
}