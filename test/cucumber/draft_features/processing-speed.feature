Feature: processing speed

Analysis should not take too long to scan an email otherwise it will get annoying

Person: Jeremy - in a hurry. Sends a lot of emails

Scenario:
Given that Jeremy has written an email,
When he presses send
Then Sleep On It should not take more than 500ms to analyse the email

Examples:
Long email
Short email
Email with lots of emoticons