function loadCart() {
    let cart = null;
    let linked = false;
    const cartName = getQueryParameter("name");
    if (cartName) {
        for (const c of carts) {
            if (c.name == cartName) {
                cart = c;
                break;
            }
        }
    }

    const cartDesc = getQueryParameter("cart");
    if (cartDesc) {
        let tokens = cartDesc.split(";");
        cart = {
            name: tokens[0],
            items: [],
        };
        for (let i = 1; i < tokens.length; i++) {
            const item = models.items.lookup[tokens[i]];
            if (item) cart.items.push(item);
        }
        linked = true;
    }

    if (cart == null) {
        alert(__("Cart_Warenkorb '{{name}}' existiert nicht.", { name: cartName }));
        location.href = "carts.html";
    }

    return new CartModel(cart, linked);
}