function emoticonFromText(str) {
    var words_in = str.split(' '),
        words_out = [],
        i,
        pushEmoticon = function (alt, emote_name) {
            words_out.push('<i class="emoticon ' + emote_name + '">' + alt + '</i>');
        };

    for (i = 0; i < words_in.length; i++) {
        switch(words_in[i]) {
        case ':)':
            pushEmoticon(':)', 'smile');
            break;
        case ':(':
            pushEmoticon(':(', 'sad');
            break;
        case ':3':
            pushEmoticon(':3', 'lion');
            break;
        case ';3':
            pushEmoticon(';3', 'winky_lion');
            break;
        case ':s':
        case ':S':
            pushEmoticon(':s', 'confused');
            break;
        case ';(':
        case ';_;':
            pushEmoticon(';(', 'cry');
            break;
        case ';)':
            pushEmoticon(';)', 'wink');
            break;
        case ';D':
            pushEmoticon(';D', 'wink_happy');
            break;
        case ':P':
        case ':p':
            pushEmoticon(':P', 'tongue');
            break;
        case 'xP':
            pushEmoticon('xP', 'cringe_tongue');
            break;
        case ':o':
        case ':O':
        case ':0':
            pushEmoticon(':o', 'shocked');
            break;
        case ':D':
            pushEmoticon(':D', 'happy');
            break;
        case '^^':
        case '^.^':
            pushEmoticon('^^,', 'eyebrows');
            break;
        case '&lt;3':
            pushEmoticon('<3', 'heart');
            break;
        case '&gt;_&lt;':
        case '&gt;.&lt;':
            pushEmoticon('>_<', 'doh');
            break;
        case 'XD':
        case 'xD':
            pushEmoticon('xD', 'big_grin');
            break;
        case 'o.0':
        case 'o.O':
            pushEmoticon('o.0', 'wide_eye_right');
            break;
        case '0.o':
        case 'O.o':
            pushEmoticon('0.o', 'wide_eye_left');
            break;
        case ':\\':
        case '=\\':
        case ':/':
        case '=/':
            pushEmoticon(':\\', 'unsure');
            break;
        default:
            words_out.push(words_in[i]);
        }
    }

    return words_out.join(' ');
}