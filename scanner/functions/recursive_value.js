function recursive_value(desc, value) {
            var db;

            var open_rq = createdb(done);
            open_rq.onupgradeneeded = function(e) {
                db = e.target.result
                db.createObjectStore("store")
                  .add(value, 1);

                e.target.onsuccess = function(e) {
                    db.transaction('store')
                      .objectStore('store')
                      .get(1)
                      .onsuccess = function(e)
                    {

                        try
                        {
                            var fresh_value = JSON.stringify(value);
                        }
                        catch (e)
                        {
                            if (e.name == 'TypeError')
                            {
                                try
                                {
                                    JSON.stringify(e.target.result);
                                }
                                catch (e)
                                {
                                    count += 1;
                                    if (count >= 3) {
                                        done();
                                    }
                                    return;
                                }
                            }
                            else
                                throw e;
                        }
                    };
                };
            };
            open_rq.onsuccess = function () {};
        }