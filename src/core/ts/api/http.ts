import m from "mithril";
import config from "config";

type Headers = {
    "Content-Type": string;
    "ST"?: string;
};

export const POST = (url: string, body: object, redraw?: boolean, token?: boolean, callback?: Function) => {
    const headers: Headers = { "Content-Type": "application/json" };

    if (token && config.token) {
        headers["ST"] = config.token;
    }

    if (config.token) {
        m.request({
            method: "POST",
            url: `${config.httpURL}${url}`,
            body: body,
            headers: headers,
            background: redraw
        }).then(response => {
            if (callback) {
                callback(response);
            }
        });
    }
};
