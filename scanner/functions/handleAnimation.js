function handleAnimation(e) {
	anim.removeEventListener('complete', handleAnimation);
	$.button.title = 'You made it!';
}