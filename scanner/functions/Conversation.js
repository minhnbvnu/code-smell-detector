function Conversation(person, nick) {
		this.nick = nick;
		this.person = person;
		this.state = this.greet;
		this.mood = Math.random()*20 - 10;
		this.loveLevel = getLoveLevel(person);
		if(this.loveLevel > LOVE_THRESHOLD && Math.random() < HORNY_PROXIMITY) {
			this.horny = true;
		}
		else {
			this.horny = false;
		}
	}