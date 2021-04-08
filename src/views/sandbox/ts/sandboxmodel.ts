import AbstractModel from "@/core/ts/abstractmodel";

export default class SandboxModel extends AbstractModel {

    messageList: SandboxMessage[] = [];

    init(): void {
        this.eventBus.subscribe("view.sandbox_message", this._addMessage, this);
        this.eventBus.subscribe("view.clear_chat", this._clearChat, this);
    }

    private _addMessage(sender: string, message: string, time: number, avatarColour: string): void {
        this.updateModel(() => {
            this.messageList.push({ sender, message, time, avatarColour });
        });
    }

    private _clearChat(): void {
        this.updateModel(() => {
            this.messageList = [];
        });
    }
}
