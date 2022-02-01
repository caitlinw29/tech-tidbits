const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//only post a new blog when signed in
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//edit a post when signed in
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        // All the fields you can update and the data attached to the request body.
        title: req.body.title,
        contents: req.body.contents,
      },
      {
        // Gets the post to target based on post id and user id
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
      
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post only when signed in
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
