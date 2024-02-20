function editDomain(value, settings, elem) {
        var result = "";
        $.ajax({
            type: "POST",
            async: false,
            url: $(elem).attr('action'),
            success: function(data) {
                result = data;
            },
            data: {'value':value}
        });
        if (result != value) {
            alert("Please enter a valid domain name.");
        } else {
            //update url
            $(elem).attr('action', $(elem).attr('action').replace(/\/[^/]+\/$/, '/'+result+'/'));
            //alert($(elem).attr('action'));
        }
        return result;
    }