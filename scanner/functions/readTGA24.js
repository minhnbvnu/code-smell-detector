function readTGA24(fileName)
    {
        // Open the file for reading
        var file = io.fopen(fileName, "r")

	    // Write the appropriate values in the header
	    var idFieldLength = file.readUint8();
	    var colorMapType = file.readUint8();
	    var imageType = file.readUint8();

        // Read the color map specification
	    var cmEIdx = file.readUint16();
  	    var cmNEntries = file.readUint16();
	    var cmESize = file.readUint8();

        // Read the image specification
	    var xOrigin = file.readUint16();
	    var yOrigin = file.readUint16();
	    var width = file.readUint16();
	    var height = file.readUint16();
	    var colorDepth = file.readUint8();
	    var imgDesc = file.readUint8();

        if (colorMapType != 0)
            throw Error('color maps not supported');

        if (imageType !== 2)
            throw Error('invalid image type');

        if (xOrigin != 0 || yOrigin != 0)
            throw Error('invalid x/y origin');

        if (colorDepth != 24)
            throw Error('unsupported color depth');

        if (imgDesc != 0x20)
            throw Error('invalid image descriptor');

        // Allocate an image object
        var img = new Image(width, height);

	    // Loop through every pixel of the image
	    for (var i = 0; i < img.width * img.height; ++i)
	    {
		    // Read this pixel in BGR order
            img.data[4 * i + 2] = file.readUint8();
            img.data[4 * i + 1] = file.readUint8();
            img.data[4 * i + 0] = file.readUint8();
	    }

	    // Close the file
        file.close();

        return img;
    }