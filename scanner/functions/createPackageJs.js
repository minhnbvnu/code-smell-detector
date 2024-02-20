async function createPackageJs(packageName, template) {
  const repoName = getRepoName(template);
  const repoAddr = getRepoAddr(repoName);

  process.chdir(dirname(packageName));
  spawnSync("git", ["clone", repoAddr, packageName]);

  process.chdir(basename(packageName));
  rmSync(".git", { recursive: true });

  await fetchDependencies("./clio.toml");
  info("Added Clio dependencies");

  spawnSync("git", ["init"]);
  spawnSync("git", ["add", "-A"]);
  spawnSync("git", ["commit", "-m", "Initial Commit"]);
  info("Initialized new git repository.");

  info("Initialization Complete!");
  success(
    `Run 'cd ${packageName}' to open, then 'clio run' to run the project!`
  );
}