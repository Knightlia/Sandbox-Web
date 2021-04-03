import m, { Vnode } from "mithril";
import AbstractComponent from "@/core/ts/abstractcomponent";
import TopBar from "@/components/topbar/ts/TopBar";
import Sidebar from "@/components/sidebar/ts/Sidebar";
import Editor from "@/components/editor/ts/Editor";
import EditorModel from "@/components/editor/ts/editormodel";
import "@/views/sandbox/less/sandbox.less";

export default class Sandbox extends AbstractComponent {

    view(): Vnode {
        return m("main", [
            m(TopBar, { eventBus: this.eventBus }),

            m(".main-container", [
                m(".chat-container", [
                    m(".chat-history-container", [
                        m("div")
                    ]),

                    m(Editor, {
                        model: new EditorModel(this.eventBus)
                    })
                ]),

                m(Sidebar, { eventBus: this.eventBus })
            ])
        ]);
    }
}
