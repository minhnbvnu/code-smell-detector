function clientQuery(index) {
  // Add to connections array
  connections.push({ number: index, returned: false });

  createClient(function(err, client) {
    if (err) {
      console.log('Error connecting to postgres: ', err);
    } else {
      // Make multiple queries on this client
      // Here we will make 9 queries, so we expect to see 9 events
      // emited for this client.
      // Make three asynchronous sets of three synchronous queries
      var FIRST_BLOCK_RETURNED = false;
      var SECOND_BLOCK_RETURNED = false;
      var THIRD_BLOCK_RETURNED = false;
      makeQuery(client, function(result) {
        makeQuery(client, function(result) {
          makeQuery(client, function(result) {
            blockReturned(0, index);
          });
        });
      });

      makeQuery(client, function(result) {
        makeQuery(client, function(result) {
          makeQuery(client, function(result) {
            blockReturned(1, index);
          });
        });
      });

      makeQuery(client, function(result) {
        makeQuery(client, function(result) {
          makeQuery(client, function(result) {
            blockReturned(2, index);
          });
        });
      });
    }
    function blockReturned(blockNumber, index) {
      if (blockNumber == 0) {
        FIRST_BLOCK_RETURNED = true;
      } else if (blockNumber == 1) {
        SECOND_BLOCK_RETURNED = true;
      } else if (blockNumber == 2) {
        THIRD_BLOCK_RETURNED = true;
      }

      // Callback for this connection
      if (FIRST_BLOCK_RETURNED && SECOND_BLOCK_RETURNED && THIRD_BLOCK_RETURNED) {
        // We are finished with this client
        client.end();
        finishedTesting(index);
      }
    }
  });
}