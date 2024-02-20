async function handleKeys() {
    // Get a stream of keypress events and loop once for each one
    for await (const event of eventStream(document, "keypress")) {
        console.log(event.key);
    }
}