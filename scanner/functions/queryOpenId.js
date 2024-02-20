function queryOpenId(currentId) {
    return db.collection('openid_list').where({
        openid: _.eq(currentId)
    })
        .get()
        .then(res => {
            return !!(res && res.data && res.data.length);
        });
}