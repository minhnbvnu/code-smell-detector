function generateContainerNoty(container, type, message, timeout, id) {
        if(isShowToastNotifications === false) {
            showNotificationsCount(container, type, message, timeout, id);

            return;
        }

        var n = $(container).noty({
            text        : message,
            type        : type,
            dismissQueue: true,
            layout      : 'topCenter',
            timeout     : timeout,
            theme       : 'crits',
            maxVisible  : max_visible_notifications,
            closeWith   : ['button'],
            callback: {
                onShow: function() {

                    if(newer_notifications_location === 'top') {
                        // This line of code will reverse the ordering so that the
                        // newest notifications are on the top of the <ul> element
                        $('#notifications > ul').prepend($('#' + this.options.id).parent());
                    }

                    if(notification_anchor_location === "bottom_right") {
                        $("#notifications").css({
                            top: "auto",
                            bottom: "30px"
                        });
                    } else if(notification_anchor_location === "top_right") {
                        $("#notifications").css({
                            top: "30px",
                            bottom: "auto"
                        });
                    }

                    var $closeNotifications = $("#close_notifications");

                    if($closeNotifications.length === 0) {
                        var closeNotificationsElem = '<div id="close_notifications" class="noty_message">[Close All]</div>';

                        if(notification_anchor_location === "bottom_right") {
                            $("#notifications").append(closeNotificationsElem);
                        } else if(notification_anchor_location === "top_right") {
                            $("#notifications").prepend(closeNotificationsElem);
                        }

                        $("#close_notifications").click(function() {
                            $("#notifications").find(".noty_bar").each(function() {
                                // could do $.noty.closeAll() but it doesn't
                                // display any of the hidden notifications
                                // due to maxVisible limit.
                                $.noty.close($(this).attr("id"));
                            });
                            $("#close_notifications").hide();

                            updateQueueSize($.noty.queue.length - $("#notifications").find(".noty_bar").length);
                        });

                    } else {
                        // move the close notifications to the bottom, because
                        // it will reset to the top after all the notifications
                        // have been closed.
                        if(notification_anchor_location === "bottom_right") {
                            $closeNotifications.parent().append($closeNotifications);
                        } else if(notification_anchor_location === "top_right") {
                            $closeNotifications.parent().prepend($closeNotifications);
                        }

                        $("#close_notifications").show();
                    }

                    // Update the times after showing a new notification
                    // otherwise the notification might not even be
                    // displaying a time
                    if(serverToLocalDateDelta !== null) {
                        var currentDate = new Date();
                        var shiftedCurrentDate = new Date(currentDate - serverToLocalDateDelta);
                        updateNotificationTimes(shiftedCurrentDate);
                    }
                },
                onClose: function(self) {
                    var notifications_li = $("#notifications > ul > li");

                    if(notifications_li.length === 1) {
                        // this means that all the notifications have been
                        // closed, so hide the close notifications box.
                        $("#close_notifications").hide();
                    }

                    if(n.options.id in notyIDToNotyDict) {
                        var notyToDelete = notyIDToNotyDict[n.options.id];
                        var idToDelete = notyToDelete['mongoID'];

                        $.ajax({
                            url: notifications_ack_url,
                            dataType: "json",
                            type: "POST",
                            data: {id: idToDelete}
                        });

                        delete notyIDToNotyDict[n.options.id];
                    }

                    updateQueueSize($.noty.queue.length - 1);
                }
            }
        });

        updateQueueSize($.noty.queue.length);

        notyIDToNotyDict[n.options.id] = {'noty': n, 'mongoID': id};
    }