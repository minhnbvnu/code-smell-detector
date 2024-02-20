function cache_or_http(url,key,doCrypt, expiry) {
        if (!loginData.useAPICaching) {
          debug ('CACHE: Not being used, as it is disabled');
          return $http.get(url);
        }

       // debug ('Inside cache_or_http with key:'+key+' crypt:'+doCrypt+'  exp:'+expiry);
        var d = $q.defer();

        if (!expiry) expiry = 3600;

        return localforage.getItem(key)
        .then (function (cache_data) {
            if (cache_data) {
              debug('CACHE: found for key: '+key+' with expiry of:'+cache_data.expiry+'s');
              data = cache_data.data;
              t = moment(cache_data.time);
              diff = moment().diff(t, 'seconds');
              if (diff >=cache_data.expiry) {
                debug('CACHE: cached value for key:'+key+' has expired as '+diff+' >='+cache_data.expiry);
                return localforage.removeItem(key)
                .then(function() {
                  return cache_or_http(url, key, doCrypt, expiry);
                })
                .catch (function(err) {
                  debug('CACHE: error deleting key, err:'+JSON.stringify(err)+' but still proceeding with another call to cache_or_http');
                  return cache_or_http(url, key, doCrypt, expiry);
                });
              } else {
                debug ('CACHE: cached value for key:'+key+' is good as '+diff+' <'+cache_data.expiry);
              }

              //data = JSON.parse(data);
              if (doCrypt) {
                debug('CACHE: decryption requested');
                data = decrypt(data);
                return (data);
              } else {
                data = JSON.parse(data);
                return (data);
              }
            } else {
              debug('CACHE: NOT found for:'+key+ ' reverting to HTTP');
              return $http.get(url)
              .then ( function (data) {
                debug ('HTTP function in cache returned:'+(typeof data));
                cache_entry = {
                  'data': null,
                  'time': null,
                  'expiry': expiry
                };
                debug('CACHE: storing key data in cache now, with expiry of '+expiry);
                if (doCrypt) {
                  debug('CACHE: encrypting request');
                  cache_entry.data = encrypt(data);
                } else {
                  cache_entry.data = JSON.stringify(data);
                }
                cache_entry.time = moment().toString();
                //debug ('CACHE: Setting key:'+key+' data value to:'+cache_entry.data);
                return localforage.setItem(key, cache_entry)
                .then (function() { return (data);});

              })
              .catch ( function(err) {
                log('CACHE: error with http get '+JSON.stringify(err));
                return (err);
              });
            } // end if cache data
        })
        .catch ( function (err) {
          //debug ('cache_or_http error:'+JSON.stringify(err));
         return (err);
          //return $http.get(url);
        }) ;
        //debug ('returning promise');
        //return d.promise;
      }