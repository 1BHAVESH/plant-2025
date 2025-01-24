(async function () {
  if(!window.affiliateryMainJsUrl){await new Promise(res => {setTimeout(() => {res()}, 1000)})}
  if(!window.affiliateryMainJsUrl){
    window.affiliateryMainJsUrl=`https://s1.staq-cdn.com/affiliatery/api/js/main.js?sId=${encodeURIComponent(Shopify.shop)}&v=${new Date().valueOf()}&cfs=skip`;
  }

  if(!window.affiliateryMainJsUrl){await new Promise(res => {setTimeout(() => {res()}, 100)})}
  let mainJsScriptTag = document.createElement('script');
  mainJsScriptTag.src = window.affiliateryMainJsUrl;
  mainJsScriptTag.async = true;
  document.getElementsByTagName('head')[0].appendChild(mainJsScriptTag);
})()
