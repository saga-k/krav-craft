import axios from "axios";

const API_URL = "http://localhost:3000";

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
    console.log(response.data);
    return response.data;
  },
  saveIntressenter: async (data) => {
    try {
      const results = await Promise.all(
        data.map(async (item) => {
          if (item.id && !item.__isNew) {
            // Befintlig rad → PUT
            const res = await fetch(`${API_URL}/intressenter/${item.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(item),
            });
            if (!res.ok)
              throw new Error(
                `Misslyckades att uppdatera ID ${item.id}: ${res.status}`
              );
            return res.json();
          } else {
            // Ny rad → POST
            const payload = { ...item };
            delete payload.id;
            delete payload.__isNew;
            const res = await fetch(`${API_URL}/intressenter`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            if (!res.ok)
              throw new Error(
                `Misslyckades skapa ny intressent: ${res.status}`
              );
            return res.json();
          }
        })
      );

      return results;
    } catch (error) {
      console.error("Fel vid sparning av intressenter:", error);
      throw error;
    }
  },

  // Personas
  getPersonas: async () => {
    const response = await axios.get(`${API_URL}/personas`);
    return response.data;
  },
  savePersonas: async (data) => {
    try {
      const results = await Promise.all(
        data.map(async (item) => {
          if (item.id && !item.__isNew) {
            // Befintlig persona → PUT
            const res = await fetch(`${API_URL}/personas/${item.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(item),
            });
            if (!res.ok)
              throw new Error(
                `Misslyckades att uppdatera ID ${item.id}: ${res.status}`
              );
            return res.json();
          } else {
            // Ny persona → POST
            const payload = { ...item };
            delete payload.id;
            delete payload.__isNew;
            const res = await fetch(`${API_URL}/personas`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            if (!res.ok)
              throw new Error(`Misslyckades skapa ny persona: ${res.status}`);
            return res.json();
          }
        })
      );

      return results;
    } catch (error) {
      console.error("Fel vid sparning av personas:", error);
      throw error;
    }
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
  saveRiskanalys: async (data) => {
    console.log(data);

    try {
      // Kör alla PUT-anrop parallellt
      const responses = await Promise.all(
        data.map((item) =>
          fetch(`${API_URL}/riskanalys/${item.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          })
        )
      );

      // Kolla om något svar misslyckades
      responses.forEach((res) => {
        if (!res.ok) {
          throw new Error(
            `Misslyckades att uppdatera ID ${res.url}: ${res.status}`
          );
        }
      });

      // Returnera uppdaterade objekt som JSON
      const result = await Promise.all(responses.map((r) => r.json()));
      return result;
    } catch (error) {
      console.error("Fel vid sparning av riskanalys:", error);
      throw error;
    }
  },
};
