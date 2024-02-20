function writeTGA24(img, fileName)
    {
	    // Make sure there is image data
        assert (
            img.data instanceof Array,
            'no image data'
        );

        // Open the file for writing
        var file = io.fopen(fileName, "w")

	    // Write the appropriate values in the header
	    file.writeUint8(0);             // No custom identification
	    file.writeUint8(0);             // No color map
	    file.writeUint8(2);             // Uncompressed, RGB image
	    file.writeUint16(0);            // No color map
  	    file.writeUint16(0);            // No color map
	    file.writeUint8(0);             // No color map
	    file.writeUint16(0);            // X Origin
	    file.writeUint16(0);            // Y Origin
	    file.writeUint16(img.width);   // Image width
	    file.writeUint16(img.height);  // Image height
	    file.writeUint8(24);            // 24 bit RGB color
	    file.writeUint8(0x20);          // Image descriptor

	    // Loop through every pixel of the image
	    for (var i = 0; i < img.width * img.height; ++i)
	    {
		    // Write this pixel in BGR order (yes, targa stores it as BGR)
            file.writeUint8(img.data[4 * i + 2]);
            file.writeUint8(img.data[4 * i + 1]);
            file.writeUint8(img.data[4 * i + 0]);
	    }

	    // Close the file
        file.close();
    }