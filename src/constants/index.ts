/*! POR PRACTICIDAD LAS URL LAS COLOCO EN UN ARCHIVO CONSTANTES PERO
POR BUENAS PRACTICAS Y SEGURIDAD DEBERIAN DE ESTAR EN EL ARCHIVO .ENV
*/
export const API_BASE_URLS = {
  SPACEX: "https://api.spacexdata.com/v4",
  NASA: "https://api.nasa.gov",
};

export type ApiKey = keyof typeof API_BASE_URLS;


export const ITEMS_PER_BATCH = 12;
