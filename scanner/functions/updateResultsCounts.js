function updateResultsCounts(progress, target) {
    if(typeof startRow === "undefined") {
        progress.find('.status_tabs ul li a').each(function() {
            var target = $(this).attr('data-target');
            $(this).find('.count').html("(" + ($(this).closest('.status_tabs').find('#' + target + ' li').length) + ")");
        });
    } else {
        progress.find('.status_tabs ul li a' + target).each(function() {
            var target = $(this).attr('data-target');
            $(this).find('.count').html("(" + ($(this).closest('.status_tabs').find('#' + target + ' li').length) + ")");
        });
    }
}