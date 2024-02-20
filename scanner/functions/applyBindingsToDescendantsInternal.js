function applyBindingsToDescendantsInternal (viewModel, elementOrVirtualElement, bindingContextsMayDifferFromDomParentElement) {
        var currentChild, nextInQueue = ko.virtualElements.firstChild(elementOrVirtualElement);
        while (currentChild = nextInQueue) {
            // Keep a record of the next child *before* applying bindings, in case the binding removes the current child from its position
            nextInQueue = ko.virtualElements.nextSibling(currentChild);
            applyBindingsToNodeAndDescendantsInternal(viewModel, currentChild, bindingContextsMayDifferFromDomParentElement);
        }
    }