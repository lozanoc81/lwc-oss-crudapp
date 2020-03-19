import { LightningElement, api, track } from 'lwc';

export default class IdentidadItem extends LightningElement {
    @track
    currentItem;

    @api
    set selectedItem(value) {
        if (value && this.currentItem !== value) {
            this.styleNavItem(this.currentItem, value);
            this.currentItem = value;
        }
    }
    get selectedItem() {
        return this.currentItem;
    }
}
