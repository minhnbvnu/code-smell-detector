function parse_vartable(varstring) {
							var splitted = varstring.split(";");
							var vartable = {};
							for (var i = 0; i < splitted.length; i++) {
								splitted[i] = splitted[i].replace(/^\s*|\s*$/, "");
								if (splitted[i].length === 0)
									continue;
								var smatch = splitted[i].match(/^var (_0x[0-9a-f]+)=(.*)/);
								var varname = smatch[1];
								var varval = smatch[2];
								var vmatch = varval.match(/^["'](.*)["']/);
								if (vmatch) {
									vartable[varname] = vmatch[1];
								} else if ((vmatch = varval.match(/^_0x[0-9a-f]+\+/))) {
									var vsplitted = varval.split("+");
									varval = "";
									for (var j = 0; j < vsplitted.length; j++) {
										varval += vartable[vsplitted[j]];
									}
									vartable[varname] = varval;
								} else if ((vmatch = varval.match(/^atob/))) {
									var vsplitted = varval.replace(/^atob\((.*)\)$/, "$1").split("+");
									varval = "";
									for (var j = 0; j < vsplitted.length; j++) {
										varval += vartable[vsplitted[j]];
									}
									vartable[varname] = base64_decode(varval);
									final = vartable[varname];
								} else {
									console_log("Unknown varval type:" + splitted[i]);
								}
							}
							return vartable;
						}