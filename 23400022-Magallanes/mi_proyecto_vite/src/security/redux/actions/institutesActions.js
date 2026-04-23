import axios from 'axios';

export async function getInstitutesAll() {
    try {
        // Intentamos hacer la petición
        let result = await axios.get(`${import.meta.env.VITE_REST_API_SECURITY_EDUCATION}/institutos`);
        console.log('<<AXIOS-INSTITUTOS>>: ', result.data);
        return result.data;
    } catch (error) {
        // Si el servidor está caído (404) o hay error de red, lo atrapamos aquí
        console.warn('<<AXIOS-INSTITUTOS>>: El servidor de Heroku no respondió. Regresando datos vacíos por ahora.');
        
        // Retornamos un arreglo vacío para que Redux no marque error
        return []; 
    }
}