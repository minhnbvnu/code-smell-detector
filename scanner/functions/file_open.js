function file_open() {
	are_you_sure(function () {
		// no accept='text/*' because it hides many many types of text files, especially source code
		// altho Notepad in Windows 98 shows only *.txt files
		$("<input type='file'>").click().change(function (e) {
			if (this.files[0]) {
				load_from_blob(this.files[0]);
			}
		});
	});
}