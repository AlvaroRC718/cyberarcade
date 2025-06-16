import { registrar, buscarEmail, comprobarLogin , deleteUser, actualizarTokens} from "../config/firebase.mjs"

export const buscarEmailFirebase = async (email) => {
    const docSnap = await buscarEmail(email); 
    return docSnap;
}

export const registrarFirebase = async (email, username ,password) => {
    return await registrar(email,username, password)
}

export const comprobarLoginFirebase = async (email, password) => {
    return await comprobarLogin(email, password)
}

export const deleteUserFirebase = async (email,password) => {
    return await deleteUser(email,password)
}

export const actualizarTokensFirebase = async (email, tokens) => {
    return await actualizarTokens(email, tokens)
}
