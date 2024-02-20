function renderFakeFormatString(fakeFormatString, date) {
    return processMaybeMarkers(renderFakeFormatStringParts(fakeFormatString, date).join(''));
}