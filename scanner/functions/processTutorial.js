function processTutorial(string, tagInfo) {
        const leading = extractLeadingText(string, tagInfo.completeTag);

        string = leading.string;

        return string.replace(tagInfo.completeTag, toTutorial(tagInfo.text, leading.leadingText).replace(
            'tutorial-', '',
        ));
    }