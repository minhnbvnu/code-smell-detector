function calculateTraction() {
    let condenseFactor = 3
    let startNode, endNode
    for (let e = 0; e < mEdgeList.length; e++) {
        let eStartID = mEdgeList[e].source
        let eEndID = mEdgeList[e].target
        startNode = mNodeMap[eStartID]
        endNode = mNodeMap[eEndID]
        if (!startNode) {
            console.log('Cannot find start node id: ' + eStartID + ', please check it out.')
            return
        }
        if (!endNode) {
            console.log('Cannot find end node id: ' + eEndID + ', please check it out.')
            return
        }
        let distX, distY, dist
        distX = startNode.x - endNode.x
        distY = startNode.y - endNode.y
        dist = Math.sqrt(distX * distX + distY * distY)
        mDxMap[eStartID] = mDxMap[eStartID] - distX * dist / k * condenseFactor
        mDyMap[eStartID] = mDyMap[eStartID] - distY * dist / k * condenseFactor
        mDxMap[eEndID] = mDxMap[eEndID] + distX * dist / k * condenseFactor
        mDyMap[eEndID] = mDyMap[eEndID] + distY * dist / k * condenseFactor
    }
}