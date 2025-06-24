chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "injectApp") {
    sendResponse({
      scriptUrl: chrome.runtime.getURL("dist/ahoylove.js"), // adjust path if needed
    });
  }
});
