function getSupportsPassive() {
            var supportsPassive = false;
            /* eslint-disable */
            try {
                var opts = Object.defineProperty({}, "passive", {
                    get: function () {
                        supportsPassive = true;
                    },
                });
                // @ts-ignore
                window.addEventListener("test", null, opts);
            }
            catch (e) { }
            /* eslint-enable */
            return supportsPassive;
        }