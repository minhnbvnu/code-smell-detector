function _bindHttpMethod(method) {
        return (...args) => {
            const id = args.shift();
            return member(endpoint.new(`${endpoint.url()}/${id}`))[method](...args);  // eslint-disable-line no-use-before-define
        };
    }