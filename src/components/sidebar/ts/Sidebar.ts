import m, { Vnode } from "mithril";
import AbstractComponent from "@/core/ts/abstractcomponent";

export default class Sidebar extends AbstractComponent {
    view(): Vnode {
        return m("aside.sidebar", [
            m(".sidebar-header", [
                m("h3", "User List")
            ]),
            m("ul")
        ]);
    }
}
