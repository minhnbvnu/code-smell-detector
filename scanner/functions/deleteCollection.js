function deleteCollection(id) {
    if (!id) {
        return Promise.resolve();
    }

    return request({
        url: `${this.instance}/${this.namespace}/collections/${id}`,
        method: 'DELETE',
        context: {
            token: this.jwt
        }
    }).then(response => {
        Assert.strictEqual(response.statusCode, 204);
    });
}