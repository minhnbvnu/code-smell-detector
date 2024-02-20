function checkSafariContentBlockerRulesLimit(rulesOverLimit) {
        const tooManyRulesEl = document.querySelector('#too-many-subscriptions-warning');
        const messageContainer = document.querySelector('.alert__cont');

        if (rulesOverLimit) {
            messageContainer.innerHTML = i18n.__('options_content_blocker_overlimit.message', rulesLimit);
            tooManyRulesEl.style.display = 'block';
        } else {
            tooManyRulesEl.style.display = 'none';
        }
    }