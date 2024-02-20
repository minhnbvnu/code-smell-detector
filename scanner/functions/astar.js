function astar (start, goal, {id, isGoal, getSuccessors, distance, estimate}) {
  const priorityQueue = [start]  // TODO: Should we use BinaryHeap?
  const closed = new Set()
  const parents = new Map()
  const gScore = new Map()
  const fScore = new Map()
  let node = null

  gScore.set(id(start), 0)
  fScore.set(id(start), estimate(start, goal))

  while (priorityQueue[0] || priorityQueue.length) {
    node = priorityQueue.shift()

    if (closed.has(id(node))) {
      continue
    }
    if (isGoal(node)) {
      break // backtrace from here
    }
    closed.add(id(node))

    for (let child of getSuccessors(node)) {
      if (closed.has(id(child))) {
        continue
      }
      priorityQueue.push(child)

      // The distance from start to a child
      const tentativeGScore = gScore.get(id(node)) + distance(node, child)
      const childGScore = gScore.has(id(child)) ? gScore.get(id(child)) : Infinity

      // This is not a better path
      if (tentativeGScore >= childGScore) {
        continue
      }
      // This path is the best until now. We should save it.
      parents.set(id(child), node)
      gScore.set(id(child), tentativeGScore)

      const childFScore = tentativeGScore + estimate(child, goal)
      fScore.set(id(child), childFScore)
    }

    priorityQueue.sort((a, b) => fScore.get(id(a)) - fScore.get(id(b)))
  }

  const path = []
  while (node) {
    path.push(node)
    node = parents.get(id(node))
  }
  return path.reverse()
}