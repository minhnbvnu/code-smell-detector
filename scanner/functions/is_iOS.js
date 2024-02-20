function is_iOS() {
    return (
        window.navigator.userAgent.indexOf('iPad') > -1 ||
        window.navigator.userAgent.indexOf('iPhone') > -1
    );
}