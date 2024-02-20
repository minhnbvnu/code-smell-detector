function mappedNavKey(keyChar, ctrlKey) {
    keyChar = this.navKeyMap[keyChar];
    return keyChar && this.navKey(keyChar);
}