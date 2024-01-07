function fireRequestAndExpect(expectation) {
        let response;
        axios('/foo').then(function(data) {
          response = data;
        });
        getAjaxRequest().then(function (request) {
          request.respondWith({
            status: 200,
            responseText: 'OK'
          });

          setTimeout(function() {
            expectation(response)
          }, 100);
        });
      }