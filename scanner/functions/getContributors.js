async function getContributors(user, repo, maxCount = 1) {
  const contributors = (await axios.get(
    `https://api.github.com/repos/${encodeURIComponent(user)}/${encodeURIComponent(repo)}/contributors`,
    { params: { per_page: maxCount } }
  )).data;

  return Promise.all(contributors.map(async (contributor)=> {
    return {...contributor, ...(await axios.get(
      `https://api.github.com/users/${encodeURIComponent(contributor.login)}`
    )).data};
  }))
}