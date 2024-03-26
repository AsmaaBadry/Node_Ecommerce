

const jwt = require('jsonwebtoken');
const { promisify } = require('util');



async function auth(req, res, next) {
  var { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({message: 'unauthenticated, You must login first'})
  }
  
  try {
    let decoded = await promisify(jwt.verify)(authorization, process.env.JWT_SECRET);

    req.id = decoded.data.id;
    req.role = decoded.data.role;
    next();
    // console.log(decoded.data);
    
  } catch (err) {
  return res.status(401).json({message: 'unauthorized'})
  
}

}
function restrictTo(...roles){
  return (req, res, next)=>{

    if(!roles.includes(req.role)){
      return res.status(403).json({message: 'you dont have permission to perform this action'})
    }

    next()
  }
}





module.exports = { auth, restrictTo };
