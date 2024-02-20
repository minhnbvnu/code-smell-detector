function saveRange(e) {
            // 随时保存选区
            editor.selection.saveRange();
            // 更新按钮 ative 状态
            editor.menus.changeActive();
        }