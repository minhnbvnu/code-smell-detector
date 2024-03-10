function tsip_header_parse(o_ragel_state, o_msg){
	var cs = 0;
	var p = o_ragel_state.i_tag_start;
	var pe = o_ragel_state.i_tag_end;
	var eof = pe;
	var data = o_ragel_state.o_data;
	var s_str = o_ragel_state.s_data.substring(o_ragel_state.i_tag_start, o_ragel_state.i_tag_start + (o_ragel_state.i_tag_end - o_ragel_state.i_tag_start));
	
	
/* line 5103 "./src/parsers/tsip_parser_header.js" */
{
	 cs = tsip_machine_parser_headers_start;
} /* JSCodeGen::writeInit */

/* line 728 "./ragel/tsip_parser_header.jrl" */
	
/* line 5110 "./src/parsers/tsip_parser_header.js" */
{
	var _klen, _trans, _keys, _ps, _widec, _acts, _nacts;
	var _goto_level, _resume, _eof_trans, _again, _test_eof;
	var _out;
	_klen = _trans = _keys = _acts = _nacts = null;
	_goto_level = 0;
	_resume = 10;
	_eof_trans = 15;
	_again = 20;
	_test_eof = 30;
	_out = 40;
	while (true) {
	_trigger_goto = false;
	if (_goto_level <= 0) {
	if (p == pe) {
		_goto_level = _test_eof;
		continue;
	}
	if (cs == 0) {
		_goto_level = _out;
		continue;
	}
	}
	if (_goto_level <= _resume) {
	_keys = _tsip_machine_parser_headers_key_offsets[cs];
	_trans = _tsip_machine_parser_headers_index_offsets[cs];
	_klen = _tsip_machine_parser_headers_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_headers_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_headers_trans_keys[_mid]) {
	           _lower = _mid + 1;
	        } else {
	           _trans += (_mid - _keys);
	           _break_match = true;
	           break;
	        };
	     } /* while */
	     if (_break_match) { break; }
	     _keys += _klen;
	     _trans += _klen;
	  }
	  _klen = _tsip_machine_parser_headers_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_headers_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_headers_trans_keys[_mid+1]) {
	          _lower = _mid + 2;
	        } else {
	          _trans += ((_mid - _keys) >> 1);
	          _break_match = true;
	          break;
	        }
	     } /* while */
	     if (_break_match) { break; }
	     _trans += _klen
	  }
	} while (false);
	_trans = _tsip_machine_parser_headers_indicies[_trans];
	cs = _tsip_machine_parser_headers_trans_targs[_trans];
	if (_tsip_machine_parser_headers_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_headers_trans_actions[_trans];
		_nacts = _tsip_machine_parser_headers_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_headers_actions[_acts - 1]) {
case 0:
/* line 20 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 1:
/* line 27 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 2:
/* line 34 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 3:
/* line 41 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 4:
/* line 48 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 5:
/* line 55 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 6:
/* line 62 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Allow.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 7:
/* line 69 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Allow_Events.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 8:
/* line 76 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 9:
/* line 83 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Authorization.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 10:
/* line 90 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Call_ID.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 11:
/* line 97 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 12:
/* line 104 "./ragel/tsip_parser_header.jrl" */

	    var headers = tsip_header_Contact.prototype.Parse(s_str);
	    for(var i = 0; i < headers.length; ++i){
		    o_msg.add_header(headers[i]);
		}
			break;
case 13:
/* line 113 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 14:
/* line 120 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 15:
/* line 127 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 16:
/* line 134 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Content_Length.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 17:
/* line 141 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Content_Type.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 18:
/* line 148 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_CSeq.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 19:
/* line 155 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Date.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 20:
/* line 162 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 21:
/* line 169 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Event.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 22:
/* line 176 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Expires.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 23:
/* line 183 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_From.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 24:
/* line 190 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 25:
/* line 197 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 26:
/* line 204 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 27:
/* line 211 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 28:
/* line 218 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 29:
/* line 225 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Max_Forwards.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 30:
/* line 232 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 31:
/* line 239 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Min_Expires.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 32:
/* line 246 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Min_SE.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 33:
/* line 253 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Organization.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 34:
/* line 260 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_P_Access_Network_Info.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 35:
/* line 267 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 36:
/* line 274 "./ragel/tsip_parser_header.jrl" */

	    var headers = tsip_header_P_Asserted_Identity.prototype.Parse(s_str);
		if(headers){
			for(var i = 0; i < headers.length; ++i){
				o_msg.add_header(headers[i]);
			}
		}
			break;
case 37:
/* line 285 "./ragel/tsip_parser_header.jrl" */

	    var headers = tsip_header_P_Associated_URI.prototype.Parse(s_str);
		if(headers){
			for(var i = 0; i < headers.length; ++i){
				o_msg.add_header(headers[i]);
			}
		}
			break;
case 38:
/* line 296 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 39:
/* line 303 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_P_Charging_Function_Addresses.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 40:
/* line 310 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 41:
/* line 317 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 42:
/* line 324 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 43:
/* line 331 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 44:
/* line 338 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 45:
/* line 345 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 46:
/* line 352 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 47:
/* line 359 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 48:
/* line 366 "./ragel/tsip_parser_header.jrl" */

		var headers = tsip_header_P_Preferred_Identity.prototype.Parse(s_str);
		if(headers){
			for(var i = 0; i < headers.length; ++i){
				o_msg.add_header(headers[i]);
			}
		}
			break;
case 49:
/* line 377 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 50:
/* line 384 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 51:
/* line 391 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 52:
/* line 398 "./ragel/tsip_parser_header.jrl" */

	    var headers = tsip_header_Path.prototype.Parse(s_str);
		if(headers){
			for(var i = 0; i < headers.length; ++i){
				o_msg.add_header(headers[i]);
			}
		}
			break;
case 53:
/* line 409 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 54:
/* line 416 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Privacy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 55:
/* line 423 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_WWW_Authenticate.prototype.Parse(s_str);
		o_msg.add_headers(header);
		p = (pe - 1); // hack: Ragel "when" clause not supported in javascript
			break;
case 56:
/* line 431 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Authorization.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 57:
/* line 438 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 58:
/* line 445 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_RAck.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 59:
/* line 452 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 60:
/* line 459 "./ragel/tsip_parser_header.jrl" */

	    var headers = tsip_header_Record_Route.prototype.Parse(s_str);
		if(headers){
			for(var i = 0; i < headers.length; ++i){
				o_msg.add_header(headers[i]);
			}
		}
			break;
case 61:
/* line 470 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Refer_Sub.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 62:
/* line 477 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Refer_To.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 63:
/* line 484 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Referred_By.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 64:
/* line 491 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 65:
/* line 498 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 66:
/* line 505 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 67:
/* line 512 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 68:
/* line 519 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Require.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 69:
/* line 526 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 70:
/* line 533 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 71:
/* line 540 "./ragel/tsip_parser_header.jrl" */

	    var headers = tsip_header_Route.prototype.Parse(s_str);
		if(headers){
			for(var i = 0; i < headers.length; ++i){
				o_msg.add_header(headers[i]);
			}
		}
			break;
case 72:
/* line 551 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_RSeq.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 73:
/* line 558 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 74:
/* line 565 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 75:
/* line 572 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 76:
/* line 579 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Server.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 77:
/* line 586 "./ragel/tsip_parser_header.jrl" */

	    var headers = tsip_header_Service_Route.prototype.Parse(s_str);
		if(headers){
			for(var i = 0; i < headers.length; ++i){
				o_msg.add_header(headers[i]);
			}
		}
			break;
case 78:
/* line 597 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Session_Expires.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 79:
/* line 604 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_SIP_ETag.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 80:
/* line 611 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_SIP_If_Match.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 81:
/* line 618 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 82:
/* line 625 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Subscription_State.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 83:
/* line 632 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Supported.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 84:
/* line 639 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 85:
/* line 646 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 86:
/* line 653 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_To.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 87:
/* line 660 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 88:
/* line 667 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_User_Agent.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 89:
/* line 674 "./ragel/tsip_parser_header.jrl" */
	
	    var headers = tsip_header_Via.prototype.Parse(s_str);
		if(headers){
			for(var i = 0; i < headers.length; ++i){
				o_msg.add_header(headers[i]);
			}
		}
			break;
case 90:
/* line 685 "./ragel/tsip_parser_header.jrl" */

	    var header = tsip_header_Warning.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
case 91:
/* line 692 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_WWW_Authenticate.prototype.Parse(s_str);
		o_msg.add_headers(header);
		p = (pe - 1); // hack: Ragel "when" clause not supported in javascript
			break;
case 92:
/* line 700 "./ragel/tsip_parser_header.jrl" */

		var header = tsip_header_Dummy.prototype.Parse(s_str);
		o_msg.add_headers(header);
			break;
/* line 5788 "./src/parsers/tsip_parser_header.js" */
			} /* action switch */
		}
	}
	if (_trigger_goto) {
		continue;
	}
	}
	if (_goto_level <= _again) {
	if (cs == 0) {
		_goto_level = _out;
		continue;
	}
	p += 1;
	if (p != pe) {
		_goto_level = _resume;
		continue;
	}
	}
	if (_goto_level <= _test_eof) {
	}
	if (_goto_level <= _out) {
		break;
	}
	}
	}

/* line 729 "./ragel/tsip_parser_header.jrl" */
	
	if( cs < 
/* line 5818 "./src/parsers/tsip_parser_header.js" */
1395
/* line 730 "./ragel/tsip_parser_header.jrl" */
 ){
	    tsk_utils_log_error("Failed to parse header: " + s_str);
	    return -2;
	}
	return 0;
}