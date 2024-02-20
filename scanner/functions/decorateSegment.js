function decorateSegment({ shim, result, apiKey }) {
  const segment = shim.getActiveSegment()

  if (segment) {
    segment[openAiApiKey] = apiKey

    // If the result is an error, which is an OpenAI client error, then
    // the headers are provided via a proxy attached to `result.headers`.
    // Otherwise, result is a typical response-like object.
    const headers = result?.response?.headers
      ? Object.fromEntries(result.response.headers)
      : { ...result?.headers }
    segment[openAiHeaders] = headers
  }
}