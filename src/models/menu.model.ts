import {SubMenu} from "./submenu.model";

export interface Menu {
    id: number
    name: string
    subMenus: SubMenu[]
}