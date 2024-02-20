async function getPostByTitle(title) {
	return posts.find(post => post.title === title);
}