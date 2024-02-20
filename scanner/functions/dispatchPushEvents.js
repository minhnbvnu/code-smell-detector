function dispatchPushEvents(url, event_prefix) {
    var prefix = event_prefix || "push-";
    var source = new EventSource(url);
    source.onmessage = (event) => {
        let serverData = JSON.parse(event.data);
        document.dispatchEvent(
            new CustomEvent(prefix + serverData.type, {
                detail: serverData.payload,
            })
        );
    };
    return source;
}