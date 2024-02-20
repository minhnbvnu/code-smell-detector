function createCollection(body) {
    return this.getJwt(this.apiToken).then(response => {
        this.jwt = response.body.token;

        return request({
            url: `${this.instance}/${this.namespace}/collections`,
            method: 'POST',
            context: {
                token: this.jwt
            },
            json: body
        });
    });
}