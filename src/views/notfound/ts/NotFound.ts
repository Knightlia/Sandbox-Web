import m, { Vnode } from "mithril";

export default class NotFound {
    view(): Vnode {
        document.title = "404 - Sandbox - Particle Chat";
        return m("h1", "404 - Page not found!");
    }
}
