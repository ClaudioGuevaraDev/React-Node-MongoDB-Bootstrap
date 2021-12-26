const errorHandler = (error, req, res, next) => {
    const { name, message, code } = error

    if (code === 11000) {
        return res.status(400).json({ message: 'Already exists.' })
    } else if (name === "SyntaxError") {
        return res.status(400).json({ message: 'Malformed JOSN.' })
    } else if (name === "ValidationError") {
        return res.status(400).json({ message: 'Fields are missing.' })
    } else {
        console.log(name)
        console.log(message)
        console.log(code)
    } 
    
    next(error)
}

export default errorHandler