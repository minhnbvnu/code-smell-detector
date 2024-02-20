function update_styles(node, text_depth) {
    delete_styles(node)
    const style = document.createElement("style")

    let text_rule = ""

    for (let i=0; i<text_depth; i++) {
        const first_chr = Math.floor(i / 2)
        const second_chr = i%2 ? 8 : 0
        const hex = `${first_chr}${second_chr}`
        text_rule +=
`
.svg_level_${i} .svg_text {
    fill: #${hex}${hex}${hex};
    stroke: white;
    visibility: inherit;
}
`
    }
    style.innerHTML = SVG_STYLE + text_rule
    node.insertBefore(style, node.firstChild)
}