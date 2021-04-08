import EventBus from "@/core/ts/events/eventbus";
import config from "config";
import MessageType from "@/core/ts/websocket/messagetype";
import NameApi from "@/core/ts/api/nameapi";

export default class SocketHandler {

    private readonly _eventBus: EventBus;
    private _reconnectCount = 0;

    constructor(eventBus: EventBus) {
        this._eventBus = eventBus;
        this.connect = this.connect.bind(this);
    }

    static start(eventBus: EventBus): Promise<void> {
        return new Promise((resolve) => {
            new SocketHandler(eventBus).connect(resolve);
        });
    }

    private connect(resolve?: () => void): void {
        const websocket = new WebSocket(config.wsURL);
        websocket.onopen = () => this._onOpen(resolve);
        websocket.onmessage = (e) => this._onMessage(e);
        websocket.onclose = (e) => this._onClose(e);
        websocket.onerror = this._onError;
    }

    private _onOpen(resolve?: () => void): void {
        console.log("WebSocket connected.");
        this._reconnectCount = 0;
        if (resolve) {
            resolve();
        }
    }

    private _onMessage(e: MessageEvent): void {
        const data = JSON.parse(e.data);

        switch (data.mt) {
            case MessageType.TOKEN_PAYLOAD:
                this._tokenPayload(data);
                break;
            case MessageType.USER_LIST_PAYLOAD:
                this._userListPayload(data);
                break;
            case MessageType.MESSAGE_PAYLOAD:
                this._messagePayload(data);
        }
    }

    private _onClose(e: CloseEvent): void {
        console.warn(`WebSocket connection closed with status: ${e.code} - ${e.reason}`);
        if (this._reconnectCount !== 3) {
            this._reconnectCount++;
            this.connect.call(SocketHandler);
        }
    }

    private _onError(e: Event): void {
        console.error(`WebSocket connection error: ${e}`);
    }

    private _tokenPayload(data: { t: string }): void {
        sessionStorage.setItem("t", data.t);
        config.token = data.t;
        // Setup name if it exists already
        const nickname = sessionStorage.getItem("n");
        if (nickname) {
            NameApi.nicknameRequest(this._eventBus, nickname, (response: NicknameResponse) => {
                if (!response) {
                    this._eventBus.publish("modal.display_modal");
                }
            });
        } else {
            this._eventBus.publish("modal.display_modal");
        }
    }

    private _userListPayload(data: { ul: string[] }): void {
        this._eventBus.publish("view.user_list", data.ul);
    }

    private _messagePayload(data: { s: string, m: string, t: number, a: string }): void {
        this._eventBus.publish("view.sandbox_message", data.s, data.m, data.t, data.a);
    }
}
