

// Prevent re-injection
if (!document.getElementById('ahoylove-button')) {
  const button = document.createElement("button");
  button.id = 'ahoylove-button';
  button.innerText = "AhoyLove";

  button.className = `
    fixed z-50 bottom-6 right-6 
    bg-indigo-700 text-white 
    hover:bg-indigo-600 
    px-4 py-2 rounded-full 
    shadow-lg 
    font-semibold text-sm 
    transition-all duration-300
  `.replace(/\s+/g, ' ');

  button.onclick = () => {
    // Don't inject again if already open
    if (document.getElementById('ahoylove-container')) return;

    const container = document.createElement('div');
    container.id = 'ahoylove-container';
    container.style = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: white;
      z-index: 10000;
    `;

    document.body.appendChild(container);

    const root = document.createElement('div');
    root.id = 'root';
    container.appendChild(root);

    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('assets/index-CkpMcIHW.js'); 
    script.type = 'module';
    document.body.appendChild(script);
  };

  document.body.appendChild(button);
}

