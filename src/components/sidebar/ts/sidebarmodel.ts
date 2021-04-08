import AbstractModel from "@/core/ts/abstractmodel";

export default class SidebarModel extends AbstractModel {

    currentName = "";
    userList: string[] = [];

    init(): void {
        this.eventBus.subscribe("view.nickname", (name: string) => {
            this.currentName = name;
            const index = this.userList.indexOf(name);
            if (index !== -1) {
                this.userList.splice(index, 1);
            }
        }, this);

        this.eventBus.subscribe("view.user_list", (userList: string[]) => {
            this.updateModel(() => {
                this.userList = userList.filter(name => name !== this.currentName);
            });
        }, this);
    }
}
