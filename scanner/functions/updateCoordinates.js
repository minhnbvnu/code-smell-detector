function updateCoordinates() {
    let maxt = 4, maxty = 3 // Additional coefficients.
    for (let v = 0; v < mNodeList.length; v++) {
        let node = mNodeList[v]
        let dx = Math.floor(mDxMap[node.id])
        let dy = Math.floor(mDyMap[node.id])

        if (dx < -maxt) dx = -maxt
        if (dx > maxt) dx = maxt
        if (dy < -maxty) dy = -maxty
        if (dy > maxty) dy = maxty
        node.x = node.x + dx >= CANVAS_WIDTH || node.x + dx <= 0 ? node.x - dx : node.x + dx
        node.y = node.y + dy >= CANVAS_HEIGHT || node.y + dy <= 0 ? node.y - dy : node.y + dy
    }
}