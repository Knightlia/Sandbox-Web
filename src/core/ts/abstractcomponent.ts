import { Attributes, Component, Vnode } from "mithril";
import AbstractModel from "@/core/ts/abstractmodel";
import EventBus from "@/core/ts/events/eventbus";

export interface DefaultAttributes<T extends AbstractModel> extends Attributes {
    eventBus?: EventBus;
    model?: T;
}

export default abstract class AbstractComponent<T extends AbstractModel = AbstractModel, K extends DefaultAttributes<T> = DefaultAttributes<T>>
    implements Component<K> {

    protected readonly eventBus!: EventBus;
    protected readonly model!: T;

    constructor(vnode?: Vnode<K>) {
        if (vnode && vnode.attrs) {
            this.eventBus = vnode.attrs.eventBus!;
            this.model = vnode.attrs.model!;
        }
    }

    abstract view(vnode?: Vnode<K>): Vnode;
}
