function failureResponse() {
    console.error(request.url + " not found in Cache!  "+
      "Was it included at the top of service-worker.js ? ");
    return new Response('<h1>Service Unavailable</h1>', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/html'
      })
    });
  }