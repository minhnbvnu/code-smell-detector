function TransferFilesToDst()
{
	$("#result" ).text("");

	if (transferEnabled == true)
	{
		if (selectedItemInfoList != null && selectedItemInfoList.length>0)
		{
			$("#startTransfer").attr("disabled", "disabled");
			transferEnabled = false;

			if ($("#transferType").val() == "local")
			{
				TransferToLocal();
			}
			else if ($("#transferType").val() == "ftp")
			{
				TransferToFTP();
			}
			else
			{
				// do nothing
			}
		}
		else
		{
			$("#content").toggle( "highlight" );
			$("#content").toggle( "highlight" );		
		}
	}

}