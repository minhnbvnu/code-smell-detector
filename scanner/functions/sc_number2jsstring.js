function sc_number2jsstring(x, radix) {
    if (radix)
	return x.toString(radix);
    else
	return x.toString();
}