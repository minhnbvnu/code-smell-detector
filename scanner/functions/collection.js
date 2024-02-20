function collection(endpoint) {
    function _bindHttpMethod(method) {
        return (...args) => {
            const id = args.shift();
            return member(endpoint.new(`${endpoint.url()}/${id}`))[method](...args);  // eslint-disable-line no-use-before-define
        };
    }

    return assign(endpoint, {
        custom: custom(endpoint),
        delete: _bindHttpMethod('delete'),
        getAll: endpoint.get,
        get: _bindHttpMethod('get'),
        head: _bindHttpMethod('head'),
        patch: _bindHttpMethod('patch'),
        put: _bindHttpMethod('put'),
    });
}