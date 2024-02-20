function mandreelNextDecompressJS(mandreel_result_lzma)
{

	if ( mandreelAppStartStateFunc )
	{
		var totalBytesLeft = mandreel_result_lzma.totalSize - mandreel_result_lzma.remainingBytes;

		var percentage;

		if (totalBytesLeft == 0)
			percentage = 0;
		else
			percentage = ((100*totalBytesLeft)/mandreel_result_lzma.totalSize)|0;

		mandreelAppStartStateFunc("uncompressingScriptUpdate",percentage);
	}

	var old_result = mandreel_result_lzma;
	mandreel_result_lzma = LZMA.decompress2(mandreel_result_lzma.inStream,mandreel_result_lzma.inStream,mandreel_result_lzma.outStream,mandreel_result_lzma);

	if (mandreel_result_lzma == null)
	{
		mandreelDecompressJSReady(old_result.my_outStream.data,true);
	}
	else
	{
		Mandreel_setTimeout(mandreelNextDecompressJS,10,mandreel_result_lzma);
	}


}