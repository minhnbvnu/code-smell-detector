function postSlide() {
	if(currentSlide) {
    var notes = getCurrentNotes();
    // Replace notes with empty string if there are no notes
    // Otherwise it fails silently and does not remove old notes
    if (notes.length === 0) {
      notes = "";
    } else {
      notes = notes.html();
    }

		$('#notes').html(notes);

		// tell Showoff what slide we ended up on
		track(true);
	}
}