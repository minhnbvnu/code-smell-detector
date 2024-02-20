function calDiscount(order) {
    return Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
}