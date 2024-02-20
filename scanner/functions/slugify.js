function slugify(text) {
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var slug = lines[i].toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
        if (slug.length > 1) {
            return slug;
        }
    }
    return "";
}