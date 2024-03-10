function setColorScheme(scheme) {
    colorScheme = scheme;
    document.getElementById(scheme + 'ColorScheme').checked = 1;
    // Find the nano style sheet
    let stylesheet;
    for (let s of document.styleSheets) {
        if (s.href && s.href.indexOf('quadplay.css') !== -1) {
            stylesheet = s;
            break;
        }
    }
    if (! stylesheet) { return; }

    // Default to dots scheme
    let hrefColor = '#e61b9d';
    let emulatorColor = "url('wrap-dots.png') 50% 50% / cover";

    switch (scheme) {
    case 'pink':
        hrefColor = '#e61b9d';
        emulatorColor = '#ff4488';
        break;

    case 'black':
        hrefColor = '#0af';
        emulatorColor = '#090909';
        break;
        
    case 'white':
        hrefColor = '#0af';
        emulatorColor = '#D2C4D2';
        break;

    case 'orange':
        hrefColor = '#ff7030';
        emulatorColor = '#f04C12';
        break;
        
    case 'gold':
        hrefColor = '#dca112';
        emulatorColor = '#b68216';
        break;
        
    case 'green':
        hrefColor = '#47b52e';
        emulatorColor = '#139613';
        break;
        
    case 'blue':
        hrefColor = '#0af';
        emulatorColor = '#1074b6';
        break;

    case 'dots':
        hrefColor = '#e61b9d';
        emulatorColor = "url('wraps/dots.png') 50% 50% / cover";
        break;
        
    case 'stripes':
        hrefColor = '#da0200';
        emulatorColor = "url('wraps/stripes.png') 50% 50% / cover";
        break;

    case 'wood':
        hrefColor = '#cb7f49';
        emulatorColor = "url('wraps/oak.jpg') 50% 50% / cover";
        break;

    case 'walnut_burl':
        hrefColor = '#cb7f49';
        emulatorColor = "url('wraps/walnut_burl.jpg') 50% 50% / cover";
        break;

    case 'carbon':
        hrefColor = '#0af';
        emulatorColor = "url('wraps/carbon.png') 50% 50% / cover";
        break;
    }
    
    // Find the relevant rules and remove them
    for (let i = 0; i < stylesheet.cssRules.length; ++i) {
        const rule = stylesheet.cssRules[i];
        if ((rule.selectorText === 'a, #header a, .menu a') ||
            (rule.selectorText === '.emulator .emulatorBackground' && rule.style.background !== '')) {
            stylesheet.deleteRule(i);
            --i;
        }
    }
    // Replacement rules
    stylesheet.insertRule(`a, #header a, .menu a { color: ${hrefColor} !important; text-decoration: none; }`, 0);
    stylesheet.insertRule(`.emulator .emulatorBackground { background: ${emulatorColor}; ! important}`, 0);
    localStorage.setItem('colorScheme', colorScheme);
}