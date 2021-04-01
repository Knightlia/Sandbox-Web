import m from "mithril";
import EventBus from "@/core/ts/events/eventbus";

export default abstract class AbstractModel {

    protected readonly eventBus!: EventBus;

    constructor(eventBus?: EventBus) {
        this.eventBus = eventBus!;
        this.init();
    }

    protected init(): void {}

    updateModel(callback: () => void): void {
        callback();
        m.redraw();
    }
}
