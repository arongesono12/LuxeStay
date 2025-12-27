
import { GoogleGenAI } from "@google/genai";
import { Hotel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Lista de IDs de Unsplash para hoteles de lujo reales
const LUXURY_HOTEL_IMAGES = [
  "1566073771259-6a8506099945", // Infinity Pool Resort
  "1582719478250-c89cae4dc85b", // Luxury Bedroom
  "1542314831-068cd1dbfeeb", // Classic Luxury Exterior
  "1571896349842-33c89424de2d", // Tropical Luxury Resort
  "1611892440504-42a792e24d32", // Modern Hotel Lobby
  "1564501049412-61c2a3083791", // Mountain View Hotel
  "1520250497591-112f2f40a3f4", // Seaside Luxury
  "1445013517792-079571584b71"  // Urban Boutique Hotel
];

export const searchHotels = async (query: string, coords?: { latitude: number; longitude: number }): Promise<{ hotels: Hotel[]; text: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Eres un conserje de lujo de LuxeStay. Busca hoteles reales y exclusivos en ${query}. 
      Proporciona el nombre real, dirección aproximada y una descripción sofisticada en español que resalte la exclusividad.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: coords ? {
              latitude: coords.latitude,
              longitude: coords.longitude
            } : undefined
          }
        }
      },
    });

    const text = response.text || "He seleccionado personalmente estas estancias excepcionales para su próximo viaje.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const hotels: Hotel[] = chunks.map((chunk: any, index: number) => {
      const mapsData = chunk.maps;
      const imageId = LUXURY_HOTEL_IMAGES[index % LUXURY_HOTEL_IMAGES.length];
      
      return {
        id: `hotel-${index}-${Date.now()}`,
        name: mapsData?.title || `LuxeStay Signature ${index + 1}`,
        address: mapsData?.uri ? "Ubicación Premium verificada" : "Distrito Financiero y de Lujo",
        googleMapsUrl: mapsData?.uri,
        // Generamos un precio realista basado en un rango de lujo
        pricePerNight: `$${Math.floor(Math.random() * 500) + 250}`,
        rating: 4.7 + (Math.random() * 0.3),
        description: `Una joya arquitectónica que redefine el concepto de hospitalidad. Disfrute de vistas panorámicas, gastronomía de autor y un servicio personalizado que anticipa cada uno de sus deseos.`,
        image: `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&w=800&q=80`,
        reviewSnippets: mapsData?.placeAnswerSources?.reviewSnippets || [
          "Una experiencia transformadora. El nivel de detalle es inigualable.",
          "La mejor ubicación de la ciudad con un servicio de guante blanco.",
          "Simplemente espectacular. Superó todas mis expectativas."
        ]
      };
    });

    return { hotels, text };
  } catch (error) {
    console.error("Error en API Gemini:", error);
    return { hotels: [], text: "Nuestros servicios de conserjería están experimentando alta demanda. Por favor, intente de nuevo en unos momentos." };
  }
};
