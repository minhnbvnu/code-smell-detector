function forceLocalStorage() {

            // var d = $q.defer();
            localforage.setDriver(localforage.LOCALSTORAGE)
              .then(function (succ) {
                  log("configureStorageDB:localforage forced setting to localstorage returned a driver of: " + localforage.driver());
                  d.resolve(true);
                  return d.promise;
                },
                function (err) {
                  log("*** configureStorageDB: Error setting localStorage too, zmNinja WILL NOT SAVE ***");
                  log("*** configureStorageDB: Dance, rejoice, keep re-configuring everytime you run ***");
                  d.resolve(true);
                  return d.promise;
                });
            return d.promise;

          }