module.exports = app => {
    const stories = require('../controller/app.controller.js');
    const router = require('express').Router();

    router.post('/', stories.create);
    router.get('/', stories.findAll);
    router.get('/:id', stories.findOne);
    router.put('/:id', stories.update);
    router.delete('/:id', stories.delete);
    router.delete('/', stories.deleteAll);
    router.get('/published', stories.findAllPublished);

    app.use('/api/stories', router);
}