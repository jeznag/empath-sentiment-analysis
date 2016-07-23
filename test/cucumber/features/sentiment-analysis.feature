Feature: Sentiment analysis

Sleep On It should scan emails for sentiment loaded words and tell the user if the email is too negative or overly positive.

Persona: Jeremy - often sends passive aggressive emails.

Scenario: 
Given that Jeremy has written the following emails in Gmail:
    |This is really bad|
    |This is fucking terrible|
    |This is really awesome|
    |This is really fucking awesome|
    |Great job:)|
    |I'm not bad|
    |I'm disappointed :(|
    |This sucks!!!!|
    |THIS SUCKS!!!!|
    |I can't wait any longer|
    |This has gone on too long|
    |I can't wait to meet you all!!|
When Jeremy tries to send the emails in Gmail
Then SleepOnIt should give the following sentiment scores:
    |-6|
    |-9|
    |8|
    |24|
    |6|
    |3|
    |-6|
    |-51|
    |-102|
    |-1|
    |-6|
    |12|
