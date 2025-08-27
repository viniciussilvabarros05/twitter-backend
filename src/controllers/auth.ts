import { RequestHandler } from "express";
import { signupSchema } from "../schemas/signup";
import { findUserByEmail } from "../services/user";


export const signup: RequestHandler = async (req, res)=>{
    const safeData = signupSchema.safeParse(req.body)
    if(!safeData.success){
        return res.json({error:safeData.error.flatten().fieldErrors})
    }

    try{
        const hasEmail = await findUserByEmail(safeData.data.email)
        if(hasEmail){
            return res.json({error:'Email já existe'})
        }
        
    } catch(error){
        res.json(error)
    }
    res.json({message:"ok"})
}