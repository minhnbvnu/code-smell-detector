function writeStargazers(workshopElement, stargazersCount) {
	const starIconSVG = `<svg style="vertical-align: middle" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill="currentColor" fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>`;
	workshopElement.innerHTML = `
		<span>${workshopElement.innerHTML}</span>
		<span>(${starIconSVG}${kFormatter(stargazersCount)})<span>
	`;
}