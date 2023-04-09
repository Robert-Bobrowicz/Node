const express = require('express');
const router = new express.Router();

router.get('/api/companies', (req, res) => {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({
        text: 'value',
        text2: 'value-2'
    }));
});

module.exports = router;