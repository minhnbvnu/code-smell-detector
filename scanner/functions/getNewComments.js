function getNewComments() {
        var day = $("table.comment_table tr:first-child td:nth-child(2) div.comment_info span:first-child b:first-child").text();
        var convert = false;
        if (day.length < 1) {
            day = new Date().setHours(0,0,0,0);
            convert = true;
        }
        data = {
            'date': day,
            'atype': atype,
            'value': value,
            'convert': convert
        }
        var today = $('#activitydate').val()
        var check = $.datepicker.formatDate('yy-mm-dd', new Date());
        if (today == check) {
            $.ajax({
                type: "POST",
                url: new_comments_url,
                data: data,
                datatype: 'json',
                success: function(data) {
                    if (data.success) {
                        $(data.html).prependTo("table.comment_table > tbody");
                        toggleCommentRows();
                    }
                },
            });
        }
        setTimeout(getNewComments, 60000);
    }