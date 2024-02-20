function iteratorHelper(node, classNames, result)
    {
        for (var child = node.firstChild; child; child = child.nextSibling)
        {
            var args1 = Arr.cloneArray(classNames);
            args1.unshift(child);
            if (Css.hasClass.apply(null, args1))
                result.push(child);

            iteratorHelper(child, classNames, result);
        }
    }