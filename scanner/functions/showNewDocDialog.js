function showNewDocDialog() {
    document.getElementById('newDocDialog').classList.remove('hidden');
    document.getElementById('newDocCreateButton').disabled = true;
    const text = document.getElementById('newDocName');
    text.value = "";
    text.focus();
    
    document.getElementById('newDocFormat').value = ".md.html";
    document.getElementById('newDocTemplate').value = "empty";
}