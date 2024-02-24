function is_googlephotos(domain, url) {
	// example URL:
	// https://lh3.googleusercontent.com/d0S766DSecCcu1Q544n3s46uWD5oe7YpSZUqTyZlSTpNP2SF7-RSWuw3XXZ3iGddkYHzrNnopdxxwGPWVWvAwDQBl8We-b6cij1icKXgnl--E3VA9RWLQb4jFSOLq8Oicrpr7J89B2irwIIRfni5j91my2_V61LT3XmhORrWABfA5PIj_r2tsJwU7Oj8f3o0cnmjCZcea7UauXwlckPPi16cPmc3w5kRBGCbsnBlDpLLUlYgJIVJM0_usk83WwCL4XQmP6sK4NFR3m3jMgi6gV0Ocq3PsRXcL9ansYTzfFxaaYow_ugCJWX4cW_GP9cGLEs4nYAOJxCZaYJU5dwnaCbItXYXXRtDaOiTz69ZW0LvVZhBxrH9FDXKVACPa7IJoSrAJXSIBX59SzwxWC50qPyVdSS70PXdj2B1VWXRaduUYmpoaspVsW4IptE18vn2m6tWMT-OFRLdRaF3Vd6VplmCnnr9bdl0LOiLUChctwscQE9Lp4N3mwt2l65HXpB6wMo11HSDG1ARcLyUecFWiNzyUoimwGdX0P4X02at54cOeqCeIoqEP14uvLo=s0?imgmax=0
	// still working:
	// https://lh3.googleusercontent.com/ET-I3WGzylf5h2QIpdyuRrWGoTb3C3DVRow4oAOpt7VuOccWLjyUoWb2iW0kmgle-mN8yTYCZkYJvM6w-FLDuo7Yp7TpTi1YzldjX1Y2qzAfWQ_0Yd0LlGwS18gpYUpROhnmEBO6CeqjuTvBPZTtrf-eTnqCgTaOLNL0ENOgW0EUS1ZxJsdZ_TYHznqUveHD8hcko93CETrh2IeGXKYDGzM0wDmfD836jgroWJTHOXKUr7wFbKghZmmudMfsU4EEn8WrkU_8GJYaDCRnxj_aGtIWBXn1wh4gqOY7OnTR7BQXp7I0eH06B6Cy3C9sTFWuJU5NBoZORLlSs5zCJ-b3Bbc_BEB0xbsHJ_mAziE6bsHCcniOdJ8SNqNQgW9uoW38tY5MKFg-knhfSNxAk2sGBTQ2wczQV6uTUll5ZVOWAPVkwYCX9Ky6gjd-s9ymx-pR7Ray10mDv1KZ1NeqAXdbVAV30tPYv6HnCe1n4C9y_PnuBI688t9k0NNqBjDj-h8pEVdmCjUx2ZEFp5mTBxJCau2sgI59HGrE_6D7XaUWm294kWlOfGrkPeTE_S8ssaCE7DV-CBmtRoWQFHXlZOa9AL750j9dgMurdn4PjpROUALhl7bHpim9o8jc_vOrAc_ZJdAVmcXigFx8KD_ltLq8MbwNpCoMKZr-uQ=w958-h719-no
	//   https://lh3.googleusercontent.com/ET-I3WGzylf5h2QIpdyuRrWGoTb3C3DVRow4oAOpt7VuOccWLjyUoWb2iW0kmgle-mN8yTYCZkYJvM6w-FLDuo7Yp7TpTi1YzldjX1Y2qzAfWQ_0Yd0LlGwS18gpYUpROhnmEBO6CeqjuTvBPZTtrf-eTnqCgTaOLNL0ENOgW0EUS1ZxJsdZ_TYHznqUveHD8hcko93CETrh2IeGXKYDGzM0wDmfD836jgroWJTHOXKUr7wFbKghZmmudMfsU4EEn8WrkU_8GJYaDCRnxj_aGtIWBXn1wh4gqOY7OnTR7BQXp7I0eH06B6Cy3C9sTFWuJU5NBoZORLlSs5zCJ-b3Bbc_BEB0xbsHJ_mAziE6bsHCcniOdJ8SNqNQgW9uoW38tY5MKFg-knhfSNxAk2sGBTQ2wczQV6uTUll5ZVOWAPVkwYCX9Ky6gjd-s9ymx-pR7Ray10mDv1KZ1NeqAXdbVAV30tPYv6HnCe1n4C9y_PnuBI688t9k0NNqBjDj-h8pEVdmCjUx2ZEFp5mTBxJCau2sgI59HGrE_6D7XaUWm294kWlOfGrkPeTE_S8ssaCE7DV-CBmtRoWQFHXlZOa9AL750j9dgMurdn4PjpROUALhl7bHpim9o8jc_vOrAc_ZJdAVmcXigFx8KD_ltLq8MbwNpCoMKZr-uQ=s0?imgmax=0
	if (domain.match(/\.googleusercontent\.com$/) ||
		domain.match(/\.ggpht\.com$/)) {
		if (/\/proxy\//.test(url))
			return true;

		var p1 = url.replace(/^[a-z]+:\/\/[^/]*\/([^/]*).*?$/, "$1");
		console.log(p1.length);
		return p1.length > 450;
	}

	return false;
}