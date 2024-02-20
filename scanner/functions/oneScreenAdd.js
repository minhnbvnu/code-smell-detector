function oneScreenAdd() {
    var total;
    id("com.alipay.mobile.chatapp:id/grid_item_root").find().forEach(function (o) {
        o.click();
        sleep(1500);
    
        var friend;
        if (friend = text("加好友").findOnce()) {
            friend.click();
            sleep(2000);

            if (text("发消息").exists()) {
                total++;
                toastLog("加好友成功");
            } else if (text("朋友验证").exists()) {
                back();
                sleep(1500);
                back();
                sleep(1500);
            }
        }
        back();
        sleep(1500);
    });

    return total;
}