import config from "config";

export default class AvatarHandler {

    constructor() {
        config.avatarColour = Math.floor(Math.random() * 16777215).toString(16);
    }

    static init(): void {
        new AvatarHandler();
    }

    static generateAvatar(name: string, colour: string): string {
        const initial = name[0].toUpperCase();

        const radius = 18.5, margin = 5;
        const canvas = document.createElement("canvas");
        const size = radius * 2 + margin * 2;
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.beginPath();
            ctx.arc(radius + margin, radius + margin, radius, 0, Math.PI * 2);
            ctx.closePath();

            ctx.fillStyle = `#${ colour }`;
            ctx.fill();
            ctx.fillStyle = `#${ this._generateTextColour(colour) }`;
            ctx.font = "18.5px Arial";
            ctx.textAlign = "center";
            ctx.fillText(initial, radius + 5, radius * 4 / 3 + margin);
        }

        return canvas.toDataURL();
    }

    private static _generateTextColour(hex: string): string {
        const r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        return ((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186
            ? "000"
            : "fff";
    }
}
