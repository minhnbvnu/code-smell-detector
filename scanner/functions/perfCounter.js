function perfCounter() {
                    if (typeof performance === 'undefined') {
                        return 'Date.now()';
                    }
                    else {
                        return 'performance.now()';
                    }
                }