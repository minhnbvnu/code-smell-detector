function Poster(options = {}) {
    options = {
        ...defaultOptions,
        ...options,
    };

    const pages = getCurrentPages();
    const ctx = pages[pages.length - 1];

    const poster = ctx.selectComponent(options.selector);
    delete options.selector;

    return poster;
}