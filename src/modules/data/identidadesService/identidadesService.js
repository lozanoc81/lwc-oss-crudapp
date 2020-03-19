const URL = '/api/identidades';
let identidades = [];
export const getIdentidades = () =>
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('No response from server');
            }
            return response.json();
        })
        .then(result => {
            identidades = result.data;
            return identidades;
        });
export const getIdentidad = identidadId => {
    fetch(URL + '/' + identidadId)
        .then(response => {
            if (!response.ok) {
                throw new Error('No response from server');
            }
            return response.json();
        })
        .then(result => {
            console.log('service getidentidad result.data', result.data);
            return result.data;
        });
};
