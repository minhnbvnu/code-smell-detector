function gensym(base) {
    return '$_' + (base || '') + (++gensymNum) + '$_';
}