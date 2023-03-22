const router = require('express').Router();
const List = require('../model/list.model');


router.get('/', async (req, res, next) => {
  try {
    const lists = await List.find();
    res.status(200).json({ message: 'Listes trouvées', data: lists });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({ message: 'Aucune liste trouvée' });
    }
    res.status(200).json({ message: 'Liste trouvée', data: list });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
