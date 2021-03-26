type Subscription = {
    event: string;
    callback: Function;
    context: unknown;
};

export default class EventBus {

    private readonly _handlers: Record<string, Subscription[]> = {};

    subscribe(event: string, callback: Function, context: unknown): void {
        this._handlers[event] = this._handlers[event] || [];
        this._handlers[event].push({ event, callback, context });
    }

    publish(event: string, ...args: unknown[]): void {
        if (this._handlers[event]) {
            this._handlers[event].forEach(subscription => {
                subscription.callback.call(subscription.context, ...args);
            });
        }
    }
}
