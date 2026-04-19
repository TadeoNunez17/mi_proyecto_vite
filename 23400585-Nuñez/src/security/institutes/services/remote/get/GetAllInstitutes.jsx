import axios from "axios";

export function getAllInstitutes() {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_GET_ALL_INSTITUTES_URL)
            .then((response) => {
                const data = response.data;

                if (!data.success) {
                    // La API respondió pero indicó que hubo un problema
                    console.error("No se pudo realizar correctamente la petición <<getAllInstitutes>>", data);
                    reject(data);

                } else if (data.data.length === 0) {
                    // La API respondió correctamente pero no hay documentos
                    console.info("🛈 No se encontraron documentos en <<cat_institutos>>");
                    resolve([]);

                } else if (data.success) {
                    // La API respondió correctamente con datos
                    const InstitutesData = data.data[0].dataRes;
                    console.log("Colección: <<cat_institutos>>", InstitutesData);
                    // Se hace una copia profunda para evitar referencias mutables
                    resolve(JSON.parse(JSON.stringify(InstitutesData)));
                }
            })
            .catch((error) => {
                console.error("Error en <<getAllInstitutes - Services>>", error);
                reject(error);
            });
    });
}