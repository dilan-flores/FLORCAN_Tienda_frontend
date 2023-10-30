import { useContext } from "react"
import AuthContext from "../../context/AuthProvider"

export const CardPerfil = () => {
    const {auth} = useContext(AuthContext)
    return (
        <div className="bg-white border border-slate-200 h-full p-4 
                        flex flex-col items-center justify-between shadow-xl rounded-lg">

            <div>
                <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="m-auto " width={120} height={120} />
            </div>
            <div className="self-start">
                <p>Nombre: {auth.Nombre_usuario}</p>
            </div>
            <div className="self-start">
                <p>Correo electrónico: {auth.Email_usuario}</p>
            </div>
            <div className="self-start">
                <p>Contraseña: {auth.Password_usuario}</p>
            </div>
        </div>
    )
}
