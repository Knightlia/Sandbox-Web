import m, { Vnode } from "mithril";
import "@/components/message/less/bubble.less";
import AbstractComponent, { DefaultAttributes } from "@/core/ts/abstractcomponent";
import AbstractModel from "@/core/ts/abstractmodel";
import config from "config";
import AvatarHandler from "@/core/ts/avatarhandler";

interface BubbleAttrs extends DefaultAttributes<AbstractModel> {
    sender: string;
    message: string;
    time: number;
    avatarColour: string;
}

export default class Bubble extends AbstractComponent<AbstractModel, BubbleAttrs> {

    view(vnode: Vnode<BubbleAttrs>): Vnode {
        const right = vnode.attrs.sender === config.nickname;

        return m(`.message.bubble${right ? ".right" : ""}`, [
            // Avatar container
            m(".avatar-container", [
                m(`img[alt=${vnode.attrs.sender}][src=${AvatarHandler.generateAvatar(vnode.attrs.sender, vnode.attrs.avatarColour)}]`),
            ]),
            // Message body container
            m(".message-body-container", [
                m(".message-body-header", [
                    m("div", [m("strong", vnode.attrs.sender)]),
                    m(".time", this._formatTime(vnode.attrs.time))
                ]),
                // Message body
                m("div", m.trust(vnode.attrs.message))
            ])
        ]);
    }

    private _formatTime(time: number): string {
        const date = new Date(time);
        return date.toLocaleString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
        });
    }
}
