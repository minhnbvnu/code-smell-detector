function showNotificationsCount(container, type, message, timeout, id) {
        var $closeNotifications = $("#notifications_count");

        if($closeNotifications.length === 0) {
            $("#notifications").append('<div id="notifications_count" class="noty_message"></div>');
            $("#notifications_count").click(function() {
                isShowToastNotifications = true;
                if(isUnloadQueue === true) {
                    isUnloadQueue = false;

                    while(notificationQueue.length > 0) {
                        var args = notificationQueue.shift();

                        generateContainerNoty.apply(this, args);
                    }
                }

                $("#notifications_count").remove();
            });
        }

        notificationQueue.push([container, type, message, timeout, id]);
        $('#notifications_count').text("New Notifications(" + notificationQueue.length + ")");
    }