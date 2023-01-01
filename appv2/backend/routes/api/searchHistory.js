const express = require('express');
const router = express.Router();
const searchHistoryController = require('../../controllers/searchHistoryController');
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(searchHistoryController.displaySearchesRegular);

router.route('/minAI')
    .get(searchHistoryController.displaySearchesWithAIScoreFilter)

router.route('/hide')
    .get(searchHistoryController.hideColumnsLogic)

router.route('/allSearch')
    .get(searchHistoryController.displaySearchesWithAggregationOnSearch)

router.route('/dupSearch')
    .get(searchHistoryController.displaySearchesThatHaveBeenMadeMultipleTimes)

router.route('/country')
    .get(searchHistoryController.displaySearchesMadeInAllCountries)


module.exports = router;