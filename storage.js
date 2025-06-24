// storage.js
export const loadSettings = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(['userSettings'], (result) => {
      resolve(result.userSettings || null);
    });
  });
};

export const saveSettings = (data) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ userSettings: data }, () => {
      resolve();
    });
  });
};
