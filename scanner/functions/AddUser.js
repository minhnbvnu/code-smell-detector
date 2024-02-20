function AddUser(data) {
    const userIndex = users.user.findIndex(user => user === data.user)
    if (userIndex >= 0) {
        users.user[userIndex].token.push(data.token)
    } else {
        users.user.push({
            user: data.user,
            autho: data.autho,
            token: [data.token],
            label: data.label || '',
            tiem: new Date()
        })
    }
}