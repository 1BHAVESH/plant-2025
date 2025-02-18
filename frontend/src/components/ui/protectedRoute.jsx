import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const ProctedRoute = ({children}) => {
    const {isAuthnicated} = useSelector((store) => store.user)

    console.log("mmmmmmmm", isAuthnicated)

    if(!isAuthnicated){

        return <Navigate to={"/login"} />
    }

    return children
}