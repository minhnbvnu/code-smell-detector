function setLastUpdatedTimeText(date) {
        const lastUpdateTime = new Date(date);
        const options = {
            year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
        };
        const updateText = lastUpdateTime.toLocaleString(environmentOptions.Prefs.locale, options);
        document.querySelector('#lastUpdateTime').textContent = updateText;
    }