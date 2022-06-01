const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = github.context.payload
  const actionTrigerred = payload.action
  const issueUrl = payload.issue.html_url
  const labelsJsonArr = payload.issue.labels
  var latestLabel = ""
  
  if (labelsJsonArr.length > 0) {
    latestLabel = labelsJsonArr[labelsJsonArr.length - 1].name
  }
  
  console.log(`The latest label added: ${latestLabel}`);
  const arrPay = JSON.stringify(labelsJsonArr, undefined, 2)
  console.log(`The latest label added: ${arrPay}`);
  if (actionTrigerred == "opened") {
    if (latestLabel == "Priority/Critical(P1)") {
      console.log(`A priority level critical (P1) issue has been opened. Please attend immediately!!!\n URL: ${issueUrl}`);
    } else if (latestLabel == "Priority/High(P2)")  {
      console.log(`A priority level high (P2) issue has been opened. Please attend!!!\n URL: ${issueUrl}`);
    } else if (latestLabel == "Priority/Medium(P3)") {
      console.log(`A priority level medium (P3) issue has been opened. Please attend!!!\n URL: ${issueUrl}`);
    }
  } else if (actionTrigerred == "labeled") {
    if (latestLabel == "Priority/Critical(P1)") {
      console.log(`An issue has been labeled as priority level critical (P1). Please attend immediately!!!\n URL: ${issueUrl}`);
    } else if (latestLabel == "Priority/High(P2)")  {
      console.log(`An issue has been labeled as priority level hight (P2). Please attend!!!\n URL: ${issueUrl}`);
    } else if (latestLabel == "Priority/Medium(P3)") {
      console.log(`An issue has been labeled as priority level medium (P3). Please attend!!!\n URL: ${issueUrl}`);
    }
  }
  
} catch (error) {
  core.setFailed(error.message);
}
