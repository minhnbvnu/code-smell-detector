function ping() {
        if (! dataConnection.open) {
            console.log('dataConnection closed in keepAlive.ping(). Stopping KEEP_ALIVE callbacks');
            return;
        }
        
        const currentTime = keepAliveTime();
        if (lastTime && (currentTime - lastTime > KEEP_ALIVE_MISSABLE_INTERVALS * KEEP_ALIVE_INTERVAL_MS)) {
            // The other side seems to have dropped connection
            console.log('lost connection. ', (currentTime - lastTime) / 1000, 'seconds without a keepAlive message.');
            // Ending the iterative callback chain should allow garbage collection to occur
            // and destroy all resources
            dropCallback && dropCallback(dataConnection);
        } else {
            // console.log('sent KEEP_ALIVE message');
            dataConnection.send(KEEP_ALIVE_MESSAGE);

            // Show or hide the connection warning as appropriate. Note that the element might not exist
            // right at the beginning of the connection.
            const connectionIsBad = lastTime && (currentTime - lastTime >= 2 * KEEP_ALIVE_INTERVAL_MS);
            setWarning && setWarning(dataConnection, connectionIsBad);

            // Schedule the next ping
            setTimeout(ping, KEEP_ALIVE_INTERVAL_MS);
        }
    }