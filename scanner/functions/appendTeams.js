function appendTeams() {
    $.ajax({
        url: "append-teams-name",
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            $('#teamDropDown1').empty();
            $('#teamDropDown1').append('<option selected disabled>Select Teams</option>');
            if (response.code === 200) {
                allTeamsValue = response.data.teamSocialAccountDetails;
                response.data.teamSocialAccountDetails.map(data => {
                    $('#teamDropDown1').append('<option value="' + data[0].team_id + '" >' + data[0].team_name + '</option>');
                });
            } else if (response.code === 400) {
                $('#teamDropDown1').append('<option selected disabled>' + response.error + '</option>');

            } else {
                $('#teamDropDown1').append('<option selected disabled>Can not get Teams</option>');
            }
        }
    });
}