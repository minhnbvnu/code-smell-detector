function onLoad(event) {
      const client = event.target;
      // status will be 0 for file:// urls
      if (!client.status || (client.status >= 200 && client.status < 300)) {
        let data;
        try {
          data = JSON.parse(client.responseText);
        } catch (err) {
          const message = 'Error parsing response text as JSON: ' + err.message;
          reject(new Error(message));
          return;
        }
        resolve(data);
        return;
      }

      reject(new ResponseError(client));
    }