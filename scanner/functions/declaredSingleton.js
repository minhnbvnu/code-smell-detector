function declaredSingleton() {
                if (!retInstance) {
                    this.constructor.apply(this, arguments);
                    retInstance = this;
                }
                return retInstance;
            }