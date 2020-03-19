import { LightningElement, track, api } from 'lwc';
import { getIdentidades } from 'data/identidadesService';

export default class IdentidadesList extends LightningElement {
    currentIdentidad = '1';

    @track identidades = [];

    @api
    set selectedItem(value) {
        if (value && this.currentIdentidad !== value) {
            this.styleNavItem(this.currentIdentidad, value);
            this.currentIdentidad = value;
        }
    }
    get selectedItem() {
        return this.currentIdentidad;
    }

    connectedCallback() {
        console.log(this.currentIdentidad, this.identidades);
        getIdentidades().then(result => {
            this.identidades = this.allIdentidades = result;
        });
    }

    handleNavItemClick(event) {
        const choice = event.currentTarget.dataset.item;
        this.styleNavItem(this.currentNavItem, choice);
        this.currentNavItem = choice;
        event.preventDefault();
        this.dispatchEvent(
            new CustomEvent('identidadchange', {
                detail: choice,
                bubbles: true
            })
        );
    }

    styleNavItem(itemOld, itemNew) {
        if (undefined === itemOld) {
            itemOld = '1';
        }
        const tabOld = this.template.querySelector(`a[data-item="${itemOld}"]`)
            .parentNode.parentNode;
        const tabNew = this.template.querySelector(`a[data-item="${itemNew}"]`)
            .parentNode.parentNode;
        tabOld.classList.remove('active');
        tabNew.classList.add('active');
    }
}
