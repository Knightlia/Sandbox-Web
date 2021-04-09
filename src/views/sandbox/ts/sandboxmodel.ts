import AbstractModel from "@/core/ts/abstractmodel";
import config from "config";

export default class SandboxModel extends AbstractModel {

    messageList: SandboxMessage[] = [];

    init(): void {
        this.eventBus.subscribe("view.sandbox_message", this._addMessage, this);
        this.eventBus.subscribe("view.clear_chat", this._clearChat, this);
    }

    private _addMessage(sender: string, message: string, time: number, avatarColour: string): void {
        this.updateModel(() => {
            const right = sender === config.nickname;
            this.messageList.push({ sender, message, time, avatarColour, right });
        });
    }

    private _clearChat(): void {
        this.updateModel(() => {
            this.messageList = [];
        });
    }
}
