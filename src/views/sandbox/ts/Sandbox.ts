import m, { Vnode } from "mithril";
import AbstractComponent from "@/core/ts/abstractcomponent";
import TopBar from "@/components/topbar/ts/TopBar";
import Sidebar from "@/components/sidebar/ts/Sidebar";
import Editor from "@/components/editor/ts/Editor";
import EditorModel from "@/components/editor/ts/editormodel";
import Modal from "@/components/modal/ts/Modal";
import ModalModel from "@/components/modal/ts/modalmodel";
import TopBarModel from "@/components/topbar/ts/topbarmodel";
import SidebarModel from "@/components/sidebar/ts/sidebarmodel";
import SandboxModel from "@/views/sandbox/ts/sandboxmodel";
import Bubble from "@/components/message/ts/Bubble";
import "@/views/sandbox/less/sandbox.less";

export default class Sandbox extends AbstractComponent<SandboxModel> {
    view(): Vnode {
        return m("main", [
            m(TopBar, {
                eventBus: this.eventBus,
                model: new TopBarModel(this.eventBus)
            }),

            m(".main-container", [
                m(".chat-container", [
                    m(".chat-history-container", [
                        m("div", [
                            this.model.messageList.map((message, i) => {
                                return m(Bubble, {
                                    key: i,
                                    sender: message.sender,
                                    message: message.message,
                                    time: message.time,
                                    avatarColour: message.avatarColour,
                                    right: message.right
                                });
                            })
                        ])
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
