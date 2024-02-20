function validHTTPResponse(data) {
    if (data instanceof Response) {
      if (data.status === 204) {
        return false;
      }
    }
    return true;
  }