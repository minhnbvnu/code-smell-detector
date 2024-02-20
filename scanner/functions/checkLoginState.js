function checkLoginState() {
    console.log('checkLoginState');
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}