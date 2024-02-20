async function parseCategory(url, parent, result, lookup) {
    const data = (await axios.get(url)).data;
    const dom = HTMLParser.parse(data);
    const categoryTitle = dom.querySelector('[data-test="category-title"]')?.textContent;
    if (url != "https://www.penny.at/kategorie" && categoryTitle.includes("Alle Kategorien")) return;
    const categories = dom.querySelectorAll('[data-test="category-tree-navigation-button"]');
    for (const category of categories) {
        const link = "https://www.penny.at" + category.getAttribute("href");
        if (!category.querySelector(".subtitle-2")) continue;
        const name = (parent ? parent + " -> " : "") + category.querySelector(".subtitle-2").innerText.trim().replace("&amp;", "&");
        if (name.startsWith("Alle Angebote")) continue;

        if (!lookup.has(link)) {
            lookup.add(link);
            result.push({
                id: name,
                url: link,
                code: null,
            });

            try {
                await parseCategory(link, name, result, lookup);
            } catch (e) {
                // Ignore, sometimes the server responds with 502. No idea why
            }
        }
    }
}