function reescape(data) {
    return data.replace(/>/g, "&gt;").replace(/</g, "&lt;");
}