const router = require('express').Router();
const playList = require('../model/playList.model');


router.post('/lists', async (req, res, next) => {

  try {
  
   const createdplayList = await playList.create(req.body)
   const saveAns = await createdplayList.save();
   res.status(201).json(saveAns)

}
catch(error) {
   next(error)
}



});


router.get('/lists', async (req, res, next) => {
  try {
    const playLists = await playList.find();
    res.status(200).json({ message: 'playLists trouvées', data: playLists });
  } catch (err) {
    next(err);
  }
});

router.get('/:playListId', async (req, res, next) => {
  const id = req.params.id;

  try {
    const playList = await playList.findById(id);
    if (!playList) {
      return res.status(404).json({ message: 'Aucune playListe trouvée' });
    }
    res.status(200).json({ message: 'playList trouvée', data: playList });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
