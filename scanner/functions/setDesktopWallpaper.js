function setDesktopWallpaper(file, repeat, saveToLocalStorage) {
	const blob_url = URL.createObjectURL(file);
	$desktop.css({
		backgroundImage: `url(${blob_url})`,
		backgroundRepeat: repeat,
		backgroundPosition: "center",
		backgroundSize: "auto",
	});
	if (saveToLocalStorage) {
		var fr = new FileReader();
		window.fr = fr;
		fr.onload = () => {
			localStorage.setItem("wallpaper-data-url", fr.result);
			localStorage.setItem("wallpaper-repeat", repeat);
		};
		fr.onerror = () => {
			console.error("Error reading file (for setting wallpaper)", file);
		};
		fr.readAsDataURL(file);
	}
}