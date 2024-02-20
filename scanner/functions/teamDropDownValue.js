function teamDropDownValue() {
    let teams = '';
    teams = '<option selected disabled>Select Teams</option>\n';
    allTeamsValue.map(data => {
        teams += '<option value="' + data[0].team_id + '" >' + data[0].team_name + '</option>'
    });
    return teams;

}