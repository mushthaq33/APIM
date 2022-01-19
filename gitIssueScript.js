const https = require('https');
var request = require('sync-request');

var today = new Date();
var lastWeekStartDay = new Date();
lastWeekStartDay.setDate(today.getDate() - 7);
var lastWeekEndDay = new Date();
lastWeekEndDay.setDate(today.getDate() - 1);
var lastWeekStartDayStr = lastWeekStartDay.toISOString().slice(0,10);
var lastWeekEndDayStr = lastWeekEndDay.toISOString().slice(0,10);
var dateRange = lastWeekStartDayStr + ".." + lastWeekEndDayStr;

var productAPIM = {
    name: "APIM",
    title: "----API Manager----",
    closedUrl : "https://api.github.com/search/issues?q=repo:wso2/product-apim+type:issue+state:closed+closed%3A" + dateRange,
    openedUrl : "https://api.github.com/search/issues?q=repo:wso2/product-apim+type:issue+created%3A" + dateRange,
    totalUrl : "https://api.github.com/search/issues?q=repo:wso2/product-apim+type:issue+state:open"
}

var productMI = {
    name: "MI",
    title: "----Micro Integrator----",
    closedUrl: "https://api.github.com/search/issues?q=repo:wso2/micro-integrator+type:issue+state:closed+closed%3A" + dateRange,
    openedUrl: "https://api.github.com/search/issues?q=repo:wso2/micro-integrator+type:issue+created%3A" + dateRange,
    totalUrl: "https://api.github.com/search/issues?q=repo:wso2/micro-integrator+type:issue+state:open"
}

var productIntStudio = {
    name: "IntStudio",
    title: "----Integration Studio----",
    closedUrl: "https://api.github.com/search/issues?q=repo:wso2/integration-studio+type:issue+state:closed+closed%3A" + dateRange,
    openedUrl: "https://api.github.com/search/issues?q=repo:wso2/integration-studio+type:issue+created%3A" + dateRange,
    totalUrl: "https://api.github.com/search/issues?q=repo:wso2/integration-studio+type:issue+state:open"
}

console.log("========== APIM: " + JSON.stringify(productAPIM));
console.log("========== MI: " + JSON.stringify(productMI));
console.log("========== Intigration Studio: " + JSON.stringify(productIntStudio));

var optionsGet = {
    headers: {
        'user-agent': 'node.js',
    }
};

function getIssueStats(product) {
    var txtOutput = product.title + "\n";
    var totalIssues = getCountFromGit(product.totalUrl);
    var openIssues = getCountFromGit(product.openedUrl);
    var closedIssues = getCountFromGit(product.closedUrl);
    txtOutput = txtOutput + "Total: " + totalIssues + "\n";
    txtOutput = txtOutput + "Created: " + openIssues + "\n";
    txtOutput = txtOutput + "Closed: " + closedIssues + "\n";
    return txtOutput;
}

function getCountFromGit(url) {
    var res = request('GET', url, optionsGet);
    var totalCount = JSON.parse(res.getBody('utf8')).total_count;
    return totalCount;
}

function postWebhook(textMsg) {
    var webhookUrl = 'https://chat.googleapis.com/v1/spaces/AAAAdxwFenw/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=3h2Wv7IOFE97jFk4mpCMrcJnfn2Sq1jpvic9yyPzcZE%3D';
    //var webhookUrl = 'https://chat.googleapis.com/v1/spaces/AAAA7KUbG2g/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=VSHdFhA8DfkarEjT9EfAR-nQEwgKWNcVp9AP3eSd5UU%3D';
    //var webhookUrl = 'https://chat.googleapis.com/v1/spaces/AAAAeadLB7U/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=bhACw8ChdhOc-SP4vVhF_ZyU_sWyCi1ciGQY8NlUul4%3D';
    var res = request('POST', webhookUrl, {
        json: {
                text: textMsg, 
              },
    });
    var responseMsg = res.getBody('utf8');
    console.log("=======Response Log======== " + responseMsg);
}

var textMsg = "*GIT issue status during last week (" + lastWeekStartDayStr + " - " + lastWeekEndDayStr + ")*\n";
textMsg = textMsg + getIssueStats(productAPIM);
textMsg = textMsg + getIssueStats(productMI);
textMsg = textMsg + getIssueStats(productIntStudio);
console.log("=======Final Log======== " + textMsg);
postWebhook(textMsg);
