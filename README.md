# Modelscrapper-frontend
Modelscrapper-frontend is a React-based web application meant to provide the frontned for this [backend](https://github.com/itsfadymate/Modelscrapper-backend).

## Features

- **Unified Search:** Search for 3D models across multiple platforms at once.
- **Filtering:** Filter results by website and free/paid models.
- **Model Details:** View detailed information, including images, price, makes, likes, comments, and featured status.
- **Direct Download:** Download model files directly (where supported).
- **3D Viewer:** Preview models in-browser using an integrated 3D viewer or embedded viewer (where available).
- **Responsive Design:** Works on desktop and mobile devices.

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/modelscrapper-frontend.git
   cd modelscrapper-frontend/scrapper-view
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Edit `.env` to set your base URL and Kiri:Moto URL.
**Example `.env`:**
```
VITE_API_BASE_URL=http://localhost:8080 or your deployment URL
VITE_KIRI_MOTO_URL=https://grid.space/kiri/
```


4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173).

## Screenshots

### Home Page
<img width="1896" height="914" alt="image" src="https://github.com/user-attachments/assets/a1f537fd-fd57-4fa5-92f5-5c615d2535f4" />

### FAQ Section
<img width="1862" height="909" alt="image" src="https://github.com/user-attachments/assets/949e7ec0-ace5-420a-8826-30e611e702e9" />

### Filter overlay
<img width="1892" height="919" alt="image" src="https://github.com/user-attachments/assets/4ca04d1c-fd31-4a5b-a206-97f6ab3f5566" />

### Example search pages
<img width="1863" height="896" alt="image" src="https://github.com/user-attachments/assets/cdd19d01-927f-480e-8242-43f5f2f9ca64" />
<img width="1857" height="906" alt="image" src="https://github.com/user-attachments/assets/8e80d0bb-3684-4078-8b12-617ecb8c200e" />


### Example Details Overlay
<img width="1893" height="902" alt="image" src="https://github.com/user-attachments/assets/76ac363c-f03f-41b4-a36b-284685a8d702" />


### Example integrated slicer
<img width="1867" height="887" alt="image" src="https://github.com/user-attachments/assets/c38b4ada-0e43-41e8-a79a-b5b552232083" />

### Example 3D viewer
<img width="1858" height="885" alt="image" src="https://github.com/user-attachments/assets/c970aa5d-1c1c-4d39-a3fb-f0223d9b1380" />



## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Lucide React Icons](https://lucide.dev/)
- [JSZip](https://stuk.github.io/jszip/)

## Project Structure

- `src/components/` — React components for UI and overlays
- `src/App.jsx` — Main application logic
- `src/main.jsx` — Entry point

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
