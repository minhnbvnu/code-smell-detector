function getStandardTable(number) {
    let table = standardTablesCache[number];

    if (table) {
      return table;
    }

    let lines;

    switch (number) {
      case 1:
        lines = [[0, 1, 4, 0x0], [16, 2, 8, 0x2], [272, 3, 16, 0x6], [65808, 3, 32, 0x7]];
        break;

      case 2:
        lines = [[0, 1, 0, 0x0], [1, 2, 0, 0x2], [2, 3, 0, 0x6], [3, 4, 3, 0xe], [11, 5, 6, 0x1e], [75, 6, 32, 0x3e], [6, 0x3f]];
        break;

      case 3:
        lines = [[-256, 8, 8, 0xfe], [0, 1, 0, 0x0], [1, 2, 0, 0x2], [2, 3, 0, 0x6], [3, 4, 3, 0xe], [11, 5, 6, 0x1e], [-257, 8, 32, 0xff, "lower"], [75, 7, 32, 0x7e], [6, 0x3e]];
        break;

      case 4:
        lines = [[1, 1, 0, 0x0], [2, 2, 0, 0x2], [3, 3, 0, 0x6], [4, 4, 3, 0xe], [12, 5, 6, 0x1e], [76, 5, 32, 0x1f]];
        break;

      case 5:
        lines = [[-255, 7, 8, 0x7e], [1, 1, 0, 0x0], [2, 2, 0, 0x2], [3, 3, 0, 0x6], [4, 4, 3, 0xe], [12, 5, 6, 0x1e], [-256, 7, 32, 0x7f, "lower"], [76, 6, 32, 0x3e]];
        break;

      case 6:
        lines = [[-2048, 5, 10, 0x1c], [-1024, 4, 9, 0x8], [-512, 4, 8, 0x9], [-256, 4, 7, 0xa], [-128, 5, 6, 0x1d], [-64, 5, 5, 0x1e], [-32, 4, 5, 0xb], [0, 2, 7, 0x0], [128, 3, 7, 0x2], [256, 3, 8, 0x3], [512, 4, 9, 0xc], [1024, 4, 10, 0xd], [-2049, 6, 32, 0x3e, "lower"], [2048, 6, 32, 0x3f]];
        break;

      case 7:
        lines = [[-1024, 4, 9, 0x8], [-512, 3, 8, 0x0], [-256, 4, 7, 0x9], [-128, 5, 6, 0x1a], [-64, 5, 5, 0x1b], [-32, 4, 5, 0xa], [0, 4, 5, 0xb], [32, 5, 5, 0x1c], [64, 5, 6, 0x1d], [128, 4, 7, 0xc], [256, 3, 8, 0x1], [512, 3, 9, 0x2], [1024, 3, 10, 0x3], [-1025, 5, 32, 0x1e, "lower"], [2048, 5, 32, 0x1f]];
        break;

      case 8:
        lines = [[-15, 8, 3, 0xfc], [-7, 9, 1, 0x1fc], [-5, 8, 1, 0xfd], [-3, 9, 0, 0x1fd], [-2, 7, 0, 0x7c], [-1, 4, 0, 0xa], [0, 2, 1, 0x0], [2, 5, 0, 0x1a], [3, 6, 0, 0x3a], [4, 3, 4, 0x4], [20, 6, 1, 0x3b], [22, 4, 4, 0xb], [38, 4, 5, 0xc], [70, 5, 6, 0x1b], [134, 5, 7, 0x1c], [262, 6, 7, 0x3c], [390, 7, 8, 0x7d], [646, 6, 10, 0x3d], [-16, 9, 32, 0x1fe, "lower"], [1670, 9, 32, 0x1ff], [2, 0x1]];
        break;

      case 9:
        lines = [[-31, 8, 4, 0xfc], [-15, 9, 2, 0x1fc], [-11, 8, 2, 0xfd], [-7, 9, 1, 0x1fd], [-5, 7, 1, 0x7c], [-3, 4, 1, 0xa], [-1, 3, 1, 0x2], [1, 3, 1, 0x3], [3, 5, 1, 0x1a], [5, 6, 1, 0x3a], [7, 3, 5, 0x4], [39, 6, 2, 0x3b], [43, 4, 5, 0xb], [75, 4, 6, 0xc], [139, 5, 7, 0x1b], [267, 5, 8, 0x1c], [523, 6, 8, 0x3c], [779, 7, 9, 0x7d], [1291, 6, 11, 0x3d], [-32, 9, 32, 0x1fe, "lower"], [3339, 9, 32, 0x1ff], [2, 0x0]];
        break;

      case 10:
        lines = [[-21, 7, 4, 0x7a], [-5, 8, 0, 0xfc], [-4, 7, 0, 0x7b], [-3, 5, 0, 0x18], [-2, 2, 2, 0x0], [2, 5, 0, 0x19], [3, 6, 0, 0x36], [4, 7, 0, 0x7c], [5, 8, 0, 0xfd], [6, 2, 6, 0x1], [70, 5, 5, 0x1a], [102, 6, 5, 0x37], [134, 6, 6, 0x38], [198, 6, 7, 0x39], [326, 6, 8, 0x3a], [582, 6, 9, 0x3b], [1094, 6, 10, 0x3c], [2118, 7, 11, 0x7d], [-22, 8, 32, 0xfe, "lower"], [4166, 8, 32, 0xff], [2, 0x2]];
        break;

      case 11:
        lines = [[1, 1, 0, 0x0], [2, 2, 1, 0x2], [4, 4, 0, 0xc], [5, 4, 1, 0xd], [7, 5, 1, 0x1c], [9, 5, 2, 0x1d], [13, 6, 2, 0x3c], [17, 7, 2, 0x7a], [21, 7, 3, 0x7b], [29, 7, 4, 0x7c], [45, 7, 5, 0x7d], [77, 7, 6, 0x7e], [141, 7, 32, 0x7f]];
        break;

      case 12:
        lines = [[1, 1, 0, 0x0], [2, 2, 0, 0x2], [3, 3, 1, 0x6], [5, 5, 0, 0x1c], [6, 5, 1, 0x1d], [8, 6, 1, 0x3c], [10, 7, 0, 0x7a], [11, 7, 1, 0x7b], [13, 7, 2, 0x7c], [17, 7, 3, 0x7d], [25, 7, 4, 0x7e], [41, 8, 5, 0xfe], [73, 8, 32, 0xff]];
        break;

      case 13:
        lines = [[1, 1, 0, 0x0], [2, 3, 0, 0x4], [3, 4, 0, 0xc], [4, 5, 0, 0x1c], [5, 4, 1, 0xd], [7, 3, 3, 0x5], [15, 6, 1, 0x3a], [17, 6, 2, 0x3b], [21, 6, 3, 0x3c], [29, 6, 4, 0x3d], [45, 6, 5, 0x3e], [77, 7, 6, 0x7e], [141, 7, 32, 0x7f]];
        break;

      case 14:
        lines = [[-2, 3, 0, 0x4], [-1, 3, 0, 0x5], [0, 1, 0, 0x0], [1, 3, 0, 0x6], [2, 3, 0, 0x7]];
        break;

      case 15:
        lines = [[-24, 7, 4, 0x7c], [-8, 6, 2, 0x3c], [-4, 5, 1, 0x1c], [-2, 4, 0, 0xc], [-1, 3, 0, 0x4], [0, 1, 0, 0x0], [1, 3, 0, 0x5], [2, 4, 0, 0xd], [3, 5, 1, 0x1d], [5, 6, 2, 0x3d], [9, 7, 4, 0x7d], [-25, 7, 32, 0x7e, "lower"], [25, 7, 32, 0x7f]];
        break;

      default:
        throw new Jbig2Error(`standard table B.${number} does not exist`);
    }

    for (let i = 0, ii = lines.length; i < ii; i++) {
      lines[i] = new HuffmanLine(lines[i]);
    }

    table = new HuffmanTable(lines, true);
    standardTablesCache[number] = table;
    return table;
  }