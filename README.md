# CyberArcade API - Servicio de gestión de juegos retro y usuarios

API REST para una plataforma de juegos retro que gestiona usuarios, tokens y recursos de juegos mediante Firebase Authentication y MySQL.

## 📌 Características Clave
- 🔐 Autenticación de usuarios con Firebase
- 🎮 Gestión de tokens para acceso a juegos
- 🕹️ Catálogo completo de juegos retro con ROMs/BIOS
- 📄 API documentada con endpoints auto-explicativos
- 🛡️ Seguridad con CORS y validación de datos

## 📂 Estructura del Proyecto
```
app/
├── public/
│   ├── data/             # Archivos de datos emulador
│   ├── resources/        # Recursos estáticos adicionales
│   └── styles.css        # Hoja de estilos principal
├── routes/
│   └── index.mjs         # Rutas generales de la app
├── views/
│   ├── addtokens.html    # Página para añadir tokens
│   ├── contact.html      # Página de contacto
│   ├── events.html       # Página de eventos
│   ├── fran.html         # Página de publicidad invasiva 
│   ├── games.html        # Página de juegos
│   ├── index.html        # Página principal
│   ├── login.html        # Página de inicio de sesión
│   ├── play.html         # Página para jugar
│   ├── profile.html      # Página de perfil de usuario
│   └── register.html     # Página de registro
├── app.mjs               # Configuración Express
└── server.mjs            # Entry point de la app

service/
├── config/
│   ├── db.mjs          # Conexión MySQL
│   └── firebase.mjs    # Configuración Firebase
├── controllers/
│   └── gamesController.mjs  # Lógica de juegos
├── models/
│   └── gamesModel.mjs       # Consultas SQL
├── public/  # Archivos estáticos (ROMs/BIOS/img)
├── routes/
│   ├── delete.mjs      # Eliminar usuario
│   ├── games.mjs       # Rutas de juegos
│   ├── index.mjs       # Ruta principal
│   ├── login.mjs       # Login
│   ├── register.mjs    # Registro
│   ├── roms.mjs        # Acceso a ROMs
│   └── tokens.mjs      # Gestión de tokens
├── services/
│   └── service.mjs     # Lógica de negocio
├── app.mjs             # Configuración Express
└── server.mjs          # Entry point
```

## 🚀 Endpoints Principales

### 🔑 Autenticación
| Método | Endpoint             | Descripción                     |
|--------|----------------------|---------------------------------|
| POST   | `/api/user/login`    | Inicio de sesión con Firebase   |
| POST   | `/api/user/register` | Registro de nuevos usuarios     |
| POST   | `/api/user/delete`   | Eliminar cuenta de usuario      |

**Ejemplo Login:**
```json
POST /api/user/login
{
  "email": "usuario@cyberarcade.com",
  "password": "supersecret"
}
```

### 🎟️ Gestión de Tokens
| Método | Endpoint          | Descripción                      |
|--------|------------------|----------------------------------|
| POST   | `/api/user/tokens` | Actualizar tokens del usuario   |

**Ejemplo Actualización:**
```json
POST /api/user/tokens
{
  "userId": "usuario@cyberarcade.com",
  "tokens": -2  // Gasta 2 tokens
}
```

### 🎮 Catálogo de Juegos
| Método | Endpoint             | Descripción                     |
|--------|----------------------|---------------------------------|
| GET    | `/api/games`         | Listado completo de juegos     |
| GET    | `/api/games/{name}`  | Detalles de juego específico   |

**Ejemplo Respuesta:**
```json
GET /api/games/Pokemon%20Esmeralda
{
  "name": "Pokemon Esmeralda",
  "rating": 4,
  "tokens": -2,
  "img": "http://localhost:3000/.../pokemon_esmeralda.jpg",
  "rom": "http://localhost:3000/.../pokemon_esmeralda.gba"
}
```

### 📁 Acceso a Recursos
| Método | Endpoint               | Descripción                          |
|--------|------------------------|--------------------------------------|
| GET    | `/api/romsdata/{path}` | Descarga de ROMs/BIOS/imágenes      |

## 📦 Dependencias Principales
```json
"dependencies": {
  "express": "^4.18.2",
  "firebase": "^10.7.0",
  "mysql2": "^3.6.1",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5"
}
```

## ⚙️ Configuración Requerida
### 📄 Archivo `.env`:
```ini
# Firebase
API_KEY=your_firebase_key
PROJECT_ID=cyberarcade-project

# MySQL
DB_HOST=cyberarcade-db
DB_USER=arcade_admin
DB_PASSWORD=securepassword123
DB_NAME=cyberarcade_db
```

## ▶️ Ejecución del Servicio
```bash
# Iniciar servidor
node --env-file=../../config.env server.mjs     # Desde la ruta \web_api_videojuegos\src\servicio

# Insertar datos de juegos (primera vez)
node --env-file=config.env insercion_juegos.mjs
```

🔌 Una vez iniciado, el **servicio estará disponible en**:  
👉 `http://localhost:3000`

---

## 📝 Script de Inserción de Juegos
El archivo `datos_juegos.csv` contiene:
```csv
name,rating,tokens,img,gif,description,...
Pokemon Esmeralda,4,-2,http://..., ...
```

### 📜 El script `insercion_juegos.mjs`:
✔️ Crea la tabla `games` en MySQL  
✔️ Valida y limpia datos del CSV  
✔️ Inserta registros en lote  
✔️ Maneja errores de formato  

---

## 🔍 Consideraciones Importantes
✅ **Las rutas de usuario requieren autenticación Firebase**  
⚠️ **El campo tokens puede ser negativo (coste del juego)**  
📁 **Las ROMs/BIOS/imágenes se sirven desde `public/romsdata`**  
🌐 **Configura CORS para el frontend en `index.mjs`**  
🔄 **Los tokens se actualizan atómicamente en Firebase**

---

## ▶️ Ejecución de la App
```bash
# Iniciar servidor
node --env-file=../../config.env server.mjs     # Desde la ruta \web_api_videojuegos\src\app
```

🔌 Una vez iniciada, la **aplicación estará disponible en**:  
👉 `http://localhost:4000`