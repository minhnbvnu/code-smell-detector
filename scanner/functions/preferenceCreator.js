function preferenceCreator(items, container, inner) {
    for (let i = 0; i < items.length; i++) {
        switch (items[i].type) {
            case "title":
                titleSolution(items[i], container);
                break;
            case "selection":
                selectionSoluion(items[i], container, inner);
                break;
            case "dropdown":
                dropdownSolution(items[i], container);
                break;
            case "collapse":
                collapseSolution(items[i], container);
                break;
            default:
                customSolution(items[i].type, container);
                break;
        }
    }
}