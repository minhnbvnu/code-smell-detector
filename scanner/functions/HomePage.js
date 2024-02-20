function HomePage () {
    return {
        getTitle: () => '首页',
        getSceneClass: () => require('./pages/HomePage').default
    }
}