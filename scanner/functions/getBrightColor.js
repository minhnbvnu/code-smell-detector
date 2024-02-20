function getBrightColor(key)
{
    // Colors of the 12-band rainbow flag!
    let colors = [
        '#971c93',
        '#5124cd',
        '#0551ff', // Bright blue
        '#009393',
        '#00fa00',
        '#cbfa00',
        '#fefb00',
        '#fec802',
        '#ff9501',
        '#ff5004',
        '#fe2204',
        '#d81d52'
    ];

    if (isString(key))
        return colors[hash(key) % colors.length];
    else
        return colors[key % colors.length];
}