import React, { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "@/views/notfound/ts/NotFound";
import Sandbox from "@/views/sandbox/ts/Sandbox";
import "aurora-kit/less/aurora.less";

const html = document.querySelector("html");
if (html) {
    html.dataset.theme = "aurora-light";
}

render(
    <StrictMode>
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Sandbox />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById("root")
);
