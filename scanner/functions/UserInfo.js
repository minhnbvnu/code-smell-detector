function UserInfo(token) {
    const userData = users.user.find(user => user.token.includes(token))
    if (userData) {
        return {
            user: userData.user,
            autho: userData.autho,
            label: userData.label
        }
    } else {
        return undefined
    }
}