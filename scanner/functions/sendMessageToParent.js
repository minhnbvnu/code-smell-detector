function sendMessageToParent(messageObj) {
    // Stringify the object to send via postMessage
    var messageString = JSON.stringify(messageObj)

    // Send the message to the parent window
    window.parent.postMessage(messageString, "*")
}