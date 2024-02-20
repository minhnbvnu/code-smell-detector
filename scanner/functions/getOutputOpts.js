function getOutputOpts(outputOpts)
	{
		var retVal = {"outputUpper" : false, "b64Pad" : "="};

		try
		{
			if (outputOpts.hasOwnProperty("outputUpper"))
			{
				retVal["outputUpper"] = outputOpts["outputUpper"];
			}

			if (outputOpts.hasOwnProperty("b64Pad"))
			{
				retVal["b64Pad"] = outputOpts["b64Pad"];
			}
		}
		catch(ignore)
		{}

		if ("boolean" !== typeof(retVal["outputUpper"]))
		{
			throw "Invalid outputUpper formatting option";
		}

		if ("string" !== typeof(retVal["b64Pad"]))
		{
			throw "Invalid b64Pad formatting option";
		}

		return retVal;
	}