function parseTilePackets(context, data, offset, dataLength) {
    var position = 0;
    var buffer,
        bufferSize = 0,
        skipNextBit = false;

    function readBits(count) {
      while (bufferSize < count) {
        var b = data[offset + position];
        position++;

        if (skipNextBit) {
          buffer = buffer << 7 | b;
          bufferSize += 7;
          skipNextBit = false;
        } else {
          buffer = buffer << 8 | b;
          bufferSize += 8;
        }

        if (b === 0xff) {
          skipNextBit = true;
        }
      }

      bufferSize -= count;
      return buffer >>> bufferSize & (1 << count) - 1;
    }

    function skipMarkerIfEqual(value) {
      if (data[offset + position - 1] === 0xff && data[offset + position] === value) {
        skipBytes(1);
        return true;
      } else if (data[offset + position] === 0xff && data[offset + position + 1] === value) {
        skipBytes(2);
        return true;
      }

      return false;
    }

    function skipBytes(count) {
      position += count;
    }

    function alignToByte() {
      bufferSize = 0;

      if (skipNextBit) {
        position++;
        skipNextBit = false;
      }
    }

    function readCodingpasses() {
      if (readBits(1) === 0) {
        return 1;
      }

      if (readBits(1) === 0) {
        return 2;
      }

      var value = readBits(2);

      if (value < 3) {
        return value + 3;
      }

      value = readBits(5);

      if (value < 31) {
        return value + 6;
      }

      value = readBits(7);
      return value + 37;
    }

    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var sopMarkerUsed = context.COD.sopMarkerUsed;
    var ephMarkerUsed = context.COD.ephMarkerUsed;
    var packetsIterator = tile.packetsIterator;

    while (position < dataLength) {
      alignToByte();

      if (sopMarkerUsed && skipMarkerIfEqual(0x91)) {
        skipBytes(4);
      }

      var packet = packetsIterator.nextPacket();

      if (!readBits(1)) {
        continue;
      }

      var layerNumber = packet.layerNumber;
      var queue = [],
          codeblock;

      for (var i = 0, ii = packet.codeblocks.length; i < ii; i++) {
        codeblock = packet.codeblocks[i];
        var precinct = codeblock.precinct;
        var codeblockColumn = codeblock.cbx - precinct.cbxMin;
        var codeblockRow = codeblock.cby - precinct.cbyMin;
        var codeblockIncluded = false;
        var firstTimeInclusion = false;
        var valueReady;

        if (codeblock.included !== undefined) {
          codeblockIncluded = !!readBits(1);
        } else {
          precinct = codeblock.precinct;
          var inclusionTree, zeroBitPlanesTree;

          if (precinct.inclusionTree !== undefined) {
            inclusionTree = precinct.inclusionTree;
          } else {
            var width = precinct.cbxMax - precinct.cbxMin + 1;
            var height = precinct.cbyMax - precinct.cbyMin + 1;
            inclusionTree = new InclusionTree(width, height, layerNumber);
            zeroBitPlanesTree = new TagTree(width, height);
            precinct.inclusionTree = inclusionTree;
            precinct.zeroBitPlanesTree = zeroBitPlanesTree;
          }

          if (inclusionTree.reset(codeblockColumn, codeblockRow, layerNumber)) {
            while (true) {
              if (readBits(1)) {
                valueReady = !inclusionTree.nextLevel();

                if (valueReady) {
                  codeblock.included = true;
                  codeblockIncluded = firstTimeInclusion = true;
                  break;
                }
              } else {
                inclusionTree.incrementValue(layerNumber);
                break;
              }
            }
          }
        }

        if (!codeblockIncluded) {
          continue;
        }

        if (firstTimeInclusion) {
          zeroBitPlanesTree = precinct.zeroBitPlanesTree;
          zeroBitPlanesTree.reset(codeblockColumn, codeblockRow);

          while (true) {
            if (readBits(1)) {
              valueReady = !zeroBitPlanesTree.nextLevel();

              if (valueReady) {
                break;
              }
            } else {
              zeroBitPlanesTree.incrementValue();
            }
          }

          codeblock.zeroBitPlanes = zeroBitPlanesTree.value;
        }

        var codingpasses = readCodingpasses();

        while (readBits(1)) {
          codeblock.Lblock++;
        }

        var codingpassesLog2 = (0, _core_utils.log2)(codingpasses);
        var bits = (codingpasses < 1 << codingpassesLog2 ? codingpassesLog2 - 1 : codingpassesLog2) + codeblock.Lblock;
        var codedDataLength = readBits(bits);
        queue.push({
          codeblock,
          codingpasses,
          dataLength: codedDataLength
        });
      }

      alignToByte();

      if (ephMarkerUsed) {
        skipMarkerIfEqual(0x92);
      }

      while (queue.length > 0) {
        var packetItem = queue.shift();
        codeblock = packetItem.codeblock;

        if (codeblock.data === undefined) {
          codeblock.data = [];
        }

        codeblock.data.push({
          data,
          start: offset + position,
          end: offset + position + packetItem.dataLength,
          codingpasses: packetItem.codingpasses
        });
        position += packetItem.dataLength;
      }
    }

    return position;
  }