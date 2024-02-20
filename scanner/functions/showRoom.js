function showRoom(room) {
	$('#roomname').empty();
	$('#roomdesc').empty();
	$('#sharedcards').empty();
	$('#pot').empty();
	$('#countdown').empty();
	$('#seats').empty();
	$('#mycards').empty();
	if(! room) return;
	
	$('#roomname').text( _T('room number') + ': ' + room.id + ' (' + room.name + ')');
	
	var gamers = room.gamers;
	var seats = room.seats;
	var cards = room.cards;
	var chips = room.chips;
	$('#roomdesc').text(_T('gamers in room') + ': ' + Object.keys(gamers).join(', '));
	for(var i=0, len=seats.length; i<len; i++) {
		var uid = seats[i];
		var g = uid ? gamers[ uid ] : null;
		var str = "#" + i + ': ';
		if(g) {
			str += g.uid + ' (' + g.name + ') [' + g.coins + ', ' + g.score + ', ' + g.exp + ', ' + g.level + ']';
			if(cards && cards[i]) {
				str += _T_('private cards') + '[ ' + Poker.visualize( cards[i] ) + ' ]';
				
				if(g.uid === client.uid) {
					$('#mycards').html( client.uid + ', ' + _T('my cards') + ': <br/>' + Poker.toHTML(cards[i]) );
				}
			}
			if(chips && chips[i]) {
				str += _T_('bet') + '[ ' + chips[i] + ' ]';
			}
			
		} else {
			str += '(' + _T('empty') + ')';
		}
		$('#seats').append($('<li>').text(str).attr('id', 'seat'+i).addClass('seat'));
	}
	
	if(room.shared_cards) {
		$('#sharedcards').html( _T('shared cards') + ': <br/>' + Poker.toHTML(room.shared_cards) );
	}
	
	if(room.pot) {
		$('#pot').text( _T('pot') + ': ' + room.pot );
	}
	
}