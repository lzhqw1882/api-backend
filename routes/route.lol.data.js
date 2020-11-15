let express = require('express');
let router = express.Router();
let ctrlConstants       = require('../controllers/lol.datas/Ctrl.constants');
let ctrlChampions       = require('../controllers/lol.datas/Ctrl.game.info');
let ctrlChampion       = require('../controllers/lol.datas/Ctrl.champion');
let ctrlSummoners       = require('../controllers/lol.datas/Ctrl.summoners');
let ctrlEntriesSummoner = require('../controllers/lol.datas/Ctrl.entries.summoner');
let ctrlMatchList      = require('../controllers/lol.datas/Ctrl.match.list');
let ctrlMatchs          = require('../controllers/lol.datas/Ctrl.matches');


// 라이엇 기본 데이타
router.post('/constants/:id',ctrlConstants.post);

// 게임 기본정보 (챔피언)
router.post('/game-info/champion',ctrlChampions.post);
// 게임 기본정보 (아이템)
router.post('/game-info/item',ctrlChampions.post);
// 게임 기본정보 (서머너 스펠)
router.post('/game-info/summoner',ctrlChampions.post);
// 게임 기본정보 (프로필 아이콘)
router.post('/game-info/profileicon',ctrlChampions.post);

// 언어및 버전별 챔피언 상세 정보
router.post('/champion',ctrlChampion.post);

// 소환사 정보
router.get('/summoners/:id/', ctrlSummoners.get); // id = summonerName
router.post('/summoners', ctrlSummoners.post);

// 소환사 전적
router.get('/entries-summoner/:id/', ctrlEntriesSummoner.get); // id = summonerId
router.post('/entries-summoner', ctrlEntriesSummoner.post);

// 소환사 게임정보
router.get('/match-list/:id', ctrlMatchList.get); // id = accountId
router.post('/match-list', ctrlMatchList.post);

// 소환사 게임 상세정보
router.get('/matches/:id', ctrlMatchs.get);
router.post('/matches', ctrlMatchs.post);


module.exports = router;
