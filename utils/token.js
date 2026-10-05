import jwt from "jsonwebtoken"

async function encrypt(user){
    try{
        return await jwt.sign(user, "hellohello", {expiresIn : "1D"})

    }
    catch(error){
        console.log(error);
        
    }
}

export default encrypt
