const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
    res.render('index');
});

router.post('/results', function(req, res, next){
    var cache_size = req.body.cache_size;
    var block_size = req.body.block_size;
    var mm_size = req.body.mm_size;
    var mm_sequence = req.body.mm_sequence;
    mm_sequence.split(/[ ,]+/);
    var cat = req.body.cat;
    var mat = req.body.mat;

    var miss_penalty = parseFloat(cat) + (parseFloat(mat) * parseFloat(block_size)) + parseFloat(cat);

    res.render('results', {
        cache_size: cache_size,
        block_size: block_size,
        mm_size: mm_size,
        mm_sequence: mm_sequence,
        cat: cat,
        mat: mat,
        miss_penalty: miss_penalty
    });
});

router.post('/', function(req, res, next){
    res.render('index');
});

module.exports = router;