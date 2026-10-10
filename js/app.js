document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('menuToggle');
  if (toggle && sidebar) toggle.addEventListener('click', () => sidebar.classList.toggle('open'));

  const profile = safeRead('placeready_profile', {});
  const name = profile.fullName || 'Student';
  document.querySelectorAll('#topStudentName').forEach(el => el.textContent = name);
  document.querySelectorAll('#avatarInitial').forEach(el => el.textContent = name.trim().charAt(0).toUpperCase() || 'S');
  const welcome = document.getElementById('welcomeTitle');
  if (welcome) welcome.textContent = `Welcome back, ${name}! 👋`;

  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    for (const [key, value] of Object.entries(profile)) {
      const field = profileForm.elements.namedItem(key);
      if (field && typeof value === 'string') field.value = value;
    }
    profileForm.addEventListener('submit', event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(profileForm).entries());
      data.fullName = data.fullName.trim();
      data.email = data.email.trim();
      if (!data.fullName || !data.email) return showMessage('profileMessage', 'Please complete the required fields.', true);
      safeWrite('placeready_profile', data);
      showMessage('profileMessage', 'Profile saved successfully in this browser.');
      document.querySelectorAll('#topStudentName').forEach(el => el.textContent = data.fullName);
      document.querySelectorAll('#avatarInitial').forEach(el => el.textContent = data.fullName.charAt(0).toUpperCase());
    });
    profileForm.addEventListener('reset', () => setTimeout(() => showMessage('profileMessage', ''), 0));
  }

  const reset = document.getElementById('resetData');
  if (reset) reset.addEventListener('click', () => {
    if (confirm('Reset all PlaceReady data saved in this browser? This cannot be undone.')) {
      Object.keys(localStorage).filter(key => key.startsWith('placeready_')).forEach(key => localStorage.removeItem(key));
      showMessage('resetMessage', 'PlaceReady data has been cleared.');
      setTimeout(() => location.reload(), 500);
    }
  });
});

function safeRead(key, fallback) {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
}
function safeWrite(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}
function showMessage(id, message, isError = false) {
  const el = document.getElementById(id);
  if (el) { el.textContent = message; el.style.color = isError ? '#bd3636' : '#159b72'; }
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js")
      .then(() => console.log("PlaceReady offline support enabled"))
      .catch(error => console.error("Service worker error:", error));
  });
}