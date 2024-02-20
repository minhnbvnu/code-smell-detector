function makeQuery(err, client, done, callback) {
  // Increment expected number of events
  expectedEvents++;

  if (err) {
    return console.error('error fetching client from pool', err);
  }

  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    // call `done()` to release the client back to the pool
    done();

    if (err) {
      return console.error('error running query', err);
    }

    // console.log(result.rows[0].number);
    // output: 1
    if (callback != null) {
      callback();
    }
  });
}