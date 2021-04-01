import AbstractModel from "@/core/ts/abstractmodel";

export default class EditorModel extends AbstractModel {

    editorInputValue = "";
    placeholderVisible = true;

    updateEditorInputValue({ innerHTML, innerText }: HTMLDivElement): void {
        this.editorInputValue = innerHTML;
        this.placeholderVisible = innerText === "" || innerText === "\n";
    }
}
