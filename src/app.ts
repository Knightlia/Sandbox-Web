import m from "mithril";
import Sandbox from "@/views/sandbox/ts/Sandbox";
import NotFound from "@/views/notfound/ts/NotFound";
import ThemeHandler from "@/core/ts/themehandler";
import "@/core/less/main.less";
import EventBus from "@/core/ts/events/eventbus";

// Initialise
const eventBus = new EventBus();
ThemeHandler.init();

m.route.prefix = "";
m.route(document.body, "/", {
    "/": {
        view: () => m(Sandbox, { eventBus: eventBus })
    },
    "/:any...": NotFound
});
