function buffer_to_base64(buffer) {
        const bytes = new Uint8Array(buffer);
        const chars = Array.from(bytes).map((b) => String.fromCharCode(b));
        return btoa(chars.join(""));
    }