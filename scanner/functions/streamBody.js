async function streamBody(response, reportProgress, processChunk) {
    // How many bytes are we expecting, or NaN if no header
    let expectedBytes = parseInt(response.headers.get("Content-Length"));
    let bytesRead = 0;                       // How many bytes received so far
    let reader = response.body.getReader();  // Read bytes with this function
    let decoder = new TextDecoder("utf-8");  // For converting bytes to text
    let body = "";                           // Text read so far

    while(true) {                                 // Loop until we exit below
        let {done, value} = await reader.read();  // Read a chunk

        if (value) {                              // If we got a byte array:
            if (processChunk) {                   // Process the bytes if
                let processed = processChunk(value);  // a callback was passed.
                if (processed) {
                    body += processed;
                }
            } else {                              // Otherwise, convert bytes
                body += decoder.decode(value, {stream: true}); // to text.
            }

            if (reportProgress) {                 // If a progress callback was
                bytesRead += value.length;        // passed, then call it
                reportProgress(bytesRead, bytesRead / expectedBytes);
            }
        }
        if (done) {                               // If this is the last chunk,
            break;                                // exit the loop
        }
    }

    return body;   // Return the body text we accumulated
}