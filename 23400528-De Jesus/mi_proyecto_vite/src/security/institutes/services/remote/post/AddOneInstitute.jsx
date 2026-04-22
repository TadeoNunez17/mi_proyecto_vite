import axios from "axios";

export function AddOneInstitute(institute) {
    console.log("<<EJECUTA>> API <<AddOneInstitute>> Requiere:", institute);

    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_CAT_INSTITUTES_URL, institute)
            .then((response) => {
                const data = response.data;
                console.log("<<RESPONSE>> AddOneInstitute", data);

                if (!data.success) {
                    console.error("<<ERROR>> API <<AddOneInstitute>>", data);
                    reject(data);
                } else if (data.success) {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddOneInstitute>>", error);
                reject(error);
            });
    });
}