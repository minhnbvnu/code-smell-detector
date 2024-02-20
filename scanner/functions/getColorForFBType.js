function getColorForFBType(type = 'BUSY') {
	switch (type) {
	case 'FREE':
		return 'rgba(255,255,255,0)'

	case 'BUSY-TENTATIVE':
		return 'rgb(221,203,85)'

	case 'BUSY':
		return 'rgb(201,136,121)'

	case 'BUSY-UNAVAILABLE':
		return 'rgb(182,70,157)'

	default:
		return 'rgb(0,130,201)'
	}
}