const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res)).catch((error) => {
       res.status(500).json({ message: error.message });
    });
 };
 
 export default asyncHandler;
 