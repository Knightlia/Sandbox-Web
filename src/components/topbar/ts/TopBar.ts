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
                m("button", { onclick: () => this._fireSidebarToggleEvent() }, icons.people),
                m("button", { onclick: () => this._fireThemeToggleEvent() }, icons.brightness)
            ])
        ]);
    }

    private _fireSidebarToggleEvent(): void {
        this.eventBus.publish("sidebar.toggle");
    }

    private _fireThemeToggleEvent(): void {
        this.eventBus.publish("theme.toggle");
    }
}
