function createMaze() {
  // Start with the first spot
  var current = grid[0];
  current.visited = true;

  // STEP 1
  while (true) {
    // STEP 1: check available neighbors and pick a random one
    var next = current.checkNeighbors();
    // If it's valid
    if (next) {
      // It's done
      next.visited = true;

      // STEP 2: Keep track of where were in the stack
      stack.push(current);

      // STEP 3: Remove wallks between
      removeWalls(current, next);

      // STEP 4: Keep going
      current = next;
    } else if (stack.length > 0) {
      // Go back to the stack
      current = stack.pop();
      // All done
    } else {
      break;
    }
  }
}