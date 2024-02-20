function withIEStorage(storeFunction) {
                return function() {
                    var args = Array.prototype.slice.call(arguments, 0);
                    args.unshift(storage);
                    // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
                    // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
                    storageOwner.appendChild(storage);
                    storage.addBehavior("#default#userData");
                    storage.load(localStorageName);
                    var result = storeFunction.apply(store, args);
                    storageOwner.removeChild(storage);
                    return result;
                };
            }