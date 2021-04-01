import m, { Vnode } from "mithril";
import AbstractComponent from "@/core/ts/abstractcomponent";
import { icons } from "@/core/ts/iconhandler";
import "@/components/topbar/less/topbar.less";

export default class TopBar extends AbstractComponent {
    view(): Vnode {
        return m("nav.navbar", [
            m("div", [
                m("h3", "Sandbox")
            ]),
            m(".nav-right", [
                m("button", icons.trash),
                m("button", icons.people),
                m("button", icons.brightness)
            ])
        ]);
    }
}
