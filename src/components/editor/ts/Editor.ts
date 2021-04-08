import m, { Vnode } from "mithril";
import AbstractComponent from "@/core/ts/abstractcomponent";
import EditorModel from "@/components/editor/ts/editormodel";
import "@/components/editor/less/editor.less";

export default class Editor extends AbstractComponent<EditorModel> {
    view(): Vnode {
        return m(".editor-view-container", [
            m(".editable-container", [
                this.model.placeholderVisible ? m(".placeholder", "Enter message...") : null,

                m("[contenteditable].input.editor", {
                    oninput: (e: InputEvent) => this.model.updateEditorInputValue(e.target as HTMLDivElement),
                    onkeydown: (e: KeyboardEvent) => this._onKeyDown(e)
                }, m.trust(this.model.editorInputValue))
            ]),

            m(".editor-menu-container", [
                m(".editor-left-menu"),
                m(".editor-right-menu", [
                    m("button.primary", { onclick: () => this.model.sendMessage() }, "Send")
                ])
            ])
        ]);
    }

    private _onKeyDown(e: KeyboardEvent): void {
        if (!e.shiftKey) {
            if (e.key === "Enter") {
                e.preventDefault();
                this.model.sendMessage();
            }
        }
    }
}
