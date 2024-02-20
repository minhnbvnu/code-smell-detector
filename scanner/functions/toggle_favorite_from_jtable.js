function toggle_favorite_from_jtable(e) {
    e.preventDefault();
    var me = $(e.currentTarget);
    var data = {
                'type': me.attr('data-type'),
                'id': me.attr('id'),
               };
    $.ajax({
        type: 'POST',
        data: data,
        url: favorite_url,
        success: function(data) {
            if ($(me).hasClass('favorites_icon_active')) {
                $(me).css('background-color', 'buttonface');
                $(me).removeClass('favorites_icon_active');
                favorite_count--;
            } else {
                $(me).css('background-color', '#1AC932');
                $(me).addClass('favorites_icon_active');
                favorite_count++;
            }
            if (favorite_count == 0) {
                $('span.favorites_icon').removeClass('favorites_icon_active');
                $('span.favorites_icon').addClass('favorites_icon_inactive');
            }
            else {
                $('span.favorites_icon').removeClass('favorites_icon_inactive');
                $('span.favorites_icon').addClass('favorites_icon_active');
            }
        }
    });
}