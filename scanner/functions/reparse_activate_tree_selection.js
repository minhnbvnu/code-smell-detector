function reparse_activate_tree_selection() {
    $('.tree li.parent_li > span').on('click', function (e) {
        if ($(this).hasClass('node-selected')) {
            $(this).removeClass('node-selected');
            $('#msg_mv_dst_folder').text('unselected destination');
            $('#msg_mv_dst_folder_folder').text('unselected destination');
        } else {
            $(".node-selected").removeClass("node-selected");
            $(this).addClass('node-selected');
            $('#msg_mv_dst_folder').text($(".node-selected").text());
            $('#msg_mv_dst_folder_folder').text($(".node-selected").text());
        }
    });
}