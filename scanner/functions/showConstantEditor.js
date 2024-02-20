function showConstantEditor(choice) {
    console.assert(choice === undefined || choice.indexOf('.') === -1, 'showConstantEditor() does not work with nested constants');
    
    const constantEditor = document.getElementById('constantEditor');
    const array = choice ? [choice] : Object.keys(gameSource.constants);
    array.sort();
    
    // Do not show extra data if many will be visible
    const compact = choice === undefined;
    
    let html = '';

    // Process all constants named in the array
    for (let i = 0; i < array.length; ++i) {
        const index = array[i];
        
        const value = gameSource.constants[index];
        const json = gameSource.json.constants[index];
        console.assert(json);
        const debugJSON = (gameSource.debug.json && gameSource.debug.json.constants ? gameSource.debug.json.constants[index] : undefined)
        
        const constantName = index;
        const controlName = index;
        const debugControlName = 'debug_' + index;

        let entryHTML = ''; 
    
        if (json.description && json.description !== '') {
            entryHTML += `<div class="ace-quadplay" style="padding-bottom: ${compact ? 2 : 12}px"><i class="ace_comment">${json.description}</i></div>`;
        }

        entryHTML += '<span class="constantName">' + constantName + '</span> = ' + makeConstantEditorControlHTML(constantName, json, value, false, compact);

        const isContainer = json.type === 'array' || json.type === 'object';
        entryHTML = `<div class="${isContainer ? 'containerConstantEditor' : 'oneConstantEditor'}">${entryHTML}</div>`;
            
        html += entryHTML;
        
        if (i < array.length - 1) {
            html += '<hr>';
        }
    } // for each constant
    
    constantEditor.innerHTML = html;
    constantEditor.style.visibility = 'visible';
}