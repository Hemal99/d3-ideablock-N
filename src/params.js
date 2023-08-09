const LOCAL_PARAMS = {
  apiBuildURL: '/localApiProxy/scaffold/dmbTest',
  apiAuthKey: 'x',
  apiAuthSecret: 'x',
  customerName: 'John',
}

let params;
if (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1') || window.location.href.startsWith('file://')) {
  params = LOCAL_PARAMS;
} else {
  const paramsText = document.getElementById('injectedVars').innerText;
  params = JSON.parse(paramsText);
}

export default params;