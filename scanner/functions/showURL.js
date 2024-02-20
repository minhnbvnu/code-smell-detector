function showURL(projectId)
{
    let dialog = new Dialog('Sharing Successful');

    let text = document.createElement('p');
    text.innerHTML = 'Your project is now available at the following URL:';
    dialog.appendChild(text);

    let url = window.location.origin + '/' + projectId;

    // Change the current URL to include the project ID
    window.history.replaceState({}, '', url);

    var urlDiv = document.createElement('div');
    urlDiv.className = 'form_div';
    let urlElem = document.createElement('input');
    urlElem.type = 'text';
    urlElem.size = 35;
    urlElem.value = url;
    urlDiv.appendChild(urlElem);
    dialog.appendChild(urlDiv);

    var okBtn = document.createElement('button');
    okBtn.className = 'form_btn';
    okBtn.appendChild(document.createTextNode('OK'));
    okBtn.onclick = evt => dialog.close();
    dialog.appendChild(okBtn);
}