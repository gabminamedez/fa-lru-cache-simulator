const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
    res.render('index', {
        error: null
    });
});

router.post('/results', function(req, res, next){
    var cache_size = req.body.cache_size;
    var block_size = req.body.block_size;
    var mm_size = req.body.mm_size;
    var mm_sequence = req.body.mm_sequence;
    var cat = req.body.cat;
    var mat = req.body.mat;

    mm_sequence = mm_sequence.split(" ");
    if(mm_size != mm_sequence.length) {
        res.render('index', {
            error: "ERROR: The amount of numbers you inputted in the sequence did not correspond to your indicated main memory size."
        });
    }

    var miss_penalty = parseFloat(cat) + (parseFloat(mat) * parseFloat(block_size)) + parseFloat(cat);

    var hits = 0;
    var misses = 0;
    var cache_ages = [];
    var cache_data = [];

    for(var i = 0; i < cache_size; i++){
        cache_ages.push(0);
        cache_data.push(null);
    }

    for(var i = 0; i < mm_size; i++){
        for(var j = 0; j < cache_size; j++){
            if(cache_data[j] == null){
                cache_data[j] = mm_sequence[i];
                misses++;
            }
        }
    }

    res.render('results', {
        cache_size: cache_size,
        block_size: block_size,
        mm_size: mm_size,
        mm_sequence: mm_sequence,
        cat: cat,
        mat: mat,
        miss_penalty: miss_penalty,
        hits: hits,
        misses: misses
    });
});

router.post('/', function(req, res, next){
    res.render('index', {
        error: null
    });
});

module.exports = router;