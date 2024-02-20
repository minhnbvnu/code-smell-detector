function getUserMock(user) {
    const result = {
        update: sinon.stub(),
        sealToken: sinon.stub(),
        unsealToken: sinon.stub().returns('token'),
        getDisplayName: sinon.stub(),
        id: user.id,
        username: user.username,
        token: user.token,
        scmContext: user.scmContext
    };

    return result;
}