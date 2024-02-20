function verifySchema (obj, schema) {
                Object.entries(schema).forEach(([prop, schemaValue]) => {
                    var objValue = obj[prop];

                    if (!env.isShimmed && env.browser.isIE && prop === 'multiEntry') {
                        // IE's native IndexedDB does not have the multiEntry property
                        schemaValue = undefined;
                    }

                    if (schemaValue instanceof Array) {
                        objValue = Array.prototype.slice.call(objValue);
                    }

                    expect(objValue).to.deep.equal(schemaValue, obj.name + ' ' + prop);
                });
            }