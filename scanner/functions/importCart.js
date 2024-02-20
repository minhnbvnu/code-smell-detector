function importCart(importedCart) {
    const items = [];
    for (const cartItem of importedCart.items) {
        const item = model.items.lookup[cartItem.store + cartItem.id];
        if (!item) continue;
        items.push(item);
    }
    importedCart.items = items;

    const index = model.carts.carts.findIndex((cart) => cart.name === importedCart.name);
    if (index != -1) {
        let newName = importedCart.name;
        while (true) {
            newName = prompt(
                __("Carts_Warenkorb '{{name}}' existiert bereits. Bitte einen anderen Namen für den zu importierenden Warenkorb eingeben", {
                    name: importedCart.name,
                }),
                importedCart.name + today()
            );
            if (!newName || newName.trim().length == 0) return;
            newName = newName.trim();
            if (newName != importedCart.name) {
                importedCart.name = newName;
                model.carts.carts.push(importedCart);
                break;
            }
        }
    } else {
        model.carts.carts.push(importedCart);
    }
    model.carts.save();
}