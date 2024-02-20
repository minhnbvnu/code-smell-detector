function demap(c) {
    var d = this.map.indexOf(c) % 11;
    return d < 0 ? '' : d < 10 ? d : '.';
}