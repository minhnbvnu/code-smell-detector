function lockPage(passphrase) {
        $.ajax({
            type: 'POST',
            url: '/lock',
            data: JSON.stringify({
                page: window.cowyo.pageName,
                passphrase: passphrase
            }),
            success: function(data) {
                $('#saveEditButton').removeClass()
                if (data.success == true) {
                    $('#saveEditButton').addClass("success");
                } else {
                    $('#saveEditButton').addClass("failure");
                }
                $('#saveEditButton').text(data.message);
                if (data.success == true && $('#lockPage').text() == "Lock") {
                    window.location = "/" + window.cowyo.pageName + "/view";
                }
                if (data.success == true && $('#lockPage').text() == "Unlock") {
                    window.location = "/" + window.cowyo.pageName + "/edit";
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