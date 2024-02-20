function changeFavicon(hasFocus) {
    // console.log("changeFavicon")
    const link = document.createElement("link"),
        oldLink = document.getElementById("dynamic-favicon")

    link.id = "dynamic-favicon"
    link.rel = "icon"
    link.href = hasFocus ? "src/favicon/icon-512.svg" : "src/favicon/icon-512.svg"
    if (oldLink) {
        document.head.removeChild(oldLink)
    }
    document.head.appendChild(link)
}