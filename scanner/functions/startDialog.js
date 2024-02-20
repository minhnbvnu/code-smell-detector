function startDialog(dialog, branch) {

        /*
        format in the tile editor:
        1) I am hungry : I have no food
        2) I want a drink : What do you want?
        2.1) Just water : there you go.
        2.2) Wine : there you go.
        */

        // filter the dialog branches
        var validDialogs = [], choices = [],
            prefix, after, div, button, doc, i,
            currentChoice = 0,
            updateSelected, moveUp, moveDown, selectAction, thisChoice;

        if (branch) {
            for (i in dialog) {
                if (dialog.hasOwnProperty(i)) {
                    prefix = i.split(')')[0];

                    // eg: if branch is "1.1", we want "1.1.1 and "1.1.2"
                    if (prefix.indexOf(branch) === 0 && prefix.length === (branch.length + 2)) {
                        after = i.split(')')[1];

                        validDialogs.push({
                            'question': after,
                            'answer': dialog[i],
                            'branch': prefix
                        });
                    }
                }
            }
        } else {
            for (i in dialog) {
                if (dialog.hasOwnProperty(i)) {
                    prefix = i.split(')')[0];

                    if (prefix.length === 1) {
                        after = i.split(')')[1];

                        validDialogs.push({
                            'question': after,
                            'answer': dialog[i],
                            'branch': prefix
                        });
                    }
                }
            }
        }

        validDialogs.push({
            'question': "Bye!",
            'answer': false,
            'branch': false
        });

        gameMode = 'dialog';

        doc = window.document;
        div = doc.createElement('div');
        div.id = 'dialogBox';
        div.className = 'dialog';
        div.style.top = '0';
        div.style.left = '50px';
        div.style.width = (Scene.w - 140) + 'px';
        div.style.position = 'absolute';
        div.style.zIndex = String(1000);

        if (dialog.answer) {
            div.innerHTML = '<p>' + dialog.title + ' : ' + dialog.answer + '</p>';
        } else if (dialog.start) {
            div.innerHTML = '<p>' + dialog.title + ' : ' + dialog.start + '</p>';
        }

        for (i = 0; i < validDialogs.length; i += 1) {
            button = document.createElement('button');
            button.innerHTML = validDialogs[i].question;
            button.id = 'b' + i;

            div.appendChild(button);

            choices[button.id] = {
                'dom': button,
                'branch': validDialogs[i].branch,
                'answer': validDialogs[i].answer
            };
        }

        updateSelected = function (selectedID) {
            // clear selections first
            for (i = 0; i < validDialogs.length; i += 1) {
                choices['b' + i].dom.className = '';
            }

            choices['b' + selectedID].dom.className = 'selected';
        };

        Scene.dom.appendChild(div);

        moveUp = function (evt) {
            if (evt.value) {
                currentChoice = Math.max(0, currentChoice - 1);
                SoundJS.play('click');
                updateSelected(currentChoice);
            }
        };
        Input.dom.addEventListener('sjsup', moveUp);

        moveDown = function (evt) {
            if (evt.value) {
                currentChoice = Math.min(currentChoice + 1, validDialogs.length - 1);
                SoundJS.play('click');
                updateSelected(currentChoice);
            }
        };
        Input.dom.addEventListener('sjsdown', moveDown);

        selectAction = function (evt) {
            if (!evt.value) {
                thisChoice = choices['b' + currentChoice];

                Scene.dom.removeChild(div);

                evt.stopPropagation();
                evt.preventDefault();
                Input.dom.removeEventListener('sjsup', moveUp);
                Input.dom.removeEventListener('sjsdown', moveDown);

                if (thisChoice && thisChoice.answer) {
                    dialog.answer = thisChoice.answer;

                    return startDialog(dialog, thisChoice.branch);
                }

                dialog.answer = false;
                gameMode = 'exit_dialog';

                Input.dom.removeEventListener('sjsaction', selectAction);
                Scene.ticker.resume();
            }
        };
        Input.dom.addEventListener('sjsaction', selectAction);

        updateSelected(currentChoice);
    }