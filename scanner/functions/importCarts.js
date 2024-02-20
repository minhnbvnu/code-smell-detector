function importCarts(importedCarts) {
    if (isIterable(importedCarts)) {
        importedCarts.forEach((cart) => importCart(cart));
    } else {
        importCart(importedCarts);
    }
}