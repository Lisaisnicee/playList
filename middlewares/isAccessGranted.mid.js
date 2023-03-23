
const isAccessGranted = async (req, res, next) => {
try { 
    
    const foundUser = await User.findOne({ email })
        if (!foundUser) {
            return res.status(409).json({ message: 'wrong email or password' })
        }
        const isValid = await bcrypt.compare(password, foundUser.password)
        if (!isValid) {
            return res.status(409).json({ message: 'wrong email or password' })
        }
        return foundUser;
}
catch (e) {
    next(e)

}
}

module.exports = isAccessGranted