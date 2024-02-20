function updateQueueSize(queueLength) {
        if(queueLength > 0) {
            var closeBarMessage = "[Close All]<br>(" + queueLength + " hidden notifications)";
            $("#close_notifications").html(closeBarMessage);
        } else {
            $("#close_notifications").text("[Close All]");
        }
    }