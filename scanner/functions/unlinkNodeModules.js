function unlinkNodeModules(destination, ...names) {
  for (const name of names) {
    rmSync(join(destination, "node_modules", name), {
      recursive: true,
    });
  }
}