function insertSpaces(line, pos, count)
        {
            return line.substr(0, pos)
                + spaces.substr(0, count)
                + line.substr(pos + 1, line.length) // pos + 1 will get rid of the tab
                ;
        }