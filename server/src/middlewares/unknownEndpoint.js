const unknownEndpoint = async (req, res) => {
    return res.status(400).json({ message: 'Unknown Endpoint.' })
}

export default unknownEndpoint