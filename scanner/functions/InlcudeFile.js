function InlcudeFile(txt) {
					this.script = null;
					this.codes = {};
					this.funs = {};
					this.curUseID = -1;
					this.funnames = "";
					this.script = txt;
					var begin = 0, ofs = 0, end = 0;
					while (true) {
						begin = txt.indexOf("#begin", begin);
						if (begin < 0) break;
						end = begin + 5;
						while (true) {
							end = txt.indexOf("#end", end);
							if (end < 0) break;
							if (txt.charAt(end + 4) === 'i')
								end += 5;
							else break;
						}
						if (end < 0) {
							throw "add include err,no #end:" + txt;
							return;
						}
						ofs = txt.indexOf('\n', begin);
						var words = ShaderCompile.splitToWords(txt.substr(begin, ofs - begin), null);
						if (words[1] == 'code') {
							this.codes[words[2]] = txt.substr(ofs + 1, end - ofs - 1);
						} else if (words[1] == 'function') {
							ofs = txt.indexOf("function", begin);
							ofs += "function".length;
							this.funs[words[3]] = txt.substr(ofs + 1, end - ofs - 1);
							this.funnames += words[3] + ";";
						}
						begin = end + 1;
					}
				}