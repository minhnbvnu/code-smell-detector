function AbstractPluginLoader() {
            // Implemented by Node.js plugin loader
            this.require = function () {
                return null;
            };
        }