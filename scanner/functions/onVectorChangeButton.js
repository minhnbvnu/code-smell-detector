function onVectorChangeButton()
{
  activeVectorIsB = !activeVectorIsB;
  vectorButton.text("Mouse Moves " + (activeVectorIsB ? "B" : "A"));
}