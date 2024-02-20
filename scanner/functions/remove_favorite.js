function remove_favorite(e) {
    e.preventDefault();
    var me = $(e.currentTarget);
    var id = me.attr('data-id');
    var data = {
                'type': me.attr('data-type'),
                'id': id,
               };
    $.ajax({
        type: 'POST',
        data: data,
        url: favorite_url,
        success: function(data) {
            me.closest('tr').remove();
            // If removing current object, reset button color.
            if (is_favorite) {
                $('button.favorite').css('background-color', 'buttonface');
                is_favorite = false;
            }
            // Reset button color on jtable pages too.
            $('span.favorites_icon_active#' + id).removeClass('favorites_icon_active').css('background-color', 'buttonface');
            favorite_count--;
            if (favorite_count == 0) {
                $('#favorites_results').slideToggle(100);
                $('span.favorites_icon').removeClass('favorites_icon_active');
                $('span.favorites_icon').addClass('favorites_icon_inactive');
            }
        }
    });
}