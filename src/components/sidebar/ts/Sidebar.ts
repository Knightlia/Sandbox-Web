import m, { Vnode } from "mithril";
import AbstractComponent from "@/core/ts/abstractcomponent";
import { Sidebar as S } from "aurora-kit";

export default class Sidebar extends AbstractComponent {

    oncreate(): void {
        const sidebar = S.init("sidebar");
        this.eventBus.subscribe("sidebar.toggle", sidebar.toggle, sidebar);
    }

    view(): Vnode {
        return m("aside.sidebar#sidebar", [
            m(".sidebar-header", [
                m("h3", "User List")
            ]),
            m("ul")
        ]);
    }
}
