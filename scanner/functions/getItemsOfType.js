function getItemsOfType(data, type) {
	return data.rss.channel[0].item.filter(item => item.post_type[0] === type);
}