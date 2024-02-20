function setIconTagHref(href) {
    if (iconTag) {
        iconTag.href = href
    } else {
        document.head.insertAdjacentHTML('beforeend', `<link rel="shortcut icon" href="${href}">`)
    }
}