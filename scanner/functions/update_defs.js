function update_defs(node, gradient_depth=10) {
    delete_defs(node)
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")

    for (let i = 0; i < gradient_depth; i++) {
        const linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
        const gradient_attrs = {id:`Gradient${i}`, x1:"0%", x2:"100%", y1:"0%", y2:"100%"}
        for (const attr in gradient_attrs) {
            linearGradient.setAttribute(attr, gradient_attrs[attr])
        }
        const stop1_opacity = Math.min(1,0.25+0.15*i)
        const stop2_opacity = Math.max(0, 0.2)
        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
        stop1.setAttribute("offset", "0%")
        stop1.setAttribute("style", `stop-color: #333333; stop-opacity: ${stop1_opacity}`)
        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
        stop2.setAttribute("offset", "100%")
        stop2.setAttribute("style", `stop-color: #bbbbbb; stop-opacity: ${stop2_opacity}`)
        linearGradient.replaceChildren(stop1, stop2)
        defs.appendChild(linearGradient)
    }
    node.insertBefore(defs, node.firstChild)
}