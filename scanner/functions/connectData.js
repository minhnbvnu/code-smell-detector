function connectData(selector, getData) {
    Array.from(document.querySelectorAll(selector)).forEach((el) => {
        allConnectedData.push([el, getData]);
    });
}