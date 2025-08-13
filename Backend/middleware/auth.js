import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({success : false , message:"You Are Not Logged In"});
    }

    const token = authHeader.split(" ")[1];

    try{
        //decoding token
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }catch(err){
        return res.status(401).json({message:"Invalid Token or Expired Token"});
    }
}
