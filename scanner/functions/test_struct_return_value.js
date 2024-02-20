function test_struct_return_value() {
    v = STACKTOP;
    STACKTOP += 4 * 3;
    _shift_addition_init(v, 0.2);
    console.log(
        "sinval=", getValue(v, 'float'),
        "cosval=", getValue(v + 4, 'float'),
        "rate=", getValue(v + 8, 'float')
    );
    STACKTOP = v;
}