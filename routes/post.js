const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Book, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    console.log(req.user);
    const book = await Book.create({
      content: req.body.content,
      title : req.body.title,
      subject : req.body.subject,
      img: req.body.url,
      UserId: req.user.id,
      borrow: '신규 등록',
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          })
        }),
      );
      await book.addHashtags(result.map(r => r[0]));
    }
    res.redirect('/submit');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.route('/:id')
  .patch(async (req, res, next) => { //등록한 책 정보 수정
    try {
      console.log(req.params.id);
      const result = await Book.update({
        content: req.body.content,
        title : req.body.title,
        subject : req.body.subject,
      }, {
        where: { id: req.params.id },
      });
      console.log('result');
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
      }
    })
    .delete(async (req, res, next) => { //등록한 책 삭제
      try {
        const result = await Book.destroy({ where: { id: req.params.id } });
        res.json(result);
      } catch (err) {
        console.error(err);
        next(err);
      }
    });

//게시글 상태 수정 -1
router.route('/:id/state1')
  .patch(async (req, res, next) => { 
    try {
      console.log(req.params.id);
      const result = await Book.update({
        borrow: req.body.borrow,
      }, {
        where: { id: req.params.id },
      });
      console.log('result');
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
      }
    });

//게시글 상태 수정 -2
router.route('/:id/state2')
  .patch(async (req, res, next) => { 
    try {
      console.log(req.params.id);
      const result = await Book.update({
        borrow: req.body.borrow,
      }, {
        where: { id: req.params.id },
      });
      console.log('result');
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
      }
    });
//게시글 상태 수정 -3
router.route('/:id/state3')
  .patch(async (req, res, next) => { 
    try {
      console.log(req.params.id);
      const result = await Book.update({
        borrow: req.body.borrow,
      }, {
        where: { id: req.params.id },
      });
      console.log('result');
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
      }
    });
  
module.exports = router;
