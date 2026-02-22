import axios from "axios";

// Determina il base URL basato sull'ambiente
const getBaseURL = () => {
    // Usa sempre il proxy di Next.js
    return process.env.NEXT_PUBLIC_API_URL || "/api/proxy";
};

export const api = axios.create({
    baseURL: getBaseURL(),
    timeout: 5000,
});

// Intercettore per il fallback all'API locale
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Se il backend non è disponibile, usa l'API locale
        if (
            error.code === "ECONNREFUSED" ||
            error.message === "Network Error"
        ) {
            const fallbackApi = axios.create({
                baseURL: "",
                timeout: 5000,
            });

            try {
                const response = await fallbackApi.get(error.config.url);
                return { data: response.data };
            } catch {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);
