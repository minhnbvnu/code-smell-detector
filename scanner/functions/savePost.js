async function savePost(post) {
	post.id = Math.floor(Math.random() * 1000);
	posts.push(post);
	return post;
}