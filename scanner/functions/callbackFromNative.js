function callbackFromNative(callbackId, successed, args) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     var callback = plugin.callbacks[callbackId];
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     if (callback) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     if (successed) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     callback.success.apply(null, args);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     callback.fail.apply(null, args);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     delete plugin.callbacks[callbackId];
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                                                                                                                                                                               }