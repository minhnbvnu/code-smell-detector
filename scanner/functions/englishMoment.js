function englishMoment(mom) {
    if (mom.locale() !== 'en') {
        return mom.clone().locale('en');
    }
    return mom;
}