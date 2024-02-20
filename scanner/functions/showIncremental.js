function showIncremental(incr)
{
		elem = incrElem.eq(incrCurr);
		if (incrCode && elem.hasClass('command')) {
			incrElem.eq(incrCurr).removeClass('hidden').jTypeWriter({duration:1.0});
		} else {
			incrElem.eq(incrCurr).removeClass('hidden');
		}
}