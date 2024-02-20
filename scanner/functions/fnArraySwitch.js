function fnArraySwitch( aArray, iFrom, iTo )
{
	var mStore = aArray.splice( iFrom, 1 )[0];
	aArray.splice( iTo, 0, mStore );
}