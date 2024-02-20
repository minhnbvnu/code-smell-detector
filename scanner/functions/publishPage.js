function publishPage() {
        $.ajax({
            type: 'POST',
            url: '/publish',
            data: JSON.stringify({
                page: window.cowyo.pageName,
                publish: $('#publishPage').text() == "Publish"
            }),
            success: function(data) {
                $('#saveEditButton').removeClass()
                if (data.success == true) {
                    $('#saveEditButton').addClass("success");
                } else {
                    $('#saveEditButton').addClass("failure");
                }
                $('#saveEditButton').text(data.message);
                if (data.message == "Unpublished") {
                    $('#publishPage').text("Publish");
                } else {
                    $('#publishPage').text("Unpublish");
                }
            },
            error: function(xhr, error) {
                $('#saveEditButton').removeClass()
                $('#saveEditButton').addClass("failure");
                $('#saveEditButton').text(error);
            },
            contentType: "application/json",
            dataType: 'json'
        });
    }