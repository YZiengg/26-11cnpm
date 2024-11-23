const jwt = require('jsonwebtoken');  // Thêm dòng này để import jwt
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = async (req, res, next) => {
    console.log('checkToken', req.headers.token)
        const token = req.headers.token.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user){
            if(err) {
                return res.status(404).json({
                    message:"auth1",
                    status:'ERR'

                })
            }
       if(user.admin){
        next()
            }
            else{
                return res.status(404).json({
                    message:"auth2",
                    status:'ERR'

                })
            }
        })
}
const authUserMiddleware = async (req, res, next) => {
       const token = req.headers.token.split(' ')[1]
       const userId = req.params.id
        jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user){
            if(err) {
                return res.status(404).json({
                    message:"auth3",
                    status:'ERR'

                })
            }
            console.log("User", user    )
       if(user?.admin || user?.id===userId){
        next()
            }
            else{
                return res.status(404).json({
                    message:"auth4",
                    status:'ERR'

                })
            }
        })
}







module.exports = {
    authMiddleware,
    authUserMiddleware
    
};
