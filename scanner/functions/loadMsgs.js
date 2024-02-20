function loadMsgs(msg, depth = 0) {
	msg.sort(function(x, y) {
		return x.Id - y.Id;
	});

	var colors = ["info", "success", "primary", "warning", "danger"];
	var floor = 1;
	depth++;
	var html = '';
	for (let item of msg) {
		var color = colors[depth % 5];
		html += `<article id="${item.Id}" class="panel panel-${color}">
						<div class="panel-heading">
							${depth}-${floor++}# ${item.IsMaster ? `<i class="icon icon-user"></i>` : ""}${item.NickName}${item.IsMaster ? `(管理员)` : ""} | ${item.PostDate}<span class="pull-right hidden-sm hidden-xs" style="font-size: 10px;">${GetOperatingSystem(item.OperatingSystem) + " | " + GetBrowser(item.Browser)}
							</span>
						</div>
						<div class="panel-body line-height24">
							${item.Content}
							<a class="reply label label-${color}" href="?uid=${item.Id}"><i class="icon-comment"></i></a>
							${loadMsgs(item.Children, depth)}
						</div>
					</article>`;
	}
	return html;
}