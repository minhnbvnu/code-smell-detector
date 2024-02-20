function create_unique_transaction(test) {
        var uniquifier = String(next_index++);
        var url = 'http://example.com/' + uniquifier;

        return {
          request: new Request(url),
          response: new Response('hello'),
          url: url
        };
      }