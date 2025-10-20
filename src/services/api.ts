import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const api = {
  // Projektoutline
  getProjektoutline: async () => {
    const response = await axios.get(`${API_URL}/projektoutline`);
    return response.data;
  },
  saveProjektoutline: async (data: any) => {
    const response = await axios.put(`${API_URL}/projektoutline`, data);
    return response.data;
  },

  // Projektdirektiv
  getProjektdirektiv: async () => {
    const response = await axios.get(`${API_URL}/projektdirektiv`);
    return response.data;
  },
  saveProjektdirektiv: async (data: any) => {
    const response = await axios.put(`${API_URL}/projektdirektiv`, data);
    return response.data;
  },

  // Intressenter
  getIntressenter: async () => {
    const response = await axios.get(`${API_URL}/intressenter`);
    return response.data;
  },
  saveIntressenter: async (data: any[]) => {
    const response = await axios.put(`${API_URL}/intressenter`, data);
    return response.data;
  },

  // Personas
  getPersonas: async () => {
    const response = await axios.get(`${API_URL}/personas`);
    return response.data;
  },
  savePersonas: async (data: any[]) => {
    const response = await axios.put(`${API_URL}/personas`, data);
    return response.data;
  },

  // Kravspec
  getKravspec: async () => {
    const response = await axios.get(`${API_URL}/kravspec`);
    return response.data;
  },
  saveKravspec: async (data: any) => {
    const response = await axios.put(`${API_URL}/kravspec`, data);
    return response.data;
  },

  // Riskanalys
  getRiskanalys: async () => {
    const response = await axios.get(`${API_URL}/riskanalys`);
    return response.data;
  },
  saveRiskanalys: async (data: any[]) => {
    const response = await axios.put(`${API_URL}/riskanalys`, data);
    return response.data;
  },
};
