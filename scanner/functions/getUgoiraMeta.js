function getUgoiraMeta(iid, onload_suceess_Cb, onload_hasError_Cb, onload_notJson_Cb, onerror_Cb)
{
	xhrGenneral(
		"https://app-api.pixiv.net/v1/ugoira/metadata?illust_id=" + iid,
		onload_suceess_Cb,
		onload_hasError_Cb,
		onload_notJson_Cb,
		onerror_Cb
	);
}