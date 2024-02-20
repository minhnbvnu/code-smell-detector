function mandreelNextDecompress(mandreel_result_lzma)
{

	if ( mandreelAppStartStateFunc )
	{
		var totalBytesLeft = mandreel_result_lzma.totalSize - mandreel_result_lzma.remainingBytes;

		var percentage;

		if (totalBytesLeft == 0)
			percentage = 0;
		else
			percentage = ((100*totalBytesLeft)/mandreel_result_lzma.totalSize)|0;

		mandreelAppStartStateFunc("uncompressingDataUpdate",percentage);
	}

	var old_result = mandreel_result_lzma;
	mandreel_result_lzma = LZMA.decompress2(mandreel_result_lzma.inStream,mandreel_result_lzma.inStream,mandreel_result_lzma.outStream,mandreel_result_lzma);

	if (mandreel_result_lzma == null)
	{
		//setTimeout(mandreelLoadScript,10,old_result.my_outStream.data);

		//mandreel_fs_saveFile('data.bin', old_result.my_outStream.arrayBuffer);
		//callback(old_result.my_outStream.arrayBuffer);
		//alert('done');
		mandreelLoadPackData(old_result.my_outStream.arrayBuffer,true);
	}
	else
	{
		Mandreel_setTimeout(mandreelNextDecompress,10,mandreel_result_lzma);
	}


}