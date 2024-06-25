'use strict';

{
  const iframe = document.createElement('iframe');
  iframe.style = `
    display:none;
  `;
  iframe.src = chrome.runtime.getURL('/iframe/iframe.html');
  iframe.id = 'quixy_ocr_iframe';
  document.body.appendChild(iframe);
}
