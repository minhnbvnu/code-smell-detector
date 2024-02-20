function browserWarning()
{
    console.log('browserWarning');

    let agent = navigator.userAgent;

    if (agent.includes('Chrome') || agent.includes('Edge') || agent.includes('Firefox'))
        return;

    if (localStorage.getItem('displayed_browser_warning'))
        return;

    let dialog = new Dialog('Your Browser is Unsupported :(');

    dialog.paragraph(
        'NoiseCraft uses new web audio API features and works best in Chrome or Edge ' +
        'web browsers. In other web browsers, you may find that it is not yet able to ' +
        'produce audio output.'
    );

    if (agent.includes('Firefox'))
    {
        dialog.paragraph(
            'Firefox will be fully supported once this bug is resolved: ' +
            '<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1572644" target=”_blank”>' +
            'https://bugzilla.mozilla.org/show_bug.cgi?id=1572644</a>'
        );
    }

    dialog.paragraph(
        'If you have time, please consider trying NoiseCraft in Google Chrome: ' +
        '<a href="https://chrome.google.com/" target=”_blank”>' +
        'https://chrome.google.com/</a>'
    )

    var okBtn = document.createElement('button');
    okBtn.className = 'form_btn';
    okBtn.appendChild(document.createTextNode('OK'));
    okBtn.onclick = evt => dialog.close();
    dialog.appendChild(okBtn);

    localStorage.setItem('displayed_browser_warning', true);
}