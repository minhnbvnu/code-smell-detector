function podExists(podName) {
    for (i=0; i<aliens.length; i++) {
        if (aliens[i]["name"] == podName) {
            return true;
        }
    }
    return false;
}