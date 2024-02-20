function bindReplyBtn() {
	$(".msg-list article .panel-body a.reply").on("click", function (e) {
		e.preventDefault();
		loadingDone();
		var href = $(this).attr("href");
		var uid = href.substring(href.indexOf("uid") + 4);
		$("#uid").val(uid);
		$("#OperatingSystem2").val(DeviceInfo.OS.toString());
		$("#Browser2").val(DeviceInfo.browserInfo.Name+" "+DeviceInfo.browserInfo.Version);
		layui.use("layer", function() {
			var layer = layui.layer;
			layer.open({
				type: 1,
				zIndex:20,
				title: '回复留言',
				area: (window.screen.width > 540 ? 540 : window.screen.width) + 'px',// '340px'], //宽高
				content: $("#reply"),
				end: function() {
					$("#reply").css("display", "none");
				}
			});
		});
		$(".layui-layer").insertBefore($(".layui-layer-shade"));
		window.currentEditor = layui.layedit.build('layedit2', {
			tool: ["strong", "italic", 'link', "unlink", "face"],
			height: 100
		});
	});
}