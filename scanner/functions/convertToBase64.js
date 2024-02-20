function convertToBase64(str) {
    return "data:application/octet-stream;base64," + btoa(str);
}