// 26 min => custome middleware
// middlewaare takes req,res and next , next always is last prameter
// so we can call next middleware in the stack
// in this case we console log addres that is being requested ,
// or you can save that address into file using fs system
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  // moment is libarary to format date
  //req.protocol=http
  //host= localhost
  //req.originalUrl=whole url that is requested with
  next();
};

module.exports = logger;
