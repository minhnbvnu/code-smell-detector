async function FastGlob(source, options) {
        assertPatternsInput(source);
        const works = getWorks(source, async_1.default, options);
        const result = await Promise.all(works);
        return utils.array.flatten(result);
    }