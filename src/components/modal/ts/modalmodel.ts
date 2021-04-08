import AbstractModel from "@/core/ts/abstractmodel";
import NameApi from "@/core/ts/api/nameapi";
import EventBus from "@/core/ts/events/eventbus";

export default class ModalModel extends AbstractModel {

    inputValue = "";
    alertVisible = false;
    alertMessage = "Failed to set name";

    inputDisabled = false;
    buttonDisabled = false;

    inputElement!: HTMLInputElement;

    updateInputValue({ value }: HTMLInputElement): void {
        this.inputValue = value;
    }

    sendNameRequest(eventBus: EventBus): void {
        this.inputDisabled = true;
        this.buttonDisabled = true;
        NameApi.nicknameRequest(eventBus, this.inputValue, (response: NicknameResponse) => {
            if (response.status) {
                eventBus.publish("modal.destroy_modal");
            } else {
                this.alertMessage = response.message;
                this.alertVisible = true;
                this.inputDisabled = false;
                this.buttonDisabled = false;
                this.inputElement.focus();
            }
        });
    }
}
