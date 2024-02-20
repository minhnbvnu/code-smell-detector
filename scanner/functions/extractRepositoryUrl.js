function extractRepositoryUrl(repository) {
  if (!repository || typeof repository !== 'object') {
    return repository;
  }
  return repository.url;
}