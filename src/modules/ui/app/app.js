import { LightningElement } from 'lwc';

export default class App extends LightningElement {
    currentIdentidad = '';

    connectedCallback() {}

    handleIdentidadChange(event) {
        console.log('handleIdentidadChange ' + event.detail);
        if (event) {
            if (this.currentIdentidad !== event.detail) {
                this.currentIdentidad = event.detail;
            } else {
                //return ;
            }
        }
    }

    hadleUpdateList(event) {
        console.log('hadleUpdateList ', event.detail);
        this.template.querySelector('ui-identidades-list').refresh();
    }
}
