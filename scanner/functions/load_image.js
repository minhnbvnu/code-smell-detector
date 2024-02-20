async function load_image(url, options) {
        return new ImageLoader(url, options).promise;
    }