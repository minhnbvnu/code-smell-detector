function caption(example) {
    const c = example.match(/(<caption>[\s\S]*<\/caption>)\n/g) || [];
    const e = example.split(c[0]);
    return {
        caption: c[0],
        content: e[0] || e[1],
    };
}