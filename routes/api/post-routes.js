const router = require('express').Router();
const { Post, User } = require('../../models');
const { post } = require('./user-routes');

// get all users
router.get('/', (req, res) => {
  console.log('=====================');
  Post.findAll({
    attributes: ['id', 'post_url', 'title', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostdata => res.json(dbPostdata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'post_url', 'title', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostdata => {
      if (!dbPostdata) {
        res.status(404).json({ message: "No Post found with this id" });
        return;
      }
      res.json(dbPostdata);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    iser_id: req.body.user_id
  })
    .then(dbPostdata => res.json(dbPostdata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostdata => {
      if (!dbPostdata) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostdata);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostdata => {
      if (!dbPostdata) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostdata);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;