import jwt from 'jsonwebtoken'

const getUsers = (req, res, next) => {

     if (
        req.url === '/manifest.json' ||
        req.url === '/favicon.ico' ||
        req.url.startsWith('/static/') // agar static assets kisi folder me hain
    ) {
        return next()
    }
    
    const token = req.header('auth-token')
    const JWT_SECRET_STRING = process.env.JWT_STRING
    if (!token) {
        return res.json({
            status: 401,
            message: 'please authenticate a valid token'
        })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_STRING)
        req.user = data.user
        next()
    } catch (error) {
        console.error(error)
        res.json({
            message: 'please authenticate a valid token'
        })
    }
}

export default getUsers