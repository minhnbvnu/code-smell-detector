async function getGitRepositoryInfo(imageTagOrContainerName, gitRepos) {
    // Merge in default dependencies
    const defaultPackages = configUtils.getDefaultDependencies('git');
    if(defaultPackages) {
        const merged = defaultPackages;
        for(let otherName in gitRepos) {
            merged[otherName] = gitRepos[otherName];
        }
        gitRepos = merged;
    }
    // Return empty array if no components
    if (!gitRepos) {
        return [];
    }

    const componentList = [];
    for(let repoName in gitRepos) {
        const repoPath = gitRepos[repoName];
        if (typeof repoPath === 'string') {
            console.log(`(*) Getting remote and commit for ${repoName} at ${repoPath}...`);
            // Go to the specified folder, see if the commands have already been run, if not run them and get output
            const remoteAndCommitOutput = await getCommandOutputFromContainer(imageTagOrContainerName, `git config --global --add safe.directory \\"${repoPath}\\" && cd \\"${repoPath}\\" && if [ -f \\".git-remote-and-commit\\" ]; then cat .git-remote-and-commit; else git remote get-url origin && git log -n 1 --pretty=format:%H -- . | tee /dev/null; fi`,true);
            const [gitRemote, gitCommit] = remoteAndCommitOutput.split('\n');
            componentList.push({
                name: repoName,
                path: repoPath,
                repositoryUrl: gitRemote,
                commitHash: gitCommit
            });
        }
    }

    return componentList;
}