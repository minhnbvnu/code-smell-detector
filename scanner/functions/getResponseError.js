async function getResponseError(response) {
    let message = `Failed to fetch resource ${response.url} (${response.status}): `;
    try {
      const contentType = response.headers.get("Content-Type");
      let text = response.statusText;
      if (contentType.includes("application/json")) {
        text += ` ${await response.text()}`;
      }
      message += text;
      message = message.length > 60 ? `${message.slice(60)}...` : message;
    } catch (error) {
    }
    return message;
  }