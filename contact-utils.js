(function (root) {
  'use strict';
  function buildContactLinks({ name, email, subject, message }) {
    const body = `Hola David, soy ${name.trim()}.\n\n${subject}\n\n${message.trim()}\n\nMi correo: ${email.trim()}`;
    return {
      whatsapp: `https://wa.me/51918816413?text=${encodeURIComponent(body)}`,
      email: `mailto:davandre456@gmail.com?subject=${encodeURIComponent(subject + ' — ' + name.trim())}&body=${encodeURIComponent(body)}`
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { buildContactLinks };
  else root.portfolioContact = { buildContactLinks };
})(typeof window !== 'undefined' ? window : this);
