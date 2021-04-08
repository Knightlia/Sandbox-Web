import AbstractModel from "@/core/ts/abstractmodel";
import TopBarNameState from "@/components/topbar/ts/topbarnamestate";
import NameApi from "@/core/ts/api/nameapi";

export default class TopBarModel extends AbstractModel {

    inputDom!: HTMLInputElement;
    currentName = "...";
    buttonName = "...";
    topBarNameState = TopBarNameState.BUTTON;
    inputDisabled = false;
    inputClassName = "";

    init(): void {
        this.eventBus.subscribe("view.nickname", (name: string) => {
            this.updateModel(() => {
                this.buttonName = name;
                this.currentName = name;
            });
        }, this);
    }

    setButtonState(): void {
        this.topBarNameState = TopBarNameState.BUTTON;
    }

    setInputState(): void {
        this.inputClassName = "";
        this.topBarNameState = TopBarNameState.INPUT;
    }

    onInputCreate(dom: HTMLInputElement): void {
        this.inputDom = dom;
        dom.value = this.currentName;
        dom.focus();
        dom.select();
    }

    sendNameRequest(): void {
        NameApi.nicknameRequest(this.eventBus, this.currentName, (response: NicknameResponse) => {
            if (response.status) {
                this.updateModel(() => {
                    this.setButtonState();
                });
            } else {
                this.updateModel(() => this.inputClassName = "border-red");
            }
        });
    }
}
