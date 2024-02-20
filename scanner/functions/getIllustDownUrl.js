function getIllustDownUrl(scheme, userInfo, illust, page)
{
	return showMask(scheme.downloadurl, scheme.masklist, userInfo, illust, page);
	//return `${illust.parsedURL.protocol}//${illust.parsedURL.host}${illust.parsedURL.path_before_page}${page}.${illust.extention}`;
}