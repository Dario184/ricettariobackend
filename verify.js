const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Bad access');

    try{
        const verified = jwt.verify(token, process.env.KEY);
        req.user = verified;
        next();
    }catch(err){
        res.send(400).send('Invalid token');
    }
}