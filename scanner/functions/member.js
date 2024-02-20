function member(endpoint) {
    return assign(endpoint, {
        all: (name) => collection(endpoint.new(`${endpoint.url()}/${name}`)),
        custom: custom(endpoint),
        one: (name, id) => member(endpoint.new(`${endpoint.url()}/${name}/${id}`)),
    });
}