function updateNotificationTimes(currentDate) {
        $("span.noty_modified").each(function() {
            var modifiedDate = new Date($(this).data("modified"));
            var dateDifference = timeAgoFuzzy(currentDate, modifiedDate);

            $(this).text(dateDifference);
        });
    }