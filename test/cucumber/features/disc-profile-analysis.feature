Feature: DISC Profile analysis

Sleep On It should scan emails for words and phrases that exemplify certain DISC profiles
so we can figure out what kind of DISC profile senders fit into.

Personas: 

Dan - high D - negative to neutral sentiment, lots of command words, short emails, vocab = basic to medium
Rik - high I - high sentiment, says we a lot, short emails, vocab = basic
Pat - high S - neutral to medium sentiment, says we a lot, medium-long emails, vocab = basic to medium
Ding - high C - neutral to negative sentiment, long emails, vocab = advanced

Scenario: 
Given that Dan (high D) has written the following emails:
    |When can you finish this?|
    |Please finish this by Sunday|
    |This is not good enough|
    |Can you send it to me?|
When Dan tries to send the emails
Then SleepOnIt should give the following DISC results:
    |{"D": 7, "I":1, "S":1, "C":3}|
    |{"D": 5, "I":1, "S":1, "C":3}|
    |{"D": 5, "I":1, "S":1, "C":1}|
    |{"D": 7, "I":1, "S":1, "C":1}|

Scenario:
Given that Rik (high I) has written the following emails:
    |I'm really excited about joining the team and working with all of you!! This will be so good!! We'll have a blast!|
    |I'm really looking forward to meeting up with you all next week!! We're going to such a good time :) :) I can't wait!|
    |This is so much fun!! I love going to conferences :)|
When Rik tries to send the emails
Then SleepOnIt should give the following DISC results:
    |{"D": 1, "I": 1, "S":6, "C":1}|
    |{"D": 1, "I": 1, "S":6, "C":1}|
    |{"D": 1, "I": 3, "S":4, "C":1}|

Scenario:
Given that Pat (high S) has written the following emails:
    |Hey everyone, wanted to give you a quick pep talk :) Let's consider our actions carefully because we don't know what might happen. I really want to make sure everyone agrees with this. We don't want to ruffle anyone's feathers :) Let's take some time to reflect on what we should do next. Teamwork makes the dream work!|
    |Let's hold off making a decision on this until we can gather more information. I want to make sure that the team is happy with the new office move. Let's all take some time to think about what we all think and come back together in a few weeks. We want to make sure everyone gets consulted.|
When Pat tries to send the emails
Then SleepOnIt should give the following DISC results:
    |{"D": 1, "I":1, "S":3, "C":6}|
    |{"D": 1, "I":1, "S":6, "C":3}|

Scenario:
Given that Ding (high C) has written the following emails:
    |I found a mistake in your work. The issue is with subsection four part 3. Ordinarily you would need to follow clause f but due to article 3 of the preceding case presided under by the esteemed Judge Matthews, you need to consider all relevant use cases and prepare for a contingency|
    |I was reviewing the document you wrote last night. There is a problem with this clause and this phrase and this subroutine. You'll need to rectify this issue immediately.|

When Ding tries to send the emails
Then SleepOnIt should give the following DISC results:
    |{"D": 3, "I":1, "S":1, "C":6}|
    |{"D": 3, "I":1, "S":1, "C":6}|
