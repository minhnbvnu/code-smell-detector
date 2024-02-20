function ForceDirected(data = {}) {
    // generate nodes and edges
    // for (let i = 0; i < 20; i++) {
    //     mNodeList.push(new Node(i))
    // }
    k = 0
    mNodeList = []
    mEdgeList = []
    mDxMap = {}
    mDyMap = {}
    mNodeMap = {}

    let nodeList = data.nodeList
    for (let i = 0; i < nodeList.length; i++) {
        let node = nodeList[i]
        mNodeList.push(node)
    }

    // for (let i = 0; i < 20; i++) {
    //     let edgeCount = Math.random() * 8 + 1
    //     for (let j = 0; j < edgeCount; j++) {
    //         let targetId = Math.floor(Math.random() * 20)
    //         let edge = new Edge(i, targetId)
    //         mEdgeList.push(edge)
    //     }
    // }
    // line 转 edge
    let lineList = data.lineList
    for (let i = 0; i < lineList.length; i++) {
        let line = lineList[i]
        let edge = new Edge(line.from, line.to)
        mEdgeList.push(edge)
    }

    if (mNodeList && mEdgeList) {
        k = Math.sqrt(CANVAS_WIDTH * CANVAS_HEIGHT / mNodeList.length)
    }
    for (let i = 0; i < mNodeList.length; i++) {
        let node = mNodeList[i]
        if (node) {
            mNodeMap[node.id] = node
        }
    }

    // 随机生成坐标. Generate coordinates randomly.
    let initialX, initialY, initialSize = 40.0
    for (let i in mNodeList) {
        initialX = CANVAS_WIDTH * 0.5
        initialY = CANVAS_HEIGHT * 0.5
        mNodeList[i].x = initialX + initialSize * (Math.random() - 0.5)
        mNodeList[i].y = initialY + initialSize * (Math.random() - 0.5)
    }

    // 迭代200次. Iterate 200 times.
    for (let i = 0; i < 200; i++) {
        calculateRepulsive()
        calculateTraction()
        updateCoordinates()
    }
    // console.log(JSON.stringify(new Result(mNodeList, mEdgeList)))
    // 坐标添加px
    for (let i = 0; i < mNodeList.length; i++) {
        let node = mNodeList[i]
        node.left = node.x + 'px'
        node.top = node.y + 'px'
        node.x = undefined
        node.y = undefined
    }

    data.nodeList = mNodeList

    // console.log(data)
    return data
}