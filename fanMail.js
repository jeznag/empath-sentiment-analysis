import * as sentimentAnalyser from './analyseSentiment.js';
import * as analyseDISC from './analyseDISCProfile.js';
import * as emailParser from './utils/emailParseUtil.js';
import * as readabilityAnalyser from './utils/calculateReadingLevel.js';

var Zoho = require('zoho');
var zohoSupportInstance;

'use strict';
startFanMail();

function startFanMail() { 

    document.querySelector('#setAuthToken').addEventListener('click', function () {
        let authTokenFromUser = document.querySelector('#zohoAuthToken').value;
        let portal = document.querySelector('#zohoPortal').value;
        let department = document.querySelector('#zohoDepartment').value;

        fetch('https://fanmailapp.herokuapp.com/',
            method: 'post', 
            body: JSON.stringify({
                authtoken: authTokenFromUser,
                portal: portal,
                department: department
            })
        ).then(function (result) {
            debugger;
        });
        
    });
}

function handleCaseData(data) {
    let caseIDs = extractCaseIDs(data);

    caseIDs.forEach(function (caseID) {
        zohoSupportInstance.getRecordsWithCustomPath(
            'requests', 
            'getrequestthreads', 
            {
                requestid: caseID,
                needdescription: true
            }, 
            function (err, data) {
                handleRequestThreadData(data, caseID);
            }
        );
    });
}

function extractCaseIDs(data) {
    let cases = data.data.Cases.row,
        caseIDs = [];

    return cases.map(caseObj => caseObj.fl[0].content);
}

function handleRequestThreadData(data, caseID) {
    let threadID = extractThreadID(data);
    zohoSupportInstance.getRecordsWithCustomPath(
            'requests', 
            'getthreadinfo', 
            {
                threadid: threadID,
                needdescription: true
            }, 
            function (err, data) {
                handleRequestThreadInfoData(data, caseID);
            }
        );
}

function extractThreadID (data) {
    let threadObj = data.data.Cases.threadinfo;

    return threadObj.fl[0].content;
}

function handleRequestThreadInfoData (data, caseID) {
    const dataAsObject = arrayToObject(data.data.Cases.threadinfo.fl);
    const originalMessage = dataAsObject.Content;
    const messageContent = emailParser.removeQuotedTextFromEmail(originalMessage);
    const messageSubject = dataAsObject.Subject;
    const messageSender = dataAsObject.Sender;
    const sentimentScore = sentimentAnalyser.analyseSentiment(messageContent);

    outputData(originalMessage, messageContent, messageSubject, sentimentScore, messageSender);
    zohoSupportInstance.updateRecord('requests', caseID, {'Sentiment Score': sentimentScore.score}, function () {
    });
}

function arrayToObject(arrayData) {
    let result = {};
    arrayData.forEach(function (item) {
        if (item.val) {
            result[item.val] = item.content || item.file;
        }
    });
    return result;
}

function outputData (originalMessage, processedMessage, messageSubject, sentimentScore, messageSender) {
    let resultsBody = document.querySelector('#resultsTable');
    let resultsTableDiv = document.querySelector('.niceTable');
    let newResultsRow = document.createElement('tr');
    resultsTableDiv.style.height = '';
    newResultsRow.innerHTML = `<td>${messageSender}</td>
                               <td>${messageSubject}</td>
                               <td>${sentimentScore.score}</td>
                               <td>${sentimentScore.negative}</td>
                               <td>${sentimentScore.positive}</td>
                               <td>${originalMessage}</td>
                               <td>${processedMessage}</td>`;
    resultsBody.appendChild(newResultsRow);                         
}

