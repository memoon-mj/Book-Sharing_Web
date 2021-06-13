const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Book, User, Hashtag } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});
router.get('/submit', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      where : {UserId : req.user.id },
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('submit', {
      title: 'NodeBird',
      twits: books,
    });
  } catch (err) {
    res.render('login_error');
    // console.error(err);
    // next(err);
  }
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
});

// router.get('/', async (req, res, next) => {
//   try {
//     const books = await Book.findAll({
//       include: {
//         model: User,
//         attributes: ['id', 'nick'],
//       },
//       order: [['createdAt', 'DESC']],
//     });
//     res.render('main', {
//       title: 'NodeBird',
//       twits: books,
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });
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

router.get('/login',async(req,res,next) => {
    res.render('login', {
    });
})

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/home');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let books = [];
    if (hashtag) {
      books = await hashtag.getBooks({ include: [{ model: User }] });
    }

    return res.render('home', {
      title: `${query} | NodeBird`,
      twits: books,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get('/mypage',isLoggedIn, (req, res)=> {
  try {
    res.render('mypage');
  } catch (error) {
    res.render('mypage_error');
  }

})

module.exports = router;
