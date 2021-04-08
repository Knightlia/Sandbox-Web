import EventBus from "@/core/ts/events/eventbus";
import { POST } from "@/core/ts/api/http";
import config from "config";

export default class NameApi {

    static nicknameRequest(eventBus: EventBus, nickname: string, callback?: Function): void {
        console.log(`Making nickname request for name: ${nickname}`);
        POST("/v1/nickname", { nickname: nickname }, false, true, (response: NicknameResponse) => {
            if (response.status) {
                sessionStorage.setItem("n", response.nickname);
                config.nickname = response.nickname;
                eventBus.publish("view.nickname", response.nickname);
            }

            if (callback) {
                callback(response);
            }
        });
    }
}
