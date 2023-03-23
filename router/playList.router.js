const router = require('express').Router();
const PlayList = require('../model/playList.model');


router.post('/lists', async (req, res, next) => {

  try {
  
   const createdplayList = await PlayList.create(req.body)
   const saveAns = await createdplayList.save();
   res.status(201).json(saveAns)

}
catch(error) {
   next(error)
}



});


router.get('/lists', async (req, res, next) => {
  try {
    const playLists = await PlayList.find();
    res.status(200).json({ message: 'playLists trouvées', data: playLists });
  } catch (err) {
    next(err);
  }
});

router.get('/:playListId', async (req, res, next) => {
  const id = req.params.playListId;
  console.log("route playlistID", req.params)
  try {
    const playList = await PlayList.findById(id);
    console.log("playlist : ", playList)
    if (!playList) {
      return res.status(404).json({ message: 'Aucune playListe trouvée' });
    }
    res.status(200).json({ message: 'playList trouvée', data: playList });
  } catch (err) {
    next(err);
  }
});


router.patch('/:playListId', async (req, res, next) => {
const id = req.params.playListId;

  try {
    const playList = await PlayList.findByIdAndUpdate(id, req.body, { new: true });
    if (!playlist) {
      return res.status(404).json({ message: 'Aucune playlist trouvée à update' });
    }
    //res.send(playList);
    res.json(playList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});




router.delete('/lists/:id', async (req, res, next) => {
  const playlistId = req.params.playListId;

  try {
    const playList = await PlayList.findByIdAndDelete(playlistId);

    if (!playList) {
      return res.status(404).json({ message: "La playlist que vous cherchez à supprimer est introuvable" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});


module.exports = router;
