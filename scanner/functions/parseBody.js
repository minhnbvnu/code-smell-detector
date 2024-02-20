function parseBody(response) {
    return response.text().then(text => {
        if (!text || !text.length) {
            warning(response.status === 204, 'You should return a 204 status code with an empty body.');
            return null;
        }

        warning(response.status !== 204, 'You should return an empty body with a 204 status code.');

        try {
            return JSON.parse(text);
        } catch (error) {
            return text;
        }
    });
}