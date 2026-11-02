(function (root) {
  'use strict';
  function buildContactLinks({ name, email, subject, message }) {
    const body = `Hola, David:\n\nMi nombre es ${name.trim()} y me gustaría conversar contigo.\n\nAsunto: ${subject.trim()}\n\n${message.trim()}\n\nCorreo de contacto: ${email.trim()}\n\nGracias por tu tiempo.`;
    const emailSubject = `${subject.trim()} — ${name.trim()}`;
    return {
      body,
      whatsapp: `https://wa.me/51918816413?text=${encodeURIComponent(body)}`,
      whatsappWeb: `https://web.whatsapp.com/send?phone=51918816413&text=${encodeURIComponent(body)}`,
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=davandre456%40gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`,
      email: `mailto:davandre456@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { buildContactLinks };
  else root.portfolioContact = { buildContactLinks };
})(typeof window !== 'undefined' ? window : this);
