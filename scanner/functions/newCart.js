function newCart() {
    let name = prompt(__("Carts_Name für Warenkorb eingeben:"));
    if (!name || name.trim().length == 0) return;
    name = name.trim();
    if (model.carts.carts.some((cart) => cart.name === name)) {
        alert(__("Carts_Warenkorb mit Namen '{{name}}' existiert bereits", { name: name }));
        return;
    }
    model.carts.add(name);
    location.href = `cart.html?name=${encodeURIComponent(name)}`;
}