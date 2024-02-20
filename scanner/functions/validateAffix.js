function validateAffix(position, config, name, node, originalName) {
            const affixes = config[position];
            if (!affixes || affixes.length === 0) {
                return name;
            }
            for (const affix of affixes) {
                const hasAffix = position === 'prefix' ? name.startsWith(affix) : name.endsWith(affix);
                const trimAffix = position === 'prefix'
                    ? () => name.slice(affix.length)
                    : () => name.slice(0, -affix.length);
                if (hasAffix) {
                    // matches, so trim it and return
                    return trimAffix();
                }
            }
            context.report({
                node,
                messageId: 'missingAffix',
                data: formatReportData({
                    originalName,
                    position,
                    affixes,
                }),
            });
            return null;
        }