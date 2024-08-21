const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);

const API_PATH = {
    // Authentication routes
    LOGIN: `${BASE_URL}api/token/`,
    REFRESH_TOKEN: `${BASE_URL}api/token/`,

    // API routes based on Django router
    ORDERS: `${BASE_URL}api/orders/`,
    SPECIMENS: `${BASE_URL}api/specimens/`,
    SOURCE_DESCRIPTIONS: `${BASE_URL}api/source-descriptions/`,
    PATIENTS: `${BASE_URL}api/patients/`,
    LOCATIONS: `${BASE_URL}api/locations/`,
    OTHER_DETAILS: `${BASE_URL}api/otherdetails/`,
    RECORD: `${BASE_URL}api/record/`
};

export {
    BASE_URL,
    API_PATH
};
