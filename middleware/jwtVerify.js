import jwt from "jsonwebtoken"
import userModel from "../model/user.js"


const jwtVerify = async(req,res,next)=>{
    try {
        const token  = req.header("Authorization")
      
        
        if(!token){
            return res.status(400).send({msg:"token not found"})
        }
        const replaceToken = token.replace("Bearer","").trim()
        const decode = jwt.verify(replaceToken, process.env.SECRET)
       
        if(!decode){
            return res.status(400).send({msg:"token not valid"})
        }
       
        if(decode){
            const findUser = await userModel.findById(decode._id).select("-password")
            req.user = findUser
            next()
        }
   
    } catch (error) {
        console.log("jwtVerify error",error)
    }
}
export default jwtVerify