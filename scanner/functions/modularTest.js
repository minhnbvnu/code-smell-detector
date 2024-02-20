function modularTest(next) {
  var
    start               = new Date(),
    writeIndexTestProp  = 'rand'+Math.random(),
    deleteIndexTestProp = 'delete-'+writeIndexTestProp,
    testString          = 'trent toronto',
    search,
    /* this is an example of doing a non-phoentic implementation */
    nonPhoneticKeys     = function(key, words){
      return words.map(function(c){
        return key + ':word:' + c.toUpperCase();
      });
    },
    nonPhoneticMap      = function(words){
      var
        obj = {},
        len,
        i;
      if (!words) { return obj; } else {
        len = words.length;
        for (i = 0; i < len; i += 1) {
          obj[words[i]] = words[i].toUpperCase();
        }
        return obj;
      }
    },
    //normally, the natural language processing routine in reds will both stem and convert the stemmed words to metaphones
    //here we've replaced it with the simplifed `customProcessor` which only stems, but no metaphone processing
    customProcessor     = function(str, key) {
      var words = reds.stem(reds.stripStopWords(reds.words(str)));
      var counts = reds.countWords(words);
      var map = nonPhoneticMap(words);
      var keys = Object.keys(map);
      var metaphoneKeys = !key ? null : nonPhoneticKeys(key, words);

      return {
        words   : words,
        counts  : counts,
        map     : map,
        keys    : keys,
        metaphoneKeys
                : metaphoneKeys
      };
    };



  console.log('Starting modular test');
  reds.client.quit();

  //this test is not using the redis connection by effectively dumbing the writeIndex and removeIndex,
  //we then know that it's using the modular functions.
  reds.setClient('this is not valid');

  search = reds.createSearch('reds',{
    nlpProcess : customProcessor,
    writeIndex : function(db, id, key, nlpObj) {
      var cmds = [];
      nlpObj.keys.forEach(function(word){
        cmds.push(['zadd', key + ':word:' + nlpObj.map[word], nlpObj.counts[word], id]);
        cmds.push(['zadd', key + ':object:' + id, nlpObj.counts[word], nlpObj.map[word]]);
      });
      //we actually aren't writing anything to redis here - this will only work work if the writeIndex is being invoked from here not from the default one.
      this[writeIndexTestProp] = cmds;
    },
    removeIndex   : function() {
      this[deleteIndexTestProp] = true;
    }
  });

  search.index(testString,'x');

  should.exist(search[writeIndexTestProp])

  //with the normal nlpProcessor, 'trent' and 'toronto' will turn into the same metaphones, test ot make sure that isn't happening.
  search[writeIndexTestProp]
    .should
    .eql([  [ 'zadd', 'reds:word:TRENT', 1, 'x' ],
            [ 'zadd', 'reds:object:x', 1, 'TRENT' ],
            [ 'zadd', 'reds:word:TORONTO', 1, 'x' ],
            [ 'zadd', 'reds:object:x', 1, 'TORONTO' ] ]);

  search.remove('trent toronto','x');

  should.exist(search[deleteIndexTestProp]);


  reds.setClient(redis.createClient(connectionObj));
  search = reds.createSearch('reds-custom',{
    nlpProcess : customProcessor
  });

  search
    .index('trent','x')
    .index('toronto','y', function() {
      search
        .query('trent')
        .end(function(err,results) {
          if (err) { throw err; }
          results.should.eql(['x']); //if it was using the standard nlpParser then it would be ['x','y']
          console.log('  completed in %dms', new Date() - start);

          next();
        });
    });
}