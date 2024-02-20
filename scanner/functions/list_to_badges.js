function list_to_badges(wordlist, style, limit, type) {
    badges = "";
    if (wordlist.length > limit) {
       badges = `<span class="badge badge-${style} ml-2">${wordlist.length} ${type}</span>`;
    }
    else {
        wordlist.forEach(function (item, index) {
            badges += `<span class="badge badge-${style} ml-2">${sanitizeHTML(item)}</span>`;
        });
    }

    return badges;
}