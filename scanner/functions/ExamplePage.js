function ExamplePage () {
    return {
        renderTitle: (navigator, index, state) => null,
        getTitle: (navigator, index, state) => null,

        renderLeftButton: (navigator, index, state) => null,
        renderBackButton: (navigator, index, state) => null,
        getBackButtonTitle: (navigator, index, state) => null,

        renderRightButton: (navigator, index, state) => null,
        getRightButtonImage: (navigator, index, state) => null,
        getRightButtonTitle: (navigator, index, state) => null,
        onPressRightButton: (navigator, index, state) => null,

        configureScene: () => null,
        renderScene: (navigator) => null,
        getSceneClass: () => null,
        onWillFocus: (event) => null,
        onDidFocus: (event) => null,
        onWillBlur: (event) => null,
        onDidBlur: (event) => null
    }
}