function encryptPage(passphrase) {
        $.ajax({
            type: 'POST',
            url: '/encrypt',
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

                if (data.success == true && $('#encryptPage').text() == "Encrypt") {
                    window.location = "/" + window.cowyo.pageName + "/view";
                }
                if (data.success == true && $('#encryptPage').text() == "Decrypt") {
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