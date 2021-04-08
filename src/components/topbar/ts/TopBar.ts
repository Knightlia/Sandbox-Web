import m, { Vnode } from "mithril";
import AbstractComponent from "@/core/ts/abstractcomponent";
import { icons } from "@/core/ts/iconhandler";
import TopBarModel from "@/components/topbar/ts/topbarmodel";
import TopBarNameState from "@/components/topbar/ts/topbarnamestate";
import "@/components/topbar/less/topbar.less";

export default class TopBar extends AbstractComponent<TopBarModel> {

    view(): Vnode {
        return m("nav.navbar", [
            m("div", [
                m("h3", "Sandbox"),

                this.model.topBarNameState === TopBarNameState.BUTTON ?
                    m("button", {
                        onclick: () => this.model.setInputState()
                    }, this.model.buttonName) : null,

                this.model.topBarNameState === TopBarNameState.INPUT ?
                    m("input[placeholder='Enter name...']", {
                        disabled: this.model.inputDisabled,
                        class: this.model.inputClassName,
                        oncreate: ({ dom }) => this.model.onInputCreate(dom as HTMLInputElement),
                        onkeydown: (e: KeyboardEvent) => this._keyDownHandler(e),
                        oninput: () => this.model.currentName = this.model.inputDom.value,
                        onfocusout: () => this.model.setButtonState()
                    }) : null
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

    private _keyDownHandler(e: KeyboardEvent): void {
        if (e.key === "Enter") {
            this.model.sendNameRequest();
        } else if (e.key === "Escape") {
            this.model.setButtonState();
        }
    }
}
