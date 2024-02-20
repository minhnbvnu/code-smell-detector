async function searchGitHubIssues(message) {
  const response = await fetch(searchGitHubIssuesURL(message));
  const data = await response.json();

  if (data.items.length > 0) {
    const item = data.items[0];
    return {
      title: item.title,
      url: item.html_url
    };
  } else {
    return null;
  }
}