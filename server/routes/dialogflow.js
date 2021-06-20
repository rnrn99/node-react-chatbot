const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const config = require('../config/keys');

const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode

// 새 세션 만들기
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);


// Text Query Route
// 클라이언트에서 받은 text를 dialogflow api에 보냄

router.post('/textQuery', async (req, res) => {

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // client에서 입력한 text
                text: req.body.text,
                // client에서 입력한 언어
                languageCode: languageCode,
            },
        },
    };

    // 요청 보내고 결과 출력
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`); // 보낸(입력한) text
    console.log(`  Response: ${result.fulfillmentText}`); // 받은 text

    res.send(result);

})

// Event Query Route
router.post('/eventQuery', async (req, res) => {

    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                name: req.body.event,
                languageCode: languageCode,
            },
        },
    };

    // 요청 보내고 결과 출력
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`); // 보낸(입력한) text
    console.log(`  Response: ${result.fulfillmentText}`); // 받은 text

    res.send(result);

})

module.exports = router;

// event 목록
// event_Welcome
