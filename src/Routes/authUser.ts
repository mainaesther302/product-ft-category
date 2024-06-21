import {Router} from 'express'
import {registerUser} from "../Controllers/authUser"

const authRoutes = Router()

authRoutes.post("/register", registerUser)
authRoutes.post("/login", registerUser)

export default authRoutes;