function toggle_favorite(crits_type) {
    if (is_favorite) {
        $('button.favorite').css('background-color', '#1AC932');
        $('span.favorites_icon').removeClass('favorites_icon_inactive');
        $('span.favorites_icon').addClass('favorites_icon_active');
    }

    $('button.favorite').unbind('click').click(function() {
        $.ajax({
            type: "POST",
            url: favorite_url,
            data: {'type': crits_type, 'id': $(this).attr('id')},
            datatype: 'json',
            success: function(data) {
                if (data.success) {
                    if (is_favorite) {
                        is_favorite = false;
                        favorite_count--;
                        $('button.favorite').css('background-color', 'buttonface');
                        if (favorite_count == 0) {
                            $('span.favorites_icon').removeClass('favorites_icon_active');
                            $('span.favorites_icon').addClass('favorites_icon_inactive');
                        }
                    } else {
                        is_favorite = true;
                        favorite_count++;
                        $('span.favorites_icon').removeClass('favorites_icon_inactive');
                        $('span.favorites_icon').addClass('favorites_icon_active');
                        $('button.favorite').css('background-color', '#1AC932')
                    }
                }
            }
        });
    });
}