import { User } from "../modals/user.modal.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Plant } from "../modals/plant.modal.js";

export const regisetr = async (req, res) => {
    try { 
 
         
 
        const{name, email, password} = req.body;

         console.log(req.body)
 
        if(!name || !email || !password){
            return res.status(401).json({
                message:"something is missing please check felds", 
                success:false,
            })
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(401).json({
                message:"This email id already registerd, Try with new email id",
                success:false,
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await User.create({
            name: name,
            email:email,
            password: hashedPassword,
        })

        return res.status(201).json({
            message: "Account Created Successfully",
            success: true,
        })
        
    } catch (error) {
        console.log(error)
    }
}
 

// LOGIN PROCESS

export  const login = async(req, res) => {

    try {

        const{email, password} = req.body;

        console.log(email, password)

        if(!email || !password){
            return res.status(400).json({
                message: "please provide email and password",
                success: false,
            })
        }

        let findUser = await User.findOne({email});

        if(!findUser){
            return res.status(400).json({
                message: "invalid email and password",
                success: false,
            })
        }

        const isMatch = await bcryptjs.compare(password, findUser.password);

        if(!isMatch){
            return res.status(400).json({
                message: "invalid email and password",
                success: false,
            })
        }

        const tokenData = {
            id:findUser._id,
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: "1d"});

        const populateOrders = await Promise.all(
            findUser.orders.map(async (orderId) => {
                const plant = await Plant.findById(orderId);

                if(plant) {
                    return plant
                }

                return null
            } )
        )

        const populateCart = await Promise.all(
            findUser.cart.map(async (orderId) => {
                const plant = await Plant.findById(orderId);

                if(plant) {
                    return plant
                }

                return null
            } )
        )


        findUser ={
            _id : findUser._id,
            name : findUser.name,
            email: findUser.email,
            orders: populateOrders,
            cart: populateCart,
            token: token
           
        }

        return res.cookie("token", token, {httpOnly: true, sameSite:"strict", maxAge: 86400000 }).json({
            message: `welcome to ${findUser.name}`,
            findUser,
            success: true,
        })

        
        
    } catch (error) {
        console.log(error)
    }
}

export const Logout = async (req, res) => {

    return res.status(200).cookie("token", "", {httpsOnly:true}).json({
        message: `User LOgged Out Successfully`,
        success: true,
    })

    
}


// findUser ={
//     _id : findUser._id,
//     name : findUser.name,
//     email: findUser.email,
//     orders: populateOrders,
//     cart: populateCart
// }