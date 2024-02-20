function createMigrationsDirectory() {
  return fs.mkdirs(path.join(process.cwd(), "migrations"));
}