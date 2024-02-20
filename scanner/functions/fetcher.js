function fetcher (filter) {
  return {
    getData: async () => getDataFilterBy(filter),
    getPosts: async () => getPostsFilterBy(filter),
    getPost
  }
}