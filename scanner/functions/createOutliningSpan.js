function createOutliningSpan(textSpan, kind, hintSpan = textSpan, autoCollapse = false, bannerText = "...") {
            return { textSpan, kind, hintSpan, bannerText, autoCollapse };
        }