function loadComments(comments, depth = 0) {
	comments.sort(function(x, y) {
		return x.Id - y.Id;
	});

	var colors = ["info", "success", "primary", "warning", "danger"];
	var floor = 1;
	depth++;
	var html = '';
	for (let item of comments) {
		var color = colors[depth%5];
		html += `<article id="${item.Id}" class="panel panel-${color}">
						<div class="panel-heading ${item.IsMaster ? "text-red" : ""} ${item.IsAuthor ? "text-bold" : ""}">
							${depth}-${floor++}# ${item.IsMaster ?`<i class="icon icon-user"></i>`:""}${item.NickName}${item.IsMaster ?`(管理员)`:""} | ${item.CommentDate}
							<span class="pull-right hidden-sm hidden-xs" style="font-size: 10px;">${GetOperatingSystem(item.OperatingSystem) + " | " + GetBrowser(item.Browser)}</span>
						</div>
						<div class="panel-body line-height24">
							${item.Content} 
							<span class="cmvote label label-${color}" data-id="${item.Id}"><i class="icon-thumbsup"></i>(<span>${item.VoteCount}</span>)</span>
							<a class="reply label label-${color}" href="?uid=${item.Id}"><i class="icon-comment"></i></a>
							${loadComments(item.Children, depth)}
						</div>
					</article>`;
	}
	return html;
}