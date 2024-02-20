function nextRender(value) {
    return renderRecursive(render, remaining.slice(1), results.concat([value]));
  }