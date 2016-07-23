Feature: Readability Score

Sleep On It should scan emails for readability level so we can detect how advanced the vocab of the sender is. This will help us tailor our replies so that the sender doesn't feel patronised or baffled by our response.

Scenario: 
Given that a sender has written the following emails with varying vocab levels:
    |When can you finish this?|
    |Please finish this by Sunday|
    |This is not good enough|
    |Can you send it to me?|
    |Impossibly advanced vocabulary mystifies readers|
    |Impossibly advanced vocabulary mystifies readers. Can you send it to me? This is not good enough|
    |I'm really excited about this new project!! This will be awesome!!|
When the sender sends the emails
Then SleepOnIt should give the following readability scores:
    |4.0|
    |4.8|
    |3.8|
    |2.7|
    |8.8|
    |4.9|
    |4.6|
