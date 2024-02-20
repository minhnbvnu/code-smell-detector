function getLinks(title, callback, plcontinue, links) {
    links = links || [];

    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        prop: 'links',
        pllimit: 'max',
        plcontinue: plcontinue,
        titles: title,
        format: 'json'
      },
      headers: { 'Api-User-Agent': 'M_6_2_01 (http://www.generative-gestaltung.de/; info@generative-gestaltung.de)' },
      dataType: 'jsonp',
      success: function(data) {
        var ids = Object.keys(data.query.pages);
        // Add the returned links to the array
        links = links.concat(data.query.pages[ids[0]].links);

        if (data.continue) {
          // A maximum of 500 results will be returned by Wikipedia,
          // so there might be some more requests necessary to get all results
          getLinks(title, callback, data.continue.plcontinue, links);

        } else {
          // If all is collected, deliver the results to the callback function
          callback(links);
        }
      }
    });
  }