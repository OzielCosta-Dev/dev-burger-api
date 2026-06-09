

const adminMiddleware = (request, response, next) => {
    const isUserAdimin = request.userIsAdmin

    if (!isUserAdimin) {
        return response.status(401).json()
    }

    
    return next()
}


export default adminMiddleware