function randomString(stringLength) {
    let content = '';
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < stringLength; i += 1) {
        content += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }

    return content;
}