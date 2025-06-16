import Z from "zebras";
import process from "process";
import mysql from "mysql2/promise";
import path from "path";
import { readFileSync, existsSync } from "fs";
//node --env-file=config.env insercion_juegos.mjs 
async function main() {
  try {
    // Obtener la ruta del certificado SSL
    const actualDir = path.resolve(".");
    const rutaCert = path.join(actualDir, "ca.pem");

    if (!existsSync(rutaCert)) {
      throw new Error("El archivo ca.pem no existe en la ruta especificada.");
    }

    const cert = readFileSync(rutaCert);

    // Crear conexión a la base de datos
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: "utf8mb4",
      ssl: {
        ca: cert,
      },
    });

    console.log("Conexión exitosa");

    // Limpiar tabla existente
    const queryClean = "DROP TABLE IF EXISTS games";
    await conn.query(queryClean);

    // Crear tabla
    const queryDDL = `CREATE TABLE games(
      id INTEGER AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      rating INTEGER CHECK (rating BETWEEN 1 AND 5),
      tokens INTEGER ,
      img VARCHAR(255) NOT NULL,
      gif VARCHAR(255),
      description TEXT NOT NULL,
      date INTEGER NOT NULL,
      platform VARCHAR(50) NOT NULL,
      rom VARCHAR(255) NOT NULL,
      bios VARCHAR(255) DEFAULT NULL
    )`;

    await conn.query(queryDDL);
    console.log("Tabla games creada exitosamente");

    // Validar que el archivo CSV existe
    const csvPath = path.join(actualDir, "datos_juegos.csv");
    if (!existsSync(csvPath)) {
      throw new Error("El archivo CSV no existe.");
    }

    // Leer y procesar el archivo CSV
    const df = Z.readCSV(csvPath);
    const df_numerico = Z.parseNums(["rating", "tokens", "date"], df);

    //console.log("Datos procesados desde el CSV:", df_numerico);

    // Preparar la consulta de inserción
    const queryDML = `INSERT INTO games (name, rating,tokens, img, gif, description, date, platform, rom, bios)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Insertar datos en la base de datos
    for (let fila of df_numerico) {
      const {
        name,
        rating,
        tokens,
        img,
        gif,
        description,
        date,
        platform,
        rom,
        bios,
      } = fila;

      // Validar que todos los datos necesarios están presentes
      if (
        name == null ||
        rating == null ||
        tokens == null ||
        img == null ||
        gif == null ||
        description == null ||
        date == null ||
        platform == null ||
        rom == null ||
        //No añado BIOS porque puede ser null
        isNaN(rating) || // Asegurar que es un número
        isNaN(date) // Asegurar que es un número
      ) {
        console.log("Fila inválida, se omite:", fila);
        continue;
      }

      // Reemplazar <COMMA> por , en description
      const cleanedDescription = description.replace(/<COMMA>/g, ",");

      await conn.query(queryDML, [
        name,
        rating,
        tokens,
        img,
        gif,
        cleanedDescription,
        date,
        platform,
        rom,
        bios,
      ]);
    }

    console.log("Datos de games insertados correctamente");

    // Cerrar conexión
    await conn.end();
    console.log("Conexión cerrada");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Ejecutar la función principal
main();
