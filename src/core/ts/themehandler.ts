import EventBus from "@/core/ts/events/eventbus";

export default class ThemeHandler {

    private readonly LIGHT = "aurora-light";
    private readonly DARK = "sandbox-dark";
    private readonly _html: HTMLHtmlElement;
    private _currentTheme: string;

    constructor(eventBus: EventBus) {
        this._html = document.querySelector("html")!;
        this._currentTheme = this._getInitialTheme();
        this._setTheme(this._currentTheme);

        eventBus.subscribe("theme.toggle", this._toggleTheme, this);
    }

    static init(eventBus: EventBus): void {
        new ThemeHandler(eventBus);
    }

    private _getInitialTheme(): string {
        const themeFromStorage = localStorage.getItem("t");
        return themeFromStorage ? themeFromStorage : this.LIGHT;
    }

    private _setTheme(theme: string): void {
        this._html.dataset.theme = theme;
    }

    private _toggleTheme(): void {
        if (this._currentTheme === this.LIGHT) {
            this._currentTheme = this.DARK;
        } else {
            this._currentTheme = this.LIGHT;
        }
        localStorage.setItem("t", this._currentTheme);
        this._setTheme(this._currentTheme);
    }
}
