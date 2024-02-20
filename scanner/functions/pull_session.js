function pull_session(url, token, args_string) {
        const connection = new ClientConnection(url, token, args_string);
        return connection.connect();
    }