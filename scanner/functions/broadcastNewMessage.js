async function broadcastNewMessage(request, response) {
    // First, read the body of the request to get the user's message
    request.setEncoding("utf8");
    let body = "";
    for await (let chunk of request) {
        body += chunk;
    }

    // Once we've read the body send an empty response and close the connection
    response.writeHead(200).end();

    // Format the message in text/event-stream format, prefixing each
    // line with "data: "
    let message = "data: " + body.replace("\n", "\ndata: ");

    // Give the message data a prefix that defines it as a "chat" event
    // and give it a double newline suffix that marks the end of the event.
    let event = `event: chat\n${message}\n\n`;

    // Now send this event to all listening clients
    clients.forEach(client => client.write(event));
}