async function handleOptions (request, env) {
  const headers = request.headers

  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    const respHeaders = {
      ...corsHeaders,
      'Access-Control-Allow-Headers': request.headers.get(
        'Access-Control-Request-Headers'
      )
    }

    return new Response(null, {
      headers: respHeaders
    })
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: 'GET, POST, DELETE, OPTIONS'
      }
    })
  }
}