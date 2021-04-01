export default class ThemeHandler {

    private readonly LIGHT = "aurora-light";
    private readonly _html: HTMLHtmlElement;

    constructor() {
        this._html = document.querySelector("html")!;
        this._setTheme(this.LIGHT);
    }

    static init(): ThemeHandler {
        return new ThemeHandler();
    }

    private _setTheme(theme: string): void {
        this._html.dataset.theme = theme;
    }
}
