const express = require('express');
const router = express.Router();
const {
    createTemplate,
    getAllTemplates,
    getTemplateById,
    updateTemplateById,
    deleteTemplateById,

}= require('../controllers/TemplatesControllers');





router.post('/addtemplates', createTemplate);
router.get('/gettemplates', getAllTemplates);
router.get('/gettemplates/:templateId', getTemplateById);
router.put('/updatetemplates/:templateId', updateTemplateById);
router.delete('/deletetemplates/:templateId', deleteTemplateById);

module.exports = router;
