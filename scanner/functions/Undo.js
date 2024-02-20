function Undo(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu">\n            <i class="w-e-icon-undo"></i>\n        </div>');
    this.type = 'click';

    // 当前是否 active 状态
    this._active = false;
}