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
    return identidades.find(identidad => {
        return identidad.id === identidadId;
    });
};
