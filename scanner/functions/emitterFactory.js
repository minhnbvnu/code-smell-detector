function emitterFactory(type) {
            return (event, ...args) => {
                emitter(`${type}:${event}`, ...args);
            };
        }