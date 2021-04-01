import m, { Vnode } from "mithril";
import AbstractComponent from "@/core/ts/abstractcomponent";
import TopBar from "@/components/topbar/ts/TopBar";
import Sidebar from "@/components/sidebar/ts/Sidebar";
import Editor from "@/components/editor/ts/Editor";
import "@/views/sandbox/less/sandbox.less";

export default class Sandbox extends AbstractComponent {
    view(): Vnode {
        return m("main", [
            m(TopBar),

            m(".main-container", [
                m(".chat-container", [
                    m(".chat-history-container", [
                        m("div")
                    ]),

                    m(Editor)
                ]),

                m(Sidebar)
            ])
        ]);
    }
}
