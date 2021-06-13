const express = require('express');
const { Book, User, Hashtag } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
      const books = await Book.findAll({
        include: {
          model: User,
          attributes: ['id', 'nick'],
        },
        order: [['createdAt', 'DESC']],
      });
      res.render('home', {
        twits: books,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
module.exports = router;
