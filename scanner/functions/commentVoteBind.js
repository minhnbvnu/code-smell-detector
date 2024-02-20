function commentVoteBind() {
	$(".cmvote").on("click", function(e) {
		window.post("/comment/CommentVote", { id: $(this).data("id") }, function(data) {
			if (data) {
				if (data.Success) {
					console.log($(this).children("span.count"));
					$(this).children("span.count").text(parseInt($(this).children("span.count").text())+1);
					$(this).addClass("disabled");
					this.disabled = true;
					window.notie.alert({ type: 1, text: data.Message, time: 4 });
				} else {
					window.notie.alert({ type: 3, text: data.Message, time: 4 });
				}
			}
		});
	});
}