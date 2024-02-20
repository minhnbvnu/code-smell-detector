function receive({ data }) {
    if (!data)
        return;
    if (events[data.type]) {
        events[data.type](data.content);
    }
}