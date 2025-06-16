//Este es el que Jose dio de ejmplo hay que adptarlo a nuestra db

import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, query, where, updateDoc, deleteDoc, setDoc, doc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";//para hash

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Busca un email en la base de usuarios y lo devuelve, puede no existir. heredado de jose, implementar mas adelante al refactorizar
export const buscarEmail = async (email) => {
    const db = getFirestore()
    const docRef = doc(db, "users", email.toLowerCase())
    const docSnap = await getDoc(docRef)
    return docSnap
}

///////////////////////////////////////////////registrar///////////////////////////////////////////////
export const registrar = async (email, username, password) => {
    const db = getFirestore();
    const docRef = doc(db, "users", email.toLowerCase());
    const docSnap = await getDoc(docRef);

    //compruebo si existe
    if (docSnap.exists()) {
        return {
            error: true,
            status: 400,
            message: "Este correo ya está registrado."
        };
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        //registro
        const userInfo = {
            email: email,
            username: username,
            password: hashedPassword,
            tokens: 5
        }
        await setDoc(docRef, userInfo);

        //pillamos los datos para mandarselos al cliente
        const userDoc = await getDoc(docRef);
        //todo ok
        return { error: false, user: userDoc.data() };

    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        return {
            error: true,
            status: 500,
            message: "Hubo un error al procesar la solicitud. Intente nuevamente."
        };
    }
};

///////////////////////////////////////////////comprobarLogin///////////////////////////////////////////////
export const comprobarLogin = async (email, password) => {
    const db = getFirestore();
    const docRef = doc(db, "users", email.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return { error: true, status: 400, message: "Usuario o Contraseña incorrecta" };
    }

    const userData = docSnap.data();

    //bcrypt.compare para comprobar la contraseña
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
        return { error: true, status: 400, message: "Usuario o Contraseña incorrecta" };
    }

    //todo ok
    return { error: false, user: userData };
}

///////////////////////////////////////////////deleteUser///////////////////////////////////////////////
export const deleteUser = async (email, password) => {
    const db = getFirestore();
    const docRef = doc(db, "users", email.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return { error: true, status: 400, message: "Usuario o contraseña incorrecta" };
    }

    const userData = docSnap.data();

    //bcrypt.compare para comprobar la contraseña
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
        return { error: true, status: 400, message: "Usuario o contraseña incorrecta" };
    }

    try {
        // Eliminar el documento del usuario en Firestore
        await deleteDoc(docRef);
        //todo ok
        return { error: false, user: userData };
    } catch (error) {
        return { error: true, status: 500, message: "Error al eliminar la cuenta", details: error.message };
    }
};

///////////////////////////////////////////////actualizarTokens///////////////////////////////////////////////
//Se usa al gastar en juegos y al ganarlos con anuncio
export const actualizarTokens = async (email, tokens) => {
    const db = getFirestore();
    const userRef = doc(db, "users", email.toLowerCase());

    try {
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            return { error: true, status: 400, message: "Usuario no encontrado" };
        }

        const userData = userDoc.data();
        const nuevosTokens = userData.tokens + (tokens);

        if (nuevosTokens < 0) {//no deberia llegar porque se comprueba previamente en el front
            return { error: true, status: 400, message: "No hay suficientes tokens" };
        }

        await updateDoc(userRef, { tokens: nuevosTokens });
        //todo ok
        return { error: false, tokens: nuevosTokens };
    } catch (error) {
        console.error("Error actualizando tokens en Firebase:", error);
        return { error: true, status: 500, message: "Error en el servidor" };
    }
}