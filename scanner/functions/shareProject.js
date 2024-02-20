async function shareProject(model)
{
    console.log('share project');

    // Have the user login/register first
    let {userId, sessionId} = await login();

    let dialog = new Dialog('Share Your Project');
    dialog.wrapperDiv.style.width = '500px';

    dialog.paragraph(
        'One of the main goals of NoiseCraft is to create a community for the ' +
        'free exchange of musical ideas which encourages others to play, edit, remix and ' +
        're-share modified versions of your creations. Our hope to create a fertile ground ' +
        'for musical creativity and the exchange of knowledge.'
    );

    dialog.paragraph(
        'All of the projects shared on the NoiseCraft platform are available under the ' +
        'Creative Commons CC0 license, ' +
        'In order to share your project on this platform, you must agree ' +
        'to make it available under the ' +
        '<a href="https://creativecommons.org/publicdomain/zero/1.0/" target=”_blank”>' +
        'Creative Commons CC0 license</a>, ' +
        'which means you agree to renounce any rights or copyright claim over it, ' +
        'and effectively release it into the public domain. ' +
        'We also ask that you please not share copyrighted materials.'
    );

    var paramDiv = document.createElement('div');
    paramDiv.className = 'form_div';
    let titleElem = document.createElement('input');
    titleElem.type = 'text';
    titleElem.size = MAX_TITLE_LENGTH;
    titleElem.maxLength = MAX_TITLE_LENGTH;
    titleElem.value = model.state.title;
    paramDiv.appendChild(document.createTextNode('Project title '));
    paramDiv.appendChild(titleElem);
    dialog.appendChild(paramDiv);

    var paramDiv = document.createElement('div');
    paramDiv.className = 'form_div';
    let agreeElem = document.createElement('input');
    agreeElem.type = 'checkbox';
    paramDiv.appendChild(agreeElem);
    let agreeText = document.createElement('span');
    agreeText.innerHTML = (
        ' <b>I agree</b> to make this work publicly available under the terms of the Creative Commons CC0 license.'
    );
    paramDiv.appendChild(agreeText);
    dialog.appendChild(paramDiv);

    var shareBtn = document.createElement('button');
    shareBtn.className = 'form_btn';
    shareBtn.appendChild(document.createTextNode('Share'));
    dialog.appendChild(shareBtn);

    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'form_btn';
    cancelBtn.appendChild(document.createTextNode('Cancel'));
    cancelBtn.onclick = evt => dialog.close();
    dialog.appendChild(cancelBtn);

    // Update the project title when it gets changed in the form
    titleElem.onchange = function ()
    {
        model.update(new SetTitle(titleElem.value));
    }

    shareBtn.onclick = async function ()
    {
        let title = model.state.title;

        if (!title || title == "New Project")
        {
            dialog.showError('Choose a title for your project');
            return;
        }

        if (!agreeElem.checked)
        {
            dialog.showError('You must agree to release this work into the public domain to share it');
            return;
        }

        try
        {
            // Serialize the project
            let data = model.serialize();

            // Send a request to share the project
            let projectId = await shareRequest(userId, sessionId, title, data);
            console.log(`projectId=${projectId}`);

            // Close this dialog
            dialog.close();

            // Show the shared project URL
            showURL(projectId);
        }
        catch (e)
        {
            console.log(e);
            dialog.showError('Failed to share project');
        }
    }
}