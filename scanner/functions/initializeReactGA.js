function initializeReactGA() {
    ReactGA.initialize('UA-144935830-1');
    ReactGA.pageview('/homepage');
    ReactGA.event({
        category: 'User',
        action: 'Create an Account'
    });
}