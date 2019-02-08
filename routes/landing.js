import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('landing', { page: 'home' });
});

router.get('/pref/rou', (req, res) => {
  res.cookie('lang_preferences', 'rolang');
  res.redirect('back');
});

router.get('/pref/eng', (req, res) => {
  res.cookie('lang_preferences', 'enlang');
  res.redirect('back');
});

module.exports = router;