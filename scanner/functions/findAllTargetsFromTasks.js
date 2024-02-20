function findAllTargetsFromTasks(tasks) {
  const targets = [];
  for (const t of tasks) {
    const target = t.attrs.target;

    if (target) {
      targets.push(target);
    }
  }

  return targets;
}