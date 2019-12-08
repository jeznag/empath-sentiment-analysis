export default [
  {
    codeReviewMessage: `(style) why not format this normally, as is already done in functions below?`,
    expectedScore: -1
  },
  {
    codeReviewMessage: `can you remove this?`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `have we got sufficient new tests to make up for the deleted tests?`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `can you add a comment explaining this approach?`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `I don’t think your test would cover every branch of the code. You could write a unit test as well now that you’ve broken down the monolith into smaller functions that are testable in isolation.`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `spelling mistake in existing and consolidation. Comment is also not useful as it explains what the code does without explaining why it does it.
A better comment would be something like:`,
    expectedScore: -1
  },
  {
    codeReviewMessage: `I suggest you learn how to use map and reduce. forEach is not a functional programming approach. Have a look at the code snippet I sent.`,
    expectedScore: -4
  },
  {
    codeReviewMessage:
      "OMG, So What? Framework accomplish that for every type. The batterylog it's single object. There's not many objects to send. It is 1 and one only! Look at mini volts. It's string separated with `,` and that are your batched logs. Please familiarise yourself with the product.",
    expectedScore: -12
  },
  {
    codeReviewMessage: `not a great name`,
    expectedScore: -3
  },
  {
    codeReviewMessage: `Why not use Number.isNaN?`,
    expectedScore: -1
  },
  {
    codeReviewMessage: `🤦‍♂️`,
    expectedScore: -10
  },
  {
    codeReviewMessage: `🤦‍♀️`,
    expectedScore: -10
  },
  // Courtesy of https://blog.plover.com/tech/why-dont-you.html
  {
    codeReviewMessage: `Why didn't you just use sshd?`,
    expectedScore: -6
  },
  {
    codeReviewMessage: `Why don’t you just use sshd?`,
    expectedScore: -6
  },
  {
    codeReviewMessage: `Why didn't you just use sshd? I suppose it's because you're an incompetent nitwit.`,
    expectedScore: -15
  },
  {
    codeReviewMessage: `I don't understand why you didn't use sshd`,
    expectedScore: -1
  },
  {
    codeReviewMessage: `There must be a good reason why you didn't use sshd. Surely it's because you're an incompetent nitwit.`,
    expectedScore: -7
  },
  {
    codeReviewMessage: `I'm not clever enough to understand why you didn't use sshd. It would take a fucking genius to figure that out.`,
    expectedScore: -3
  },
  {
    codeReviewMessage: `I probably would've tried using sshd here. Would that not work out?`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `can you confirm this is the output from black? I think it would have a space before the \`[]\``,
    expectedScore: 0
  },
  {
    codeReviewMessage: `is this to remove duplicates? Perhaps you could use a set https://stackoverflow.com/questions/7961363/removing-duplicates-in-lists`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `could you remove this print statement?`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `I think there would be a way to achieve this through strftime. e.g. \`report_date.strftime("%B %Y")\`
You could remove ~5 lines`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `can you delete this commented out code please?`,
    expectedScore: 1
  },
  {
    codeReviewMessage: `avoid leaving blank lines in CSS rules`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `same here. I think it might happen a few other times throughout the file. Can you remove all unnecessary blank lines?`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `hmm this is coming from facebook.com Is there no valid image on the website?`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `I think it should be \`DEBTOR DAYS\` rather than \`DEBTORS\``,
    expectedScore: 0
  },
  {
    codeReviewMessage: `Mostly looking good. A few tweaks needed`,
    expectedScore: 3
  },
  {
    codeReviewMessage: `best not to log credentials`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `You can make this more concise without affecting readability: return req.headers.authorization === FOXTEL_TOKEN;`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `this is an unclear method name. https://github.com/ryanmcdermott/clean-code-javascript#function-names-should-say-what-they-do`,
    expectedScore: -1
  },
  {
    codeReviewMessage: `other methods await the request. Suggest you follow the same pattern`,
    expectedScore: -1
  },
  {
    codeReviewMessage: `204 does not make sense. It is only used when there is no content`,
    expectedScore: -2
  },
  {
    codeReviewMessage: `Why is the endpoint media/request? Did the client request this name? It's not meaningful or RESTful in my opinion.`,
    expectedScore: -5
  },
  {
    codeReviewMessage: `you've now broken the API (forgot return)`,
    expectedScore: -1
  },
  {
    codeReviewMessage: `incorrect spelling of immediate`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `I don't like hardcoding values. It would be better to generate the filters based on the data present in the list.`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `this is not DRY. https://en.wikipedia.org/wiki/Don%27t_repeat_yourself`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `don't commit secrets to source control`,
    expectedScore: -2
  },
  {
    codeReviewMessage: `not sure why this appears as a new file. Can you make sure you've rebased against master?`,
    expectedScore: -1
  },
  {
    codeReviewMessage: `can you add a .prettierrc and change quotes to single quote?`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `prefer template string`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `looks like prettier wasn't run here`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `I'd rather not hardcode these values. It should only show values in the dropdown that actually exist in the dataset. You can programatically generate the filter values based on the data.`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `delete commented out code`,
    expectedScore: 0
  },
  {
    codeReviewMessage: `e doesn't exist`,
    expectedScore: 0
  }
];
