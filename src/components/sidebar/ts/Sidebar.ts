import m, { Vnode } from "mithril";
import { Sidebar as S } from "aurora-kit";
import AbstractComponent from "@/core/ts/abstractcomponent";
import SidebarModel from "@/components/sidebar/ts/sidebarmodel";

export default class Sidebar extends AbstractComponent<SidebarModel> {

    oncreate(): void {
        const sidebar = S.init("sidebar");
        this.eventBus.subscribe("sidebar.toggle", sidebar.toggle, sidebar);
    }

    view(): Vnode {
        return m("aside.sidebar#sidebar", [
            m(".sidebar-header", [
                m("h3", "User List")
            ]),
            m("ul", [
                m("li", [m("strong", this.model.currentName)]),
                this.model.userList.map((val, i) => {
                    return m("li", { key: i }, val);
                })
            ])
        ]);
    }
}
