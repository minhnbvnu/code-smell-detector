function custom(endpoint) {
    return (name, relative = true) => {
        if (relative) {
            return member(endpoint.new(`${endpoint.url()}/${name}`)); // eslint-disable-line no-use-before-define
        }

        return member(endpoint.new(name)); // eslint-disable-line no-use-before-define
    };
}