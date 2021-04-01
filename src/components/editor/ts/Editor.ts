import m, { Vnode } from "mithril";
import AbstractComponent from "@/core/ts/abstractcomponent";
import "@/components/editor/less/editor.less";

export default class Editor extends AbstractComponent {
    view(): Vnode {
        return m(".editor-view-container", [
            m(".editable-container", [
                m(".placeholder", "Enter message..."),
                m("[contenteditable].input.editor")
            ]),

            m(".editor-menu-container", [
                m(".editor-left-menu"),
                m(".editor-right-menu", [
                    m("button.primary", "Send")
                ])
            ])
        ]);
    }
}
