# 🚀 SpaceX Dashboard

Aplicación desarrollada con React, MUI, SWR, Vite y Google Maps API para explorar información sobre lanzamientos de SpaceX, con funcionalidades de filtrado, favoritos y visualización en mapa.

---

## 📦 Instalación

Sigue los pasos para clonar y ejecutar el proyecto localmente:

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/spacex-dashboard.git
cd spacex-dashboard

# 2. Instalar dependencias
npm install

# 3. Ejecutar el proyecto en entorno local
npm run dev
```

---

## 🧑‍💻 Instrucciones de uso

Una vez iniciado el proyecto en el navegador:

1. **Listado de lanzamientos:** Verás una lista con información relevante de cada lanzamiento de SpaceX.
2. **Filtros:** Puedes filtrar los lanzamientos por fecha, nombre o tipo de misión.
3. **Favoritos:** Haz clic en el icono de estrella ⭐ para marcar un lanzamiento como favorito.
4. **Mapa:** Accede al mapa para visualizar los lugares de lanzamiento y aterrizaje usando Google Maps.

---

## ⚠️ Consideraciones adicionales

- Necesitas una clave de API de Google Maps para utilizar la vista del mapa.

### ¿Cómo obtener una clave de Google Maps?

1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un nuevo proyecto (o usa uno existente).
3. Habilita la API de Maps JavaScript.
4. Crea una clave de API en la sección "Credenciales".
5. Agrega tu clave en el archivo de entorno `.env` como:

```env
VITE_GOOGLE_MAPS_API_KEY=tu_clave_aquí
```

> Asegúrate de **no subir** la clave a ningún repositorio público.

---

## 🛠️ Tecnologías utilizadas

- **React 19** – Librería principal para construir la interfaz.
- **Vite** – Bundler para desarrollo rápido.
- **TypeScript** – Tipado estático.
- **MUI** – Componentes de UI modernos.
- **SWR** – Fetching de datos con caching y revalidación.
- **Axios** – Cliente HTTP.
- **Google Maps API** – Mapa interactivo con marcadores.
- **Tailwind CSS** – Estilado rápido y responsive.
- **Date-fns** – Utilidades para manejar fechas.

---

## ✅ Scripts disponibles

```bash
npm run dev       # Ejecuta la app en modo desarrollo
npm run build     # Compila la app para producción
npm run preview   # Previsualiza la versión de producción localmente
npm run lint      # Ejecuta ESLint para verificar errores
```