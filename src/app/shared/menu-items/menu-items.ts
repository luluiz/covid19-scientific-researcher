import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}
export interface Saperator {
    name: string;
    type?: string;
}
export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: 'search',
        name: 'Search',
        type: 'link',
        icon: 'search',
    },
    {
        state: 'about',
        name: 'About',
        type: 'link',
        icon: 'info'
    },
    // {
    //     state: 'admin',
    //     name: 'Admin',
    //     type: 'sub',
    //     icon: 'vpn_key',
    //     children: [
    //         {
    //             state: 'upload',
    //             name: 'Upload',
    //             type: 'link',
    //             icon: 'cloud_upload'
    //         }
    //     ]
    // },
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
