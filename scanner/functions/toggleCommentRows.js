function toggleCommentRows() {
        if ($("#show_comments").is(":checked")) {
            if ($(".comment_row").length) {
                $(".comment_row").show();
            }
        } else {
            if ($(".comment_row").length) {
                $(".comment_row").hide();
            }
        }
    }