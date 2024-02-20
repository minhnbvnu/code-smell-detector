function errorDialog(message)
{
    let dialog = new Dialog('Error');

    dialog.paragraph(message);

    let saveBtn = document.createElement('button');
    saveBtn.textContent = 'Ok';
    saveBtn.className = 'form_btn';
    saveBtn.onclick = () => dialog.close();
    dialog.appendChild(saveBtn);

    return dialog;
}