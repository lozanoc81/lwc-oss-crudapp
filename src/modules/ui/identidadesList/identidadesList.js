import { LightningElement, track, api } from 'lwc';
import { getIdentidades } from 'data/identidadesService';

export default class IdentidadesList extends LightningElement {
    currentIdentidad = '';

    @track identidades = [];
    _isRendered = false;

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
            this.currentIdentidad = result[0].id;
        });
    }

    @api
    refresh() {
        console.log(this.currentIdentidad, this.identidades);
        getIdentidades().then(result => {
            this.identidades = this.allIdentidades = result;
        });
    }

    renderedCallback() {
        if (this._isRendered) return;
        //if (this.currentIdentidad === undefined && this.currentIdentidad == null) this.currentIdentidad="1";
        console.log('renderedCallback ' + this.currentIdentidad);
        this._isRendered = true;
        let first = this.template.querySelector('li');
        if (first) {
            first.classList.add('active');
        }
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
        if (undefined === itemOld) itemOld = '1';
        const tabOld = this.template.querySelector(`a[data-item="${itemOld}"]`)
            .parentNode.parentNode;
        const tabNew = this.template.querySelector(`a[data-item="${itemNew}"]`)
            .parentNode.parentNode;
        tabOld.classList.remove('active');
        tabNew.classList.add('active');
    }
}
