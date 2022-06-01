const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');
var request = require('sync-request');

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = github.context.payload
  const actionTrigerred = payload.action
  const issueUrl = payload.issue.html_url
  const labelName = payload.label.name
  var text = ""
  
  console.log(`The latest label added: ${labelName}`);
  
  if (labelName == "Priority/Critical(P1)") {
    console.log(`An issue has been labeled as priority level critical (P1). Please attend immediately!!!\n URL: ${issueUrl}`);
    text = "An issue has been labeled as priority level critical (P1). Please attend immediately!!!\n URL: " + issueUrl
  } else if (labelName == "Priority/High(P2)")  {
    console.log(`An issue has been labeled as priority level hight (P2). Please attend!!!\n URL: ${issueUrl}`);
    text = "An issue has been labeled as priority level hight (P2). Please attend!!!\n URL: " + issueUrl
  } else if (labelName == "Priority/Medium(P3)") {
    console.log(`An issue has been labeled as priority level medium (P3). Please attend!!!\n URL: ${issueUrl}`);
    text = "An issue has been labeled as priority level medium (P3). Please attend!!!\n URL: " + issueUrl
  }
  
  function postWebhook(textMsg) {
    var webhookUrl = 'https://chat.googleapis.com/v1/spaces/AAAAzwUSt7Q/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=cQDo2C7S5sIezfKpxGiKHBayjK9VOYj3Ae0ohyY3OxE%3D';
    var res = request('POST', webhookUrl, {
        json: {
                text: textMsg, 
              },
    });
    var responseMsg = res.getBody('utf8');
    console.log("=======Response Log======== " + responseMsg);
}
if (text != "") {
  postWebhook(text);
}
  
} catch (error) {
  core.setFailed(error.message);
}
