function rebindingSuccessCb(msg) {
    console.log(`Iframe reports attack successful for ${msg.origin}\n${msg.data.response}`);
    if ((app.getConfiguration().getAlertSuccess() !== 'false') &&
        (app.getConfiguration().getType() === 'manager') &&
        (document.getElementById('payloads').value !== 'Hook and Control')) {
        alert('Attack Successful from ' + document.domain + '.\n'
            + 'Origin: \n' + msg.origin + '.\n'
            + 'Target home page contents:\n' + msg.data.response);
    }
}