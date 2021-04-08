import m from "mithril";
import Sandbox from "@/views/sandbox/ts/Sandbox";
import NotFound from "@/views/notfound/ts/NotFound";
import ThemeHandler from "@/core/ts/themehandler";
import EventBus from "@/core/ts/events/eventbus";
import SocketHandler from "@/core/ts/websocket/sockethandler";
import "@/core/less/main.less";
import AvatarHandler from "@/core/ts/avatarhandler";
import SandboxModel from "@/views/sandbox/ts/sandboxmodel";

// Initialise
const eventBus = new EventBus();
ThemeHandler.init(eventBus);
AvatarHandler.init();

SocketHandler.start(eventBus).then(() => {
    m.route.prefix = "";
    m.route(document.body, "/", {
        "/": {
            view: () => m(Sandbox, {
                eventBus: eventBus,
                model: new SandboxModel(eventBus)
            })
        },
        "/:any...": NotFound
    });
});
