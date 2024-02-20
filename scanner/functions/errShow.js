function errShow(item, err) {
    if (typeof err != "undefined" && err != null) {
        console.log(err);
        $("#loading").hide();
        item.show();
        return true;
    }
    return false;
}