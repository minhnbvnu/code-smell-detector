function cleanSVG(svg) {
    return svg.replace(/\n/g, "")
        .replace(/>\s+</g, "><")
        .replace(/<!--.*-->/g, "")
        .replace(/<title>.*<\/title>/g, "")
        .replace(/<desc>.*<\/desc>/g, "")
        .replace(/<\?xml.*\?>/g, "");
}