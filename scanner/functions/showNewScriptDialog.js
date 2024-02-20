function showNewScriptDialog() {
    document.getElementById('newScriptDialog').classList.remove('hidden');
    document.getElementById('newScriptCreateButton').disabled = true;
    const text = document.getElementById('newScriptName');
    text.value = "";
    text.focus();
}