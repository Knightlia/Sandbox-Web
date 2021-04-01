import EventBus from "@/core/ts/events/eventbus";
import Mock = jest.Mock;

describe("Eventbus", () => {

    let eventBus: EventBus,
        callback: Mock, callbackTwo: Mock;

    beforeEach(() => {
        eventBus = new EventBus();
        callback = jest.fn();
        callbackTwo = jest.fn();
    });

    it("runs callback when subscribed", () => {
        eventBus.subscribe("test-event", callback, this);
        eventBus.publish("test-event");
        expect(callback).toBeCalled();
    });

    it("passes arguments in correctly when running callback", () => {
        eventBus.subscribe("test-event", callback, this);
        eventBus.publish("test-event", "arg", 1, true);
        expect(callback).toBeCalledWith("arg", 1, true);
    });

    it("can handle multiple subscriptions", () => {
        eventBus.subscribe("test-event", callback, this);
        eventBus.subscribe("test-event", callbackTwo, this);
        eventBus.publish("test-event");
        expect(callback).toBeCalled();
        expect(callbackTwo).toBeCalled();
    });

    it("can send parameters correctly with multiple subscriptions", () => {
        eventBus.subscribe("test-event", callback, this);
        eventBus.subscribe("test-event", callbackTwo, this);
        eventBus.publish("test-event", "arg", 1, true);
        expect(callback).toBeCalledWith("arg", 1, true);
        expect(callbackTwo).toBeCalledWith("arg", 1, true);
    });

    it("should handle multiple subscriptions to different events", () => {
        eventBus.subscribe("test-event-one", callback, this);
        eventBus.subscribe("test-event-two", callbackTwo, this);

        eventBus.publish("test-event-one");
        expect(callback).toBeCalled();
        expect(callbackTwo).not.toBeCalled();
        callback.mockReset();
        callbackTwo.mockReset();

        eventBus.publish("test-event-two");
        expect(callback).not.toBeCalled();
        expect(callbackTwo).toBeCalled();
    });

    it("should not run the callback when different event is published", () => {
        eventBus.subscribe("test-event", callback, this);
        eventBus.publish("some-other-event");
        expect(callback).not.toBeCalled();
    });
});
