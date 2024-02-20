function addSection(section, mapUrl, mappings, sources, sourcesContent, names, stopLine, stopColumn) {
            const map = AnyMap(section.map, mapUrl);
            const { line: lineOffset, column: columnOffset } = section.offset;
            const sourcesOffset = sources.length;
            const namesOffset = names.length;
            const decoded = decodedMappings(map);
            const { resolvedSources } = map;
            append(sources, resolvedSources);
            append(sourcesContent, map.sourcesContent || fillSourcesContent(resolvedSources.length));
            append(names, map.names);
            // If this section jumps forwards several lines, we need to add lines to the output mappings catch up.
            for (let i = mappings.length; i <= lineOffset; i++)
                mappings.push([]);
            // We can only add so many lines before we step into the range that the next section's map
            // controls. When we get to the last line, then we'll start checking the segments to see if
            // they've crossed into the column range.
            const stopI = stopLine - lineOffset;
            const len = Math.min(decoded.length, stopI + 1);
            for (let i = 0; i < len; i++) {
                const line = decoded[i];
                // On the 0th loop, the line will already exist due to a previous section, or the line catch up
                // loop above.
                const out = i === 0 ? mappings[lineOffset] : (mappings[lineOffset + i] = []);
                // On the 0th loop, the section's column offset shifts us forward. On all other lines (since the
                // map can be multiple lines), it doesn't.
                const cOffset = i === 0 ? columnOffset : 0;
                for (let j = 0; j < line.length; j++) {
                    const seg = line[j];
                    const column = cOffset + seg[COLUMN$1];
                    // If this segment steps into the column range that the next section's map controls, we need
                    // to stop early.
                    if (i === stopI && column >= stopColumn)
                        break;
                    if (seg.length === 1) {
                        out.push([column]);
                        continue;
                    }
                    const sourcesIndex = sourcesOffset + seg[SOURCES_INDEX$1];
                    const sourceLine = seg[SOURCE_LINE$1];
                    const sourceColumn = seg[SOURCE_COLUMN$1];
                    if (seg.length === 4) {
                        out.push([column, sourcesIndex, sourceLine, sourceColumn]);
                        continue;
                    }
                    out.push([column, sourcesIndex, sourceLine, sourceColumn, namesOffset + seg[NAMES_INDEX$1]]);
                }
            }
        }