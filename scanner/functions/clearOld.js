function clearOld() {
        $.ajax({
            type: 'DELETE',
            url: '/oldlist',
            data: JSON.stringify({
                page: window.cowyo.pageName
            }),
            success: function(data) {
                $('#saveEditButton').removeClass()
                if (data.success == true) {
                    $('#saveEditButton').addClass("success");
                } else {
                    $('#saveEditButton').addClass("failure");
                }
                $('#saveEditButton').text(data.message);
                if (data.success == true) {
                    window.location = "/" + window.cowyo.pageName + "/list";
                }
            },
            error: function(xhr, error) {
                $('#saveEditButton').removeClass();
                $('#saveEditButton').addClass("failure");
                $('#saveEditButton').text(error);
            },
            contentType: "application/json",
            dataType: 'json'
        });
    }