function getTranslatedOrdinalNumber(bySetPositionNum) {
	switch (bySetPositionNum) {
	case 1:
		return t('calendar', 'first')

	case 2:
		return t('calendar', 'second')

	case 3:
		return t('calendar', 'third')

	case 4:
		return t('calendar', 'fourth')

	case 5:
		return t('calendar', 'fifth')

	case -2:
		return t('calendar', 'second to last')

	case -1:
		return t('calendar', 'last')

	default:
		return ''
	}
}