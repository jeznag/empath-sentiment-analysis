Feature: Egoism Analysis

Sleep On It should scan emails for egoism so we can detect how other-centred the sender is. This helps us calculate DISC profile.

Scenario: 
Given that a sender has written the following emails with varying egoism levels:
    |When can you finish this?|
    |I really like my new car. Do you like it?|
    |We're going to have so much fun in our new car!|
    |You should really change your clothes. They look bad on you.|
    |I'll get it done for you next Friday|
    |We'll do it soon. You'll need to change your expectations accordingly|
When the sender sends the emails with varying egoism levels
Then SleepOnIt should give the following egoism scores:
    |{"selfish": 0, "controlling": 1, "conforming": 0}|
    |{"selfish": 2, "controlling": 1, "conforming": 0}|
    |{"selfish": 0, "controlling": 0, "conforming": 2}|
    |{"selfish": 0, "controlling": 3, "conforming": 0}|
    |{"selfish": 1, "controlling": 1, "conforming": 0}|
    |{"selfish": 0, "controlling": 2, "conforming": 1}|
