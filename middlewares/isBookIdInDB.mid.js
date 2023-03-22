const User = require('../model/books.model')

const isBookIdInDB = async (req, res, next) => {

    try {
        const foundBookById = await Book.findById(req.params.body.bookId)
        if(!foundBookById) {
            return res.status(404).json({message : 'book not found'})
        }    


    } catch (error) {
        next(error)
    }

}


module.exports = isBookIdInDB