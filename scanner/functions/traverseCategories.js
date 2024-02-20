function traverseCategories(categories, parent = "", url, mainCategory) {
        if (!mainCategory) {
            subcategories.push({ id: parent, url: url, code: null });
        }

        for (const category of categories) {
            const { name, subcategories, url } = category;
            const current = parent ? `${parent}/${name}` : name;
            traverseCategories(subcategories, current, url, false);
        }
    }