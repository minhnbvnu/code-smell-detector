function getModelInfo(modelName) {
    const modelInfo = db.collection('model_info').doc(modelName);
    return Promise.all([
        queryOpenId(wxContext.OPENID),
        modelInfo.get()
    ])
        .then(res => {
            if (res[0]) {
                // 内测用户
                return res[1] && res[1].data;
            }
            return res[1].data;
        });
}