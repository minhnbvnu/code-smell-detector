function _addIcon(icon, domElement, opt) {
    const cIcon = icon.cloneNode();

    cIcon.setAttribute('class', 'itowns-icon');

    cIcon.width = icon.width * opt.size;
    cIcon.height = icon.height * opt.size;
    cIcon.style.color = opt.color;
    cIcon.style.opacity = opt.opacity;
    cIcon.style.position = 'absolute';
    cIcon.style.top = '0';
    cIcon.style.left = '0';

    switch (opt.anchor) { // center by default
        case 'left':
            cIcon.style.top = `${-0.5 * cIcon.height}px`;
            break;
        case 'right':
            cIcon.style.top = `${-0.5 * cIcon.height}px`;
            cIcon.style.left = `${-cIcon.width}px`;
            break;
        case 'top':
            cIcon.style.left = `${-0.5 * cIcon.width}px`;
            break;
        case 'bottom':
            cIcon.style.top = `${-cIcon.height}px`;
            cIcon.style.left = `${-0.5 * cIcon.width}px`;
            break;
        case 'bottom-left':
            cIcon.style.top = `${-cIcon.height}px`;
            break;
        case 'bottom-right':
            cIcon.style.top = `${-cIcon.height}px`;
            cIcon.style.left = `${-cIcon.width}px`;
            break;
        case 'top-left':
            break;
        case 'top-right':
            cIcon.style.left = `${-cIcon.width}px`;
            break;
        case 'center':
        default:
            cIcon.style.top = `${-0.5 * cIcon.height}px`;
            cIcon.style.left = `${-0.5 * cIcon.width}px`;
            break;
    }

    cIcon.style['z-index'] = -1;
    domElement.appendChild(cIcon);
    return cIcon;
}