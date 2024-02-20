function multiScreenAdd(max_swipe_num, max_friend_num) {
    var total = 0;
    var swipe_num = 0;
    for (var i = 0;i < max_swipe_num;i++) {
        if (total > max_friend_num) break;
        if (swipe_num > max_swipe_num) break;

        total += oneScreenAdd();
        swipe(540, 1700, 540, 0, 50);
        sleep(3000);
        swipe_num++;
    }
}