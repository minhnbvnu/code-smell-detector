function verbose_descr(abbrev) {
    switch(abbrev) {
    case 'H':
	return 'horizontal ';
    case 'V':
	return 'vertical ';
    case '':
	return '';
    }
    throw 'Invalid abbreviation';
}