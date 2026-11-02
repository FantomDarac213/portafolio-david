'use strict';
try {
  const theme = localStorage.getItem('david-portfolio-theme-warm');
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
} catch {}
