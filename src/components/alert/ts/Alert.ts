import m, { Vnode } from "mithril";
import AbstractComponent, { DefaultAttributes } from "@/core/ts/abstractcomponent";
import AbstractModel from "@/core/ts/abstractmodel";

interface AlertAttributes extends DefaultAttributes<AbstractModel> {
    type: "info" | "warning" | "danger";
    message: string;
}

export default class Alert extends AbstractComponent<AbstractModel, AlertAttributes> {
    view(vnode: Vnode<AlertAttributes>): Vnode {
        return m(`.alert.${vnode.attrs.type}`, {
            onclick: () => this.eventBus.publish("alert.hide")
        }, vnode.attrs.message);
    }
}
