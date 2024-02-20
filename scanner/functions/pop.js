function pop() {
        if (!stack.size())
            return undefined;
        const top = stack.pop();
        mask.remove(state_masks_1.stateMasks[top.state]);
        return top;
    }