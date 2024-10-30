const asyncHandler = (requestHandler) => async (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
}



export {asyncHandler}





// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next); // Ensure fn is awaited
//     } catch (error) {
//         res.status(500).json({ // Fixing res.status syntax
//             success: false,
//             message: error.message
//         });
//     }
// }
