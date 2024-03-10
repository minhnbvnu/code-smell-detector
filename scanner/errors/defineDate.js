            return pattern.replace(/([a-z])\1*/ig,function (match) {
                // Build a simple regexp.  Avoid captures, which would ruin the tokens list
                var s,
                    c = match.charAt(0),
                    l = match.length,
                    p2 = '0?',
                    p3 = '0{0,2}';
                if (c === 'y') {
                    s = '\\d{2,4}';
                } else if (c === "M") {
                    s = (l > 2) ? '\\S+?' : '1[0-2]|' + p2 + '[1-9]';
                } else if (c === "D") {
                    s = '[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|' + p3 + '[1-9][0-9]|' + p2 + '[1-9]';
                } else if (c === "d") {
                    s = '3[01]|[12]\\d|' + p2 + '[1-9]';
                } else if (c === "w") {
                    s = '[1-4][0-9]|5[0-3]|' + p2 + '[1-9]';
                } else if (c === "E") {
                    s = '\\S+';
                } else if (c === "h") {
                    s = '1[0-2]|' + p2 + '[1-9]';
                } else if (c === "K") {
                    s = '1[01]|' + p2 + '\\d';
                } else if (c === "H") {
                    s = '1\\d|2[0-3]|' + p2 + '\\d';
                } else if (c === "k") {
                    s = '1\\d|2[0-4]|' + p2 + '[1-9]';
                } else if (c === "m" || c === "s") {
                    s = '[0-5]\\d';
                } else if (c === "S") {
                    s = '\\d{' + l + '}';
                } else if (c === "a") {
                    var am = 'AM', pm = 'PM';
                    s = am + '|' + pm;
                    if (am !== am.toLowerCase()) {
                        s += '|' + am.toLowerCase();
                    }
                    if (pm !== pm.toLowerCase()) {
                        s += '|' + pm.toLowerCase();
                    }
                    s = s.replace(/\./g, "\\.");
                } else if (c === 'v' || c === 'z' || c === 'Z' || c === 'G' || c === 'q' || c === 'Q') {
                    s = ".*";
                } else {
                    s = c === " " ? "\\s*" : c + "*";
                }
                if (tokens) {
                    tokens.push(match);
                }

                return "(" + s + ")"; // add capture
            }).replace(/[\xa0 ]/g, "[\\s\\xa0]"); // normalize whitespace.  Need explicit handling of \xa0 for IE.
                return format.replace(/([A-Za-z])\1*/g, function (match) {
                    var s, pad,
                        c = match.charAt(0),
                        l = match.length;
                    if (c === 'd') {
                        s = "" + d;
                        pad = true;
                    } else if (c === "H" && !s) {
                        s = "" + hour;
                        pad = true;
                    } else if (c === 'm' && !s) {
                        s = "" + minute;
                        pad = true;
                    } else if (c === 's') {
                        if (!s) {
                            s = "" + second;
                        }
                        pad = true;
                    } else if (c === "G") {
                        s = ((l < 4) ? eraAbbr : eraNames)[fullYear < 0 ? 0 : 1];
                    } else if (c === "y") {
                        s = fullYear;
                        if (l > 1) {
                            if (l === 2) {
                                s = _truncate("" + s, 2, true);
                            } else {
                                pad = true;
                            }
                        }
                    } else if (c.toUpperCase() === "Q") {
                        s = ceil((month + 1) / 3);
                        pad = true;
                    } else if (c === "M") {
                        if (l < 3) {
                            s = month + 1;
                            pad = true;
                        } else {
                            s = (l === 3 ? monthAbbr : monthNames)[month];
                        }
                    } else if (c === "w") {
                        s = getWeekOfYear(date, 0, utc);
                        pad = true;
                    } else if (c === "D") {
                        s = getDayOfYear(date, utc);
                        pad = true;
                    } else if (c === "E") {
                        if (l < 3) {
                            s = day + 1;
                            pad = true;
                        } else {
                            s = (l === -3 ? dayAbbr : dayNames)[day];
                        }
                    } else if (c === 'a') {
                        s = (hour < 12) ? 'AM' : 'PM';
                    } else if (c === "h") {
                        s = (hour % 12) || 12;
                        pad = true;
                    } else if (c === "K") {
                        s = (hour % 12);
                        pad = true;
                    } else if (c === "k") {
                        s = hour || 24;
                        pad = true;
                    } else if (c === "S") {
                        s = round(millisecond * pow(10, l - 3));
                        pad = true;
                    } else if (c === "z" || c === "v" || c === "Z") {
                        s = getTimezoneName(date);
                        if ((c === "z" || c === "v") && !s) {
                            l = 4;
                        }
                        if (!s || c === "Z") {
                            var offset = date.getTimezoneOffset();
                            var tz = [
                                (offset >= 0 ? "-" : "+"),
                                _pad(floor(abs(offset) / 60), 2, "0"),
                                _pad(abs(offset) % 60, 2, "0")
                            ];
                            if (l === 4) {
                                tz.splice(0, 0, "GMT");
                                tz.splice(3, 0, ":");
                            }
                            s = tz.join("");
                        }
                    } else {
                        s = match;
                    }
                    if (pad) {
                        s = _pad(s, l, '0');
                    }
                    return s;
                });
                    valid = every(match, function (v, i) {
                        if (i) {
                            var token = tokens[i - 1];
                            var l = token.length, type = token.charAt(0);
                            if (type === 'y') {
                                if (v < 100) {
                                    v = parseInt(v, 10);
                                    //choose century to apply, according to a sliding window
                                    //of 80 years before and 20 years after present year
                                    var year = '' + new Date().getFullYear(),
                                        century = year.substring(0, 2) * 100,
                                        cutoff = min(year.substring(2, 4) + 20, 99);
                                    result[0] = (v < cutoff) ? century + v : century - 100 + v;
                                } else {
                                    result[0] = v;
                                }
                            } else if (type === "M") {
                                if (l > 2) {
                                    var months = monthNames, j, k;
                                    if (l === 3) {
                                        months = monthAbbr;
                                    }
                                    //Tolerate abbreviating period in month part
                                    //Case-insensitive comparison
                                    v = v.replace(".", "").toLowerCase();
                                    var contains = false;
                                    for (j = 0, k = months.length; j < k && !contains; j++) {
                                        var s = months[j].replace(".", "").toLocaleLowerCase();
                                        if (s === v) {
                                            v = j;
                                            contains = true;
                                        }
                                    }
                                    if (!contains) {
                                        return false;
                                    }
                                } else {
                                    v--;
                                }
                                result[1] = v;
                            } else if (type === "E" || type === "e") {
                                var days = dayNames;
                                if (l === 3) {
                                    days = dayAbbr;
                                }
                                //Case-insensitive comparison
                                v = v.toLowerCase();
                                days = array.map(days, function (d) {
                                    return d.toLowerCase();
                                });
                                var d = array.indexOf(days, v);
                                if (d === -1) {
                                    v = parseInt(v, 10);
                                    if (isNaN(v) || v > days.length) {
                                        return false;
                                    }
                                } else {
                                    v = d;
                                }
                            } else if (type === 'D' || type === "d") {
                                if (type === "D") {
                                    result[1] = 0;
                                }
                                result[2] = v;
                            } else if (type === "a") {
                                var am = "am";
                                var pm = "pm";
                                var period = /\./g;
                                v = v.replace(period, '').toLowerCase();
                                // we might not have seen the hours field yet, so store the state and apply hour change later
                                amPm = (v === pm) ? 'p' : (v === am) ? 'a' : '';
                            } else if (type === "k" || type === "h" || type === "H" || type === "K") {
                                if (type === "k" && (+v) === 24) {
                                    v = 0;
                                }
                                result[3] = v;
                            } else if (type === "m") {
                                result[4] = v;
                            } else if (type === "s") {
                                result[5] = v;
                            } else if (type === "S") {
                                result[6] = v;
                            }
                        }
                        return true;
                    });