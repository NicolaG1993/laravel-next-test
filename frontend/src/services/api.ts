import axios from "axios";

// Determina il base URL basato sull'ambiente
const getBaseURL = () => {
    // In environment server-side, usa il backend locale tramite API route di Next.js
    if (typeof window === "undefined") {
        return process.env.NEXT_PUBLIC_API_URL || "";
    }
    // Nel browser, usa il backend PHP diretto
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
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
