// ahoyLoveWidget.js

function handleInjection(scriptUrl) {
  if (document.getElementById('ahoylove-container')) return;

  const container = document.createElement('div');
  container.id = 'ahoylove-container';
  container.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: white !important;
    z-index: 2147483646 !important;
    display: block !important;
  `;

  const root = document.createElement('div');
  root.id = 'root';
  container.appendChild(root);
  document.body.appendChild(container);

  const script = document.createElement('script');
  script.src = scriptUrl;
  script.type = "module";

  script.onerror = () => {
    console.error('Failed to load AhoyLove script');
    container.remove();
  };

  document.head.appendChild(script);

  container.addEventListener('click', (e) => {
    if (e.target === container) {
      container.remove();
    }
  });
}

// Floating Button
if (!document.getElementById('ahoylove-button')) {
  const button = document.createElement("button");
  button.id = 'ahoylove-button';
  button.innerText = "AhoyLove";
  button.ariaLabel = "Open Sailing Dashboard";

  button.style.cssText = `
    position: fixed !important;
    bottom: 24px !important;
    right: 24px !important;
    z-index: 2147483647 !important;
    background-color: #4338ca !important;
    color: white !important;
    padding: 10px 16px !important;
    border: none !important;
    border-radius: 9999px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    cursor: pointer !important;
    transition: background-color 0.3s ease !important;
    display: block !important;
    opacity: 1 !important;
    pointer-events: auto !important;
  `;

  button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = '#4f46e5';
  });
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = '#4338ca';
  });

  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "injectApp" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Extension error:', chrome.runtime.lastError);
        return;
      }
      const cleanScriptUrl = chrome.runtime.getURL("ahoylove.js");
      handleInjection(cleanScriptUrl);
    });
  });


  document.body.appendChild(button);
}

// Inject listener for runtime message
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "injectAppResponse" && message.scriptUrl) {
    handleInjection(message.scriptUrl);
  }
});

// ✅ postMessage Communication Handler
window.addEventListener("message", async (event) => {
  if (event.source !== window || !event.data || !event.data.type) return;

  const { type, payload } = event.data;

  switch (type) {
    case "GET_USER_SETTINGS":
      chrome.storage.local.get(["userSettings"], (result) => {
        window.postMessage({
          type: "USER_SETTINGS_RESPONSE",
          payload: result.userSettings || null
        });
      });
      break;

    case "UPDATE_USER_SETTINGS":
      chrome.storage.local.set({ userSettings: payload }, () => {
        console.log("User settings updated.");
        window.postMessage({
          type: "USER_SETTINGS_UPDATED",
          payload
        });
      });
      break;

    default:
      break;
  }
});
