function calculateRepulsive() {
    let ejectFactor = 6
    let distX, distY, dist
    for (let i = 0; i < mNodeList.length; i++) {
        mDxMap[mNodeList[i].id] = 0.0
        mDyMap[mNodeList[i].id] = 0.0
        for (let j = 0; j < mNodeList.length; j++) {
            if (i !== j) {
                distX = mNodeList[i].x - mNodeList[j].x
                distY = mNodeList[i].y - mNodeList[j].y
                dist = Math.sqrt(distX * distX + distY * distY)
            }
            if (dist < 30) {
                ejectFactor = 5
            }
            if (dist > 0 && dist < 250) {
                let id = mNodeList[i].id
                mDxMap[id] = mDxMap[id] + distX / dist * k * k / dist * ejectFactor
                mDyMap[id] = mDyMap[id] + distY / dist * k * k / dist * ejectFactor
            }
        }
    }
}