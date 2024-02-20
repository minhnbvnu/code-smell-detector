function compareStringsCaseSensitiveUI(a, b) {
            const comparer = uiComparerCaseSensitive || (uiComparerCaseSensitive = createUIStringComparer(uiLocale));
            return comparer(a, b);
        }