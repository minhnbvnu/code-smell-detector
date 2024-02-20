async function getPost(id) {
	return posts.find(post => post.id === id);
}