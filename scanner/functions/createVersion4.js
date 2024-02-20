function createVersion4 () {
                    var open = indexedDB.open(name, 4);
                    open.onupgradeneeded = sinon.spy();
                    open.onsuccess = sinon.spy();
                    open.onblocked = sinon.spy();

                    open.onerror = function () {
                        sinon.assert.notCalled(open.onupgradeneeded);
                        sinon.assert.notCalled(open.onsuccess);
                        sinon.assert.notCalled(open.onblocked);

                        if (env.isShimmed || (!env.browser.isSafari && !env.browser.isFirefox)) {
                            expect(open.error).to.be.an.instanceOf(env.DOMException); // Was DOMError before latest draft spec
                        }
                        expect(open.error.name).to.equal('VersionError');
                        done();
                    };
                }