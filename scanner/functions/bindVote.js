function bindVote() {
	$("#voteup").on("click", function(e) {
		window.post("/post/voteup", { id: $("#postId").val() }, function(data) {
			if (data) {
				if (data.Success) {
					$("#voteup span").text(parseInt($("#voteup span").text()) + 1);
					$(this).addClass("disabled");
					this.disabled = true;
					window.notie.alert({
						type: 1,
						text: data.Message,
						time: 4
					});
				} else {
					window.notie.alert({
						type: 3,
						text: data.Message,
						time: 4
					});
				}
			}
		}, function() {
			window.notie.alert({
				type: 3,
				text: "请求失败，请稍候再试！",
				time: 4
			});
		});
	});
	$("#votedown").on("click", function(e) {
		window.post("/post/votedown", { id: $("#postId").val() }, function(data) {
			if (data) {
				if (data.Success) {
					$("#votedown span").text(parseInt($("#votedown span").text()) + 1);
					$(this).addClass("disabled");
					this.disabled = true;
					window.notie.alert({
						type: 1,
						text: data.Message,
						time: 4
					});
				} else {
					window.notie.alert({
						type: 3,
						text: data.Message,
						time: 4
					});
				}
			}
		}, function() {
			window.notie.alert({
				type: 3,
				text: "请求失败，请稍候再试！",
				time: 4
			});
		});
	});
}