                search.query('cat').end(function(err, ids){
                  if (err) { throw err; }
                  ids.should.be.empty;
                  --pending || done();
                });