function createFetchError(fileURL, error) {
  const result = new Error(`Fetching "${fileURL}" failed: ${error}`);
  result.name = 'FetchError';
  return result;
}