import m, { Vnode } from "mithril";
import AbstractComponent from "@/core/ts/abstractcomponent";
import TopBar from "@/components/topbar/ts/TopBar";
import Sidebar from "@/components/sidebar/ts/Sidebar";
import Editor from "@/components/editor/ts/Editor";
import EditorModel from "@/components/editor/ts/editormodel";
import Modal from "@/components/modal/ts/Modal";
import ModalModel from "@/components/modal/ts/modalmodel";
import TopBarModel from "@/components/topbar/ts/topbarmodel";
import "@/views/sandbox/less/sandbox.less";
import SidebarModel from "@/components/sidebar/ts/sidebarmodel";

export default class Sandbox extends AbstractComponent {
    view(): Vnode {
        return m("main", [
            m(TopBar, {
                eventBus: this.eventBus,
                model: new TopBarModel(this.eventBus)
            }),

            m(".main-container", [
                m(".chat-container", [
                    m(".chat-history-container", [
                        m("div")
                    ]),

                    m(Editor, {
                        model: new EditorModel(this.eventBus)
                    })
                ]),

                m(Sidebar, {
                    eventBus: this.eventBus,
                    model: new SidebarModel(this.eventBus)
                })
            ]),

            m(Modal, { eventBus: this.eventBus, model: new ModalModel() })
        ]);
    }
}
