function readPBM(fileName)
    {
        // Open the file for reading
        var file = io.fopen(fileName, "r")

        // Read the PBM file header (ASCII data)
        var magicLine = file.readLine();
        file.readLine();
        var formatLine = file.readLine();

        if (magicLine.trim() !== 'P4')
            throw Error('unsupported PBM image format');

        var size = formatLine.trim().split(' ');
        var width = parseInt(size[0]);
        var height = parseInt(size[1]);

        if (!(width > 0) || !(height > 0))
            throw Error('invalid image size');

        if (file.EOF())
            throw Error('EOF before data');

        var numBits = width * height;
        var numBytes = (numBits / 8) + ((numBits % 8)? 1:0);

        // Allocate an image object
        var img = new Image(width, height);

        var pixIdx = 0;

        // For each byte in of image data in the file
        for (var i = 0; i < numBytes; ++i)
        {
            var byte = file.readUint8();

            for (var j = 7; j >= 0; --j)
            {
                if (pixIdx >= numBits)
                    break;

                var bit = byte & (1 << j);

                // Note: 1 bits represent black values
                img.data[4 * pixIdx + 0] = bit? 0:255;
                img.data[4 * pixIdx + 1] = bit? 0:255;
                img.data[4 * pixIdx + 2] = bit? 0:255;
                img.data[4 * pixIdx + 3] = 255;

                pixIdx++;
            }
        }

	    // Close the file
        file.close();

        return img;
    }