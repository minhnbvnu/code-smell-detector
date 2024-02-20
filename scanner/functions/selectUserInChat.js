function selectUserInChat(relId, scroll = false) {
    if (relId === undefined) return;

    // scroll chat list
    if (scroll) {
        $('#chatListContainer').scrollTop(0);
        $('#chatListContainer').scrollTop(
            $(`div[data-user-id="${relId}"]`).offset().top - $('#settings').outerHeight()
        );
    }

    // some ui refreshments....
    let thisChat = $(`div.list-group-item[data-user-id="${relId}"]`);
    let others = $('.list-group-item').not(thisChat);
    others.removeClass('active');
    $('> div input', others).addClass('btn-primary').removeClass('btn-light');
    $('> div div span', others).addClass('badge-primary').removeClass('badge-light');

    $(thisChat).addClass('active');
    $('> div input', thisChat).addClass('btn-light').removeClass('btn-primary');
    $('> div div span', thisChat).addClass('badge-light').removeClass('badge-primary');

    // show popup
    let chatId = usersIndex[relId];
    let lastLocation = users[chatId].locations.slice(-1);
    if (lastLocation.length > 0) {
        let c = lastLocation[0].coordinates;

        newPopup.show(
            c,
            `<div><img src="${users[chatId].photo}" width="80" height="80" /><p>${users[chatId].name}</p></div>`
        );
    }
}