const router = require('express').Router();
const playList = require('../model/playList.model');


router.post('/', async (req, res, next) => {
  try {
    const newplayList = {
      name: req.body.name,
      //userId: req.body.userId
    };
    const createdplayList = await playList.create(newplayList);
    res.status(201).json(createdplayList);
  } catch (err) {
    next(err);
  }
});


router.get('/', async (req, res, next) => {
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
