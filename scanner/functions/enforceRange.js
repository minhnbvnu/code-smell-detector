function enforceRange (number, type) {
    number = Math.floor(Number(number));
    let max, min;
    switch (type) {
    case 'unsigned long long': {
        max = 0x1FFFFFFFFFFFFF; // 2^53 - 1
        min = 0;
        break;
    }
    case 'unsigned long': {
        max = 0xFFFFFFFF; // 2^32 - 1
        min = 0;
        break;
    }
    default:
        throw new Error('Unrecognized type supplied to enforceRange');
    }
    if (!Number.isFinite(number) ||
        number > max ||
        number < min) {
        throw new TypeError('Invalid range: ' + number);
    }
    return number;
}