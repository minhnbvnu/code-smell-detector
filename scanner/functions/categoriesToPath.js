function categoriesToPath(rawItem) {
    if (!rawItem.categories) return null;
    const traversePath = (category, result) => {
        if (category.name == "ProductRoot") return;
        if (category.parent) traversePath(category.parent, result);
        result.push({ name: category.name, id: category.id });
    };
    const pathElements = [];
    traversePath(rawItem.category, pathElements);
    const lastIndex = Math.min(3, pathElements.length) - 1;
    const result =
        pathElements
            .slice(0, lastIndex + 1)
            .map((el) => el.name)
            .join(" -> ") +
        "-" +
        pathElements[lastIndex].id;
    return result;
}