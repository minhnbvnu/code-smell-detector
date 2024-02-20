function CharacterBuffer(characters) {
	this.characters = characters;
	this.current = 0;
	this.end = this.characters.length;
}