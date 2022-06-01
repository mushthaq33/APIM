const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const labelsJsonArr = github.context.payload.issue.labels
  const latestLabel = labelsJsonArr[labelsJsonArr.length - 1].name
  const payload = JSON.stringify(github.context.payload.issue.labels, undefined, 2)
  console.log(`The latest label added: ${latestLabel}`);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
