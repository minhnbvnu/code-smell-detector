function parse_token(token) {
        let payload = token.split(".")[0];
        const mod = payload.length % 4;
        if (mod != 0)
            payload = payload + "=".repeat(4 - mod);
        return JSON.parse(atob(payload.replace(/_/g, "/").replace(/-/g, "+")));
    }