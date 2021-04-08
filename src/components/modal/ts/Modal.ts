import m, { Vnode } from "mithril";
import AbstractComponent from "@/core/ts/abstractcomponent";
import { Modal as M } from "aurora-kit";
import ModalModel from "@/components/modal/ts/modalmodel";
import Alert from "@/components/alert/ts/Alert";

export default class Modal extends AbstractComponent<ModalModel> {

    oncreate(): void {
        const modal = M.init("modal");
        this.eventBus.subscribe("modal.display_modal", modal.display, modal);
        this.eventBus.subscribe("modal.destroy_modal", modal.dispose, modal);
        this.eventBus.subscribe("alert.hide", () => this.model.alertVisible = false, this);

        this.model.inputElement = document.getElementById("modal-input") as HTMLInputElement;
    }

    view(): Vnode {
        return m(".modal#modal", [
            m(".modal-content", [
                m("div", [m("h3", "Set Your Name")]),

                this.model.alertVisible ? m(Alert, {
                    type: "warning",
                    message: this.model.alertMessage,
                    eventBus: this.eventBus
                }) : null,

                m("div", m("input[placeholder='Enter name...']#modal-input", {
                    oninput: (e: InputEvent) => this.model.updateInputValue(e.target as HTMLInputElement),
                    onkeydown: (e: KeyboardEvent) => this._onKeyDown(e),
                    disabled: this.model.inputDisabled
                })),

                m("footer", {
                    onclick: () => this.model.sendNameRequest(this.eventBus),
                    disabled: this.model.buttonDisabled
                }, m("button.primary", "Set Name"))
            ])
        ]);
    }

    private _onKeyDown(e: KeyboardEvent): void {
        if (e.key === "Enter") {
            this.model.sendNameRequest(this.eventBus);
        }
    }
}
