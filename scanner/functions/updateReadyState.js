function updateReadyState(_event) {
        if (comm.kernel.ws) {
            ws.readyState = comm.kernel.ws.readyState;
        } else {
            ws.readyState = 3; // Closed state.
        }
    }