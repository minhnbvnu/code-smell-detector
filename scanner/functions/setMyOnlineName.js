function setMyOnlineName(n) {
    n = n.trim();
    myOnlineName = '';
    
    // Only permit quadplay characters
    for (let i = 0; i < n.length; ++i) {
        if (fontMap[n[i]] !== undefined) {
            myOnlineName += n[i];
        }
    }
    
    if (myOnlineName.length === 0) {
        myOnlineName = 'Unknown';
    }
    
    myOnlineName = myOnlineName.substring(0, MAX_ONLINE_NAME_LENGTH);
    localStorage.setItem('myOnlineName', myOnlineName);
}