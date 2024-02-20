function loadParentMsgs(data) {
	loading();
	var html = '';
	if (data) {
		var rows = data.rows;
		var page = data.page;
		var size = data.size;
		var maxPage = Math.ceil(data.total / size);
		page = page > maxPage ? maxPage : page;
		page = page < 1 ? 1 : page;
		var startfloor = data.parentTotal - (page - 1) * size;
		for (let i = 0; i < rows.length; i++) {
			html += `<li class="msg-list media animated fadeInRight" id='${rows[i].Id}'>
						   <div class="media-body">
								<article class="panel panel-info">
									<header class="panel-heading">${startfloor--}# ${rows[i].IsMaster? `<i class="icon icon-user"></i>` : ""}${rows[i].NickName}${rows  [i].IsMaster ? `(管理员)` : ""} | ${rows[i].PostDate}
										<span class="pull-right hidden-sm hidden-xs" style="font-size: 10px;">${GetOperatingSystem(rows[i].OperatingSystem) + " | " + GetBrowser(rows[i].Browser)}</span>
									</header>
									<div class="panel-body line-height24">
										${rows[i].Content}
										<a class="reply label label-info" href="?uid=${rows[i].Id}"><i class="icon-comment"></i></a>
										${loadMsgs(rows[i].Children)}
									</div>
								</article>
							</div>
						</li>`;
		}
	}
	loadingDone();
	return html;
}