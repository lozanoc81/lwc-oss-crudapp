import { LightningElement, api, track } from 'lwc';

export default class IdentidadItem extends LightningElement {
    currentItem;

    @track
    item = {};

    @api
    set selectedItem(value) {
        if (value && this.currentItem !== value) {
            this.currentItem = value;
            this.getIdentidad(value);
        }
    }
    get selectedItem() {
        return this.currentItem;
    }

    handleChange(event) {
        const field = event.target.name;

        if (field === 'id') {
            this.item.id = event.target.value;
        } else if (field === 'ine') {
            this.item.ine = event.target.value;
        } else if (field === 'pasaporte') {
            this.item.pasaporte = event.target.value;
        } else if (field === 'nombre') {
            this.item.nombre = event.target.value;
        } else if (field === 'apellido_paterno') {
            this.item.apellido_paterno = event.target.value;
        } else if (field === 'apellido_materno') {
            this.item.apellido_materno = event.target.value;
        } else if (field === 'vigente') {
            this.item.vigente = event.target.checked;
        }
        console.log(JSON.stringify(this.item));
    }

    getIdentidad(value) {
        const URL = '/api/identidades/' + value;
        fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No response from server');
                }
                return response.json();
            })
            .then(result => {
                console.log('service getidentidad result.data', result.data);
                this.item = result.data;
            });
    }

    nuevaIdentidad() {
        this.currentItem = undefined;
        this.item = {};
    }

    updateIdentidad() {
        let URL = '/api/identidades/' + this.currentItem;
        let METHOD = 'PUT';
        if (undefined === this.currentItem) {
            METHOD = 'POST';
            URL = '/api/identidades';
        }
        fetch(URL, {
            method: METHOD,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.item)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No response from server');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
