function remove_ttp() {
        var action = "remove";
        var ttp = $("#remove-ttp-form").attr('data-ttp');
        var data = {'ttp': ttp, 'action': action};
        $.ajax({
            type: "POST",
            url: ttp_target,
            data: data,
            datatype: 'json',
            success: function(result) {
                if (result.success) {
                    $('#ttp_data').html(result.html);
                }
                else {
                    $('#ttp_data').html(result.message);
                }
            }
        });
    }