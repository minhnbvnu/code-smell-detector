function showNewConstantDialog(parentKey) {
    document.getElementById('newConstantDialog').classList.remove('hidden');
    document.getElementById('newConstantCreateButton').disabled = true;
    const text = document.getElementById('newConstantName');
    text.value = '';
    text.focus();
    text.style.visibility = 'inherit';

    if (parentKey) {
        const parent = nestedGet(gameSource.json.constants, parentKey, false, true);

        let parentName = parentKey.replaceAll(/\.[0-9]+(?=\.)/g, function (match) { return '[' + match.substring(1) + ']';});
        
        if (parent.type === 'array') {
            text.style.visibility = 'hidden';
            parentName += '[' + parent.value.length + ']';
            document.getElementById('newConstantCreateButton').disabled = false;
        } else {
            parentName += '.';
        }
        document.getElementById('newConstantNameParent').innerHTML = parentName;
    } else {
        document.getElementById('newConstantNameParent').innerHTML = '';
    }

    document.getElementById('newConstantCreateButton').onclick = function () { onNewConstantCreate(parentKey); };
    
    document.getElementById('newConstantNumberMin').value = '-infinity';
    document.getElementById('newConstantNumberMax').value = '+infinity';
    document.getElementById('newConstantNumberQuantum').value = '0.01';
    document.getElementById('newConstantNumberFormat').value = '0.00';
    
    // Only make reference types valid if there is already some other
    // asset or constant to refer to.
    document.getElementById('newConstantTypeReference').disabled = 
        (Object.keys(gameSource.json.constants).length === 0 && Object.keys(gameSource.json.assets).length === 0);

    document.getElementById('newConstantDescription').value = '';
}