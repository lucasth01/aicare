const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //cari user dengan id sesuai dengan decoded
            //req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (err) {
            console.log(err)
            res.status(401)
            throw new Error('Not authorized.')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token.')
    }
}