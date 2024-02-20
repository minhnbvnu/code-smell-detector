function fixOverwrittenChars(txt) {
        return fixCarriageReturn(fixBackspace(txt));
    }