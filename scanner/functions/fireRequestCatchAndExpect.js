function fireRequestCatchAndExpect(expectation) {
          axios('/foo').catch(function(data) {
            // dont handle result
          });
          getAjaxRequest().then(function (request) {
            request.respondWith({
              status: 200,
              responseText: 'OK'
            });

            setTimeout(function() {
              expectation()
            }, 100);
          });
        }