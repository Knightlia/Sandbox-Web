import { POST } from "@/core/ts/api/http";
import config from "config";

export default class MessageAPI {

    static sendMessage(sender: string, message: string): void {
        console.debug("Sending message request...");
        POST("/v1/message", {
            sender: sender,
            message: message,
            time: new Date().getTime(),
            avatarColour: config.avatarColour
        }, false, true);
    }
}
