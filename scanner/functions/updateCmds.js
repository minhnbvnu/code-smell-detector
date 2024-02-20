function updateCmds( cmds ){
	var v, div, btn, words, label, input;
	for(var k in cmds) {
		v = cmds[ k ];
		if(v === null) {
			$('div#'+k).remove();
			$('button#'+k).remove();
			
		} else if(v === true) {
			btn = $('<button>').text(_T(k)).attr('id', k).attr('arg', 0).addClass('cmd');
			$('#cmds').append(btn);
			btn.on('click', onBtnClicked);
			
		} else if(typeof v === 'string') {
			div = $('<div>').attr('id',k).addClass('cmd');
			$('#cmds').append(div);
			input = $('<input>').attr('id', k).addClass('cmd');
			words = v.split(',');
			switch(words[0]) {
			case 'range':
				input.attr('type', 'range');
				if(words[1]) {
					var min = parseInt(words[1]);
					input.attr('min', min).val(min);
				}
				if(words[2]) input.attr('max', parseInt(words[2]));
				break;
			case 'number':
				input.attr('type', 'number').attr('size',5);
				if(words[1]) input.attr('min', parseInt(words[1]));
				if(words[2]) input.attr('max', parseInt(words[2]));
				break;
			case 'password':
				input.attr('type', 'password').attr('size',40);
				break;
			//case 'text':
			default:
				input.attr('type', 'text').attr('size',40);
				break;
			}
			div.append(input);
			btn = $('<button>').text(_T(k)).attr('id', k).addClass('cmd');
			div.append(btn);
			btn.on('click', onInputBtnClicked);
			input.keydown(onInputBoxEnter);
			
		} else if( Object.prototype.toString.call( v ) === '[object Array]' ) {
			div = $('<div>').attr('id',k).addClass('cmd');
			$('#cmds').append(div);
			for(var i=0; i<v.length; i++) {
				var arg = v[i];
				var t_arg = (typeof arg === 'string') ? _T(arg) : arg;
				btn = $('<button>').text(_T(k)+' '+ t_arg).attr('id', k).attr('arg', arg).addClass('cmd');
				div.append(btn);
				btn.on('click', onBtnClicked);
			}
			
		} else if( typeof v === 'object' ) {
			btn = $('<button>').text(_T(k)).attr('id', k).addClass('cmd');
			$('#cmds').append(btn);
			
			var dlg = $('<div>').attr('id',k).addClass('dialog');
			$('body').append(dlg);
			dlg.hide();
			
			var dlgheader = $('<div>').addClass('dlgheader');
			dlg.append(dlgheader);
			dlgheader.append($('<span>').text(_T(k)));
			var X = $('<button>').text('X').attr('X', k).addClass('cmd');
			dlgheader.append(X);
			for(var j in v) {
				label = $('<label>').attr('for', j).text(_T(j)+':').addClass('cmd');
				input = $('<input>').attr('id', j).addClass(k).addClass('cmd');
				
				words = v[j].split(',');
				switch(words[0]) {
				case 'range':
					input.attr('type', 'range');
					if(words[1]) input.attr('min', parseInt(words[1]));
					if(words[2]) input.attr('max', parseInt(words[2]));
					break;
				case 'number':
					input.attr('type', 'number').attr('size',5);
					if(words[1]) input.attr('min', parseInt(words[1]));
					if(words[2]) input.attr('max', parseInt(words[2]));
					break;
				case 'password':
					input.attr('type', 'password').attr('size',40);
					break;
				//case 'text':
				default:
					input.attr('type', 'text').attr('size',40);
					break;
				}
				
				switch(j) { // auto fill if we remember uid & passwd
				case 'uid':
					var u = localStorage.getItem('x_userid');
					if(u) input.val(u);
					break;
				case 'passwd':
					var p = localStorage.getItem('x_passwd');
					if(p) input.val(p);
					break;
				}
				
				dlg.append(label).append(input).append('<br/>');
			}
			var dlgfooter = $('<div>').addClass('dlgfooter');
			dlg.append(dlgfooter);
			var OK = $('<button>').text('OK').attr('OK', k).addClass('cmd');
			dlgfooter.append(OK);
			
			btn.on('click', onDialogBtnClicked);
			OK.on('click', onDialogOKClicked);
			X.on('click', onDialogXClicked);

		} else {
			
		}
	}
}