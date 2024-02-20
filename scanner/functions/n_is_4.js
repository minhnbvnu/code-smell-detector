function n_is_4(t) {  // 14  31
    var e = t.length;
    if (e % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
    return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0
}