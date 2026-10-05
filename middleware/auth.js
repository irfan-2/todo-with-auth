import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) =>{
    try {
        const token = req.headers.authorization?.split(''[1])

        if(!token){
            res.status(401).json({
                msg : "Invalid token"
            })
        }

        const decode = jwt.verify(token, "hellohello")
        req.user = decode
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg : error
        })
    }
}

export default authMiddleware