async function getZIP() {
	const JSZip = await import('jszip');
	return new JSZip();
}