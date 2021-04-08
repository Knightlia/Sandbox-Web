import AbstractModel from "@/core/ts/abstractmodel";
import MessageAPI from "@/core/ts/api/messageapi";
import config from "config";

export default class EditorModel extends AbstractModel {

    editorInputValue = "";
    placeholderVisible = true;

    updateEditorInputValue({ innerHTML, innerText }: HTMLDivElement): void {
        this.editorInputValue = innerHTML;
        this.placeholderVisible = innerText === "" || innerText === "\n";
    }

    sendMessage(): void {
        MessageAPI.sendMessage(config.nickname!, this.editorInputValue);
        this.editorInputValue = "";
        this.placeholderVisible = true;
    }
}
