function add_protagonist() {
    random_string = Math.random().toString(36).substring(7);
    prota_html = $('#protagonist_list_edit_template').html();
    prota_html = prota_html.replace(/__PROTAGONIST_ID__/g, random_string);
    $('#protagonist_list_edit').append(prota_html);
}