function finishPoint()
{
  completedPoints++;

  if (completedPoints == pointsRequired)
  {
    completedPoints = 0;
    MoveProbes();
  }
}