async function deletePost(id) {
	posts.splice(posts.find(post => post.id === id), 1);
}