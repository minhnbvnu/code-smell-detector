function favorites_button_click(e) {
    e.preventDefault();
    if ($('#favorites_results').is(":visible")) {
        $('#favorites_results').slideToggle(100);
    } else {
        $.ajax({
            type: 'POST',
            data: '',
            url: $(e.currentTarget).attr('action'),
            success: function(data) {
                $('#favorites_results').slideToggle(100);
                $('#favorites_results').html(data.results);
            }
        });
    }
}