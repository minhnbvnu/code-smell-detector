constructor(owner, repo) {
    if (!owner) {
      throw new Error('repo owner must be specified');
    }

    if (!repo) {
      throw new Error('repo must be specified');
    }

    this.repo = repo;
    this.owner = owner;
    this.axios = githubAxios.create({
      baseURL: `https://api.github.com/repos/${this.owner}/${this.repo}/`,
    })
  }