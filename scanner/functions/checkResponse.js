async function checkResponse(response) {
    if (!response.ok) {
      const message = await getResponseError(response);
      throw new Error(message);
    }
  }