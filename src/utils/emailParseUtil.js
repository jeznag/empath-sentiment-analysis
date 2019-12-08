import emailSignatureParser from './emailSignatureParser.js';

const { extractSignature } = emailSignatureParser;

/**
* Emails often come with copies of old emails from earlier in the thread
* We don't want to process the old emails when we're analysing as we'll have a false positive otherwise
* */
function removeQuotedTextFromEmail(emailContents) {
  const strippedHTML = stripHTML(emailContents);
  const processedEmail = extractSignature(strippedHTML).text || emailContents;

  return processedEmail;
}

function stripHTML(message) {
  return message.replace(/<(?:.|\n)*?>/gm, '\n').replace(/&lt;/g, '').replace(/&gt;/g, '').replace(/&amp;/g, '')
    .replace(/&nbsp;/g, ' ');
}

export default {
  removeQuotedTextFromEmail
};
