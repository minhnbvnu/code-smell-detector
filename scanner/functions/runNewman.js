function runNewman (collection, collectionName, done) {
  responses = [];
  newman.run({
    collection: collection
  }).on('beforeItem', function (err, summary) {
    if (err) {
      return done(err);
    }
    console.log('Sending request: ' + summary.item.name);
  }).on('request', function (err, summary) {
    if (err) {
      return done(err);
    }

    var stdout = summary.response.stream.toString();
    try {
      stdout = JSON.parse(stdout);
    }
    catch (e) {
      console.error();
    }

    responses.push(stdout);
    console.log('Done: ' + summary.item.name);
  }).on('done', function (err) {
    if (err) {
      return done(err);
    }
    responseObject[collectionName] = responses;
    return done(null, '\nNewman run complete with no errors for collection ' + collectionName + '\n');
  });
}