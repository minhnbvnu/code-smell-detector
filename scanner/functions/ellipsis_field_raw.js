function ellipsis_field_raw( data, cutoff, wordbreak ) {

    if (data.length <= cutoff) {
        return data;
    }

    let shortened = data.substr(0, cutoff - 1);

    if (wordbreak) {
        shortened = shortened.replace(/\s([^\s]*)$/, '');
    }

    return shortened + '…';
}