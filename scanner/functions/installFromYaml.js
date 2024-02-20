async function installFromYaml(file, verbose) {

  const funModule = FunModule.load(file);
  const runtime = funModule.runtime;
  const codeUri = path.dirname(file);
  const tasks = funModule.tasks;

  const targets = findAllTargetsFromTasks(tasks);

  const ctx = await new Context(runtime, codeUri, targets);

  try {
    for (const t of tasks) {
      if (t.type === 'pip') {
        const pipTask = new PipTask(t.attrs.name, runtime, codeUri, 
          t.attrs.pip, t.attrs.local, t.attrs.target, t.attrs.env, ctx, verbose);
        await pipTask.run();
      } else if (t.type === 'apt') {
        const aptTask = new AptTask(t.attrs.name, runtime, codeUri, 
          t.attrs.apt, t.attrs.local, t.attrs.target, t.attrs.env, ctx, verbose);
        await aptTask.run();
      } else if (t.type === 'shell') {
        const shellTask = new ShellTask(t.attrs.name, runtime, codeUri, 
          t.attrs.shell, t.attrs.cwd, t.attrs.env, ctx, verbose);
        await shellTask.run();
      } else {
        console.error('unkown task %s', t);
      }
    }
  } finally {
    await ctx.teardown();
  }
}