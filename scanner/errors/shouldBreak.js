function shouldBreak(start, mid, end) {
            var all = [start].concat(mid).concat([end]);
            var previous = all[all.length - 2];
            var next = end;
            // Lookahead termintor for:
            // GB10. (E_Base | EBG) Extend* ?	E_Modifier
            var eModifierIndex = all.lastIndexOf(E_Modifier);
            if (eModifierIndex > 1 &&
                all.slice(1, eModifierIndex).every(function (c) { return c == Extend; }) &&
                [Extend, E_Base, E_Base_GAZ].indexOf(start) == -1) {
                return Break;
            }
            // Lookahead termintor for:
            // GB12. ^ (RI RI)* RI	?	RI
            // GB13. [^RI] (RI RI)* RI	?	RI
            var rIIndex = all.lastIndexOf(Regional_Indicator);
            if (rIIndex > 0 &&
                all.slice(1, rIIndex).every(function (c) { return c == Regional_Indicator; }) &&
                [Prepend, Regional_Indicator].indexOf(previous) == -1) {
                if (all.filter(function (c) { return c == Regional_Indicator; }).length % 2 == 1) {
                    return BreakLastRegional;
                }
                else {
                    return BreakPenultimateRegional;
                }
            }
            // GB3. CR X LF
            if (previous == CR && next == LF) {
                return NotBreak;
            }
            // GB4. (Control|CR|LF) ÷
            else if (previous == Control || previous == CR || previous == LF) {
                if (next == E_Modifier && mid.every(function (c) { return c == Extend; })) {
                    return Break;
                }
                else {
                    return BreakStart;
                }
            }
            // GB5. ÷ (Control|CR|LF)
            else if (next == Control || next == CR || next == LF) {
                return BreakStart;
            }
            // GB6. L X (L|V|LV|LVT)
            else if (previous == L &&
                (next == L || next == V || next == LV || next == LVT)) {
                return NotBreak;
            }
            // GB7. (LV|V) X (V|T)
            else if ((previous == LV || previous == V) &&
                (next == V || next == T)) {
                return NotBreak;
            }
            // GB8. (LVT|T) X (T)
            else if ((previous == LVT || previous == T) &&
                next == T) {
                return NotBreak;
            }
            // GB9. X (Extend|ZWJ)
            else if (next == Extend || next == ZWJ) {
                return NotBreak;
            }
            // GB9a. X SpacingMark
            else if (next == SpacingMark) {
                return NotBreak;
            }
            // GB9b. Prepend X
            else if (previous == Prepend) {
                return NotBreak;
            }
            // GB10. (E_Base | EBG) Extend* ?	E_Modifier
            var previousNonExtendIndex = all.indexOf(Extend) != -1 ? all.lastIndexOf(Extend) - 1 : all.length - 2;
            if ([E_Base, E_Base_GAZ].indexOf(all[previousNonExtendIndex]) != -1 &&
                all.slice(previousNonExtendIndex + 1, -1).every(function (c) { return c == Extend; }) &&
                next == E_Modifier) {
                return NotBreak;
            }
            // GB11. ZWJ ? (Glue_After_Zwj | EBG)
            if (previous == ZWJ && [Glue_After_Zwj, E_Base_GAZ].indexOf(next) != -1) {
                return NotBreak;
            }
            // GB12. ^ (RI RI)* RI ? RI
            // GB13. [^RI] (RI RI)* RI ? RI
            if (mid.indexOf(Regional_Indicator) != -1) {
                return Break;
            }
            if (previous == Regional_Indicator && next == Regional_Indicator) {
                return NotBreak;
            }
            // GB999. Any ? Any
            return BreakStart;
        }