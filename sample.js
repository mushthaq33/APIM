const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = github.context.payload
  const actionTrigerred = payload.action
  const issueUrl = payload.issue.html_url
  const labelName = payload.label.name
  
  console.log(`The latest label added: ${labelName}`);
  
  if (labelName == "Priority/Critical(P1)") {
    console.log(`An issue has been labeled as priority level critical (P1). Please attend immediately!!!\n URL: ${issueUrl}`);
  } else if (labelName == "Priority/High(P2)")  {
    console.log(`An issue has been labeled as priority level hight (P2). Please attend!!!\n URL: ${issueUrl}`);
  } else if (labelName == "Priority/Medium(P3)") {
    console.log(`An issue has been labeled as priority level medium (P3). Please attend!!!\n URL: ${issueUrl}`);
  }
  
} catch (error) {
  core.setFailed(error.message);
}
