function prepareFrame(field)
{
    if (framesTillAddingPoints == 0) {
        addPoints(field);
        framesTillAddingPoints = framesBetweenAddingPoints;
        framesBetweenAddingPoints++;
    } else {
        framesTillAddingPoints--;
    }
}