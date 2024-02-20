function personalizedNotification() {
    $(".personalization-notification").each(function () {
        if ($(this).val() && $(this).val() !== "")
            store.set("personalization-notification." + $(this).attr("name"), $(this).val());
        else store.delete("personalization-notification." + $(this).attr("name"));
    });
}