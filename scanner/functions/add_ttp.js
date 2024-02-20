function add_ttp() {
        var action = "add";
        var ttp = $("#form-add-ttp :input[name='ttp']").val();
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