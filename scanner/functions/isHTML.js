function isHTML(str) {
    return /<[a-z\][\s\S]*>/i.test(str);
}