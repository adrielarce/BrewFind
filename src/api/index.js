import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.openbrewerydb.org',
})

export const getBreweriesByCity = (city, page=1) => api.get(`/breweries?by_city=${city}&page=${page}&per_page=50`);

const apis = {
    getBreweriesByCity,
}

export default apis