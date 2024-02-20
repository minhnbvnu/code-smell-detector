function checkValidMultipartPayload(data) {
    const result = { valid: true, message: '' };

    if (data.spec === undefined) {
        result.valid = false;
        result.message = 'Posted with multipart that has no spec.';

        return result;
    }

    const commandSpec = JSON.parse(data.spec);
    const commandBin = data.file;

    if (commandBin === undefined) {
        result.valid = false;
        result.message = 'Posted with multipart that has no binary.';
        if (commandSpec.format === 'binary') {
            result.message = 'Binary command should post with a binary file';
        } else if (commandSpec.format === 'habitat' && commandSpec.habitat.mode === 'local') {
            result.message = 'Habitat local mode should post with a binary file';
        }

        return result;
    }

    return result;
}