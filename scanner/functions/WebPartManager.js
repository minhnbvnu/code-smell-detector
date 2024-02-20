function WebPartManager() {
    this.overlayContainerElement = null;
    this.zones = new Array();
    this.dragState = null;
    this.menu = null;
    this.draggedWebPart = null;
    this.AddZone = WebPartManager_AddZone;
    this.IsDragDropEnabled = WebPartManager_IsDragDropEnabled;
    this.DragDrop = WebPartManager_DragDrop;
    this.InitiateWebPartDragDrop = WebPartManager_InitiateWebPartDragDrop;
    this.CompleteWebPartDragDrop = WebPartManager_CompleteWebPartDragDrop;
    this.ContinueWebPartDragDrop = WebPartManager_ContinueWebPartDragDrop;
    this.ProcessWebPartDragEnter = WebPartManager_ProcessWebPartDragEnter;
    this.ProcessWebPartDragOver = WebPartManager_ProcessWebPartDragOver;
    this.ProcessWebPartDrop = WebPartManager_ProcessWebPartDrop;
    this.ShowHelp = WebPartManager_ShowHelp;
    this.ExportWebPart = WebPartManager_ExportWebPart;
    this.Execute = WebPartManager_Execute;
    this.SubmitPage = WebPartManager_SubmitPage;
    this.UpdatePositions = WebPartManager_UpdatePositions;
    window.attachEvent("onunload", WebPartManager_Dispose);
}