function addUploadListener() {
	g("upload").onclick = function () {
		flashObj.upload();
		this.style.display = "none";
	};
}