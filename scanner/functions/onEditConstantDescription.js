function onEditConstantDescription(constantName) {
    let json = gameSource.json.constants[constantName];
    
    let description = json.description || '';
    
    description = window.prompt("Description for constant '" + constantName + "'", description);
    if (description) {
        switch (typeof json) {
        case 'string': json = {'type': 'string', 'value': json}; break;
        case 'number': json = {'type': 'number', 'value': json}; break;
        }
        json.description = description;
        gameSource.json.constants[constantName] = json;
        
        serverSaveGameJSON(function () {
            loadGameIntoIDE(window.gameURL, function () {
                // Select
                onProjectSelect(document.getElementById('projectConstant_' + key), 'constant', key);
            }, true);
        });
    }
}