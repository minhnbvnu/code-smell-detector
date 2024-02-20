function setConfigObjects() {
                if (typeof configObjects !== 'undefined') {
                    configObjects.forEach(function (configObject) {
                        setConfigObject(configObject);
                    });
                }
            }