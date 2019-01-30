import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render('landing', { page: 'home' });
});

module.exports = router;