function generateSteps() {
    let stepsPage = pageMappings[window.location.pathname.replace('/', '')];
    if (stepsPage !== CURRENT_PATH) {
        CURRENT_PATH = stepsPage;
        let languageID = languageMappings['en'];
        // let languageID = languageMappings[userLanguage ?? 'en'];
        console.log(stepsPage, languageID, 'steps and language');
        loadFile(`/js/productTour/${languageID}/${stepsPage}`);
        setTimeout(() => {
            startTour();
        }, 500);
    } else startTour();
}