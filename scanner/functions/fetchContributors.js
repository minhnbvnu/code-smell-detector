async function fetchContributors({ page = 1, options }) {
  console.log(`Fetching contributors... Page ${page}`);
  const response = await got({
    url: `https://api.github.com/repos/stefanjudis/tiny-helpers/contributors?per_page=100&page=${page}`,
    ...options,
  });

  const contributors = JSON.parse(response.body)
    .map((contributor) => contributor.login)
    .filter((contributor) => !IGNORED_CONTRIBUTORS.includes(contributor));

  const match = response.headers.link.match(
    /^<.*?&page=(?<nextPage>\d*?)>; rel="next".*$/
  );

  return match
    ? [
        ...contributors,
        ...(await fetchContributors({ page: +match.groups.nextPage, options })),
      ]
    : contributors;
}