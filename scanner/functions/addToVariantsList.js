function addToVariantsList(parentItem, childItem) {
    let isAdded = false;
    for (let x = 0; x < variantsList.length; x++) {
        for (let y = 0; y < variantsList[x].length; y++) {
            const variantItem = variantsList[x][y];
            if (variantItem.id === parentItem.id && variantItem.variant === parentItem.variant) {
                variantsList[x].push(childItem);
                isAdded = true;
                break;
            }
        }

        if (isAdded) {
            break;
        }
    }

    if (!isAdded) {
        const item = [
            parentItem,
            childItem
        ]

        variantsList.push(item);
    }

    skipParentVariants.push(parentItem);
}