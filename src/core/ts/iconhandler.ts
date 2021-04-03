import m, { Vnode } from "mithril";
import trash from "@/assets/trash.svg";
import people from "@/assets/people.svg";
import brightness from "@/assets/brightness-high.svg";

function icon(svg: string): Vnode {
    return m(".icon", m.trust(svg));
}

export const icons = {
    trash: icon(trash),
    people: icon(people),
    brightness: icon(brightness)
};
