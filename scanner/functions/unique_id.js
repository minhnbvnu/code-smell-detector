function unique_id(prefix) {
        const id = settings_1.settings.dev ? `j${counter++}` : uuid4();
        if (prefix != null)
            return `${prefix}-${id}`;
        else
            return id;
    }