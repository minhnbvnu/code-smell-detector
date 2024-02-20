function get_avatar_initials(name, small, onClickFunction, xsmall) {
    let av_size = small ? 'avatar-sm' : 'avatar';
    av_size = xsmall ? 'avatar-xs' : av_size;
    const onClick = onClickFunction ? `onclick="${onClickFunction}"` : '';

    if (avatarCache[name] && avatarCache[name][small ? 'small' : 'large']) {
        return `<div class="avatar ${av_size}" title="${name}" ${onClick}>
            ${avatarCache[name][small ? 'small' : 'large']}
        </div>`;
    }

    const initial = name.split(' ');
    let snum;

    if (initial.length > 1 && initial[1][0] !== undefined) {
        snum = initial[0][0].charCodeAt(0) + initial[1][0].charCodeAt(0);
    } else {
        snum = initial[0][0].charCodeAt(0);
    }

    const initials = initial.map(i => i[0].toUpperCase()).join('');
    const avatarColor = get_avatar_color(snum);

    const avatarHTMLin = `<span class="avatar-title avatar-iris rounded-circle" style="background-color:${avatarColor}; cursor:pointer;">${initials}</span>`
    const avatarHTMLout = `<div class="avatar ${av_size}" title="${name}" ${onClick}>
        ${avatarHTMLin}
    </div>`;

    if (!avatarCache[name]) {
        avatarCache[name] = {};
    }
    avatarCache[name][small ? 'small' : 'large'] = avatarHTMLin;

    return avatarHTMLout;
}