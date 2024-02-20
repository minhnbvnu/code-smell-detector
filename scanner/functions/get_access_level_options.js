function get_access_level_options(data) {
    var options = "";

    for (var i = 0; i < access_levels.length; i++) {
        options += `<option value="${access_levels[i].id}" ${data == access_levels[i].id ? 'selected' : ''}>${access_levels[i].name}</option>`;
    }
    return options;
}