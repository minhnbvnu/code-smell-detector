function calculateTotalSpace(sizes, axis) {
        const totalSizes = sumValues(sizes, axis.size);
        const totalSpacing = (sizes.length - 1) * options.spacing[axis.axis];

        return totalSizes + totalSpacing;
    }