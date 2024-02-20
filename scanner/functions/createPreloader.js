function createPreloader(list) {
    const urls = _.clone(list);
    return {
        next() {
            return urls.shift();
        }
    };
}