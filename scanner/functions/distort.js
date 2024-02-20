function distort(x, amount)
{
    amount = Math.min(Math.max(amount, 0), 1);
    amount -= 0.01;

    var k = 2 * amount / (1 - amount);
    var y = (1 + k) * x / (1 + k * Math.abs(x));
    return y;
}