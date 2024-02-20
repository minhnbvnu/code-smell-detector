function getActivity(day) {
        var data = {
            'date': day,
            'atype': atype,
            'value': value
        };
        $.ajax({
            type: "POST",
            url: activity_url,
            data: data,
            datatype: 'json',
            cache: false,
            statusCode: {
                500: function() {
                    $('#activity_date_error').html('<font color="red">Error: invalid date?</font>');
                    $('#activity_date_error').css({'display': 'inline-block'});
                }
            },
            success: function(data) {
                if (data.success) {
                    $('span.activity_list').html(data.html);
                    toggleCommentRows();
                    $('#activitydate').val(day);
                    $('#activity_date_error').css({'display': 'none'});
                    $('#activity_date_error').html('');
                }
            }
        });
    }