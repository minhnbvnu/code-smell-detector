function setDescTagContent(content) {
    if (descTag) {
        descTag.content = content
    } else {
        document.head.insertAdjacentHTML('beforeend', `<meta name="description" content="${content}">`)
    }
}