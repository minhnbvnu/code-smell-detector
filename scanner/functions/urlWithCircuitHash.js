function urlWithCircuitHash(jsonText) {
    if (jsonText.indexOf('%') !== -1 || jsonText.indexOf('&') !== -1) {
        jsonText = encodeURIComponent(jsonText);
    }
    return "#" + Config.URL_CIRCUIT_PARAM_KEY + "=" + jsonText;
}