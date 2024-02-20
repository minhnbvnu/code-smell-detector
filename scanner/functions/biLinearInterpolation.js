function biLinearInterpolation(indexes, getData) {
    const j = Math.floor(indexes.x);
    const i = Math.floor(indexes.y);

    const u = indexes.x - j;
    const v = indexes.y - i;

    return (1 - u) * (
        (1 - v) * getData(i, j) + v * getData(i + 1, j)
    ) + u * (
        (1 - v) * getData(i, j + 1) + v * (getData(i + 1, j + 1))
    );
}