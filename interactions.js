'use strict';

// GSAP mejora la presentación; el contenido sigue visible si la librería no carga.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const motion = gsap.matchMedia();
  // Una sola fila compacta. El duplicado permite un movimiento continuo sin saltos.
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    const viewport = document.querySelector('#tools-viewport');
    const rail = viewport.querySelector('.tools-rail');
    const original = rail.querySelector('.tools-track');
    const duplicate = original.cloneNode(true);
    duplicate.setAttribute('aria-hidden', 'true');
    duplicate.inert = true;
    rail.append(duplicate);
    const pauseButton = document.querySelector('.tools-pause');
    pauseButton.hidden = false;
    viewport.classList.add('is-moving');
    let tween;
    let manuallyPaused = false;
    let hovered = false;
    let focused = false;
    let inView = false;
    const sync = () => {
      if (!tween) return;
      tween.paused(manuallyPaused || hovered || focused || !inView || document.hidden);
    };
    const measure = () => {
      const progress = tween ? tween.progress() : 0;
      if (tween) tween.kill();
      const distance = original.getBoundingClientRect().width + 14;
      tween = gsap.fromTo(rail, { x: 0 }, { x: -distance, duration: distance / 40, ease: 'none', repeat: -1, paused: true });
      tween.progress(progress);
      sync();
    };
    const enter = event => { if (event.pointerType !== 'touch') { hovered = true; sync(); } };
    const leave = () => { hovered = false; sync(); };
    const focus = () => { focused = true; sync(); };
    const blur = () => { focused = false; sync(); };
    const toggle = () => {
      manuallyPaused = !manuallyPaused;
      pauseButton.setAttribute('aria-pressed', String(manuallyPaused));
      pauseButton.setAttribute('aria-label', `${manuallyPaused ? 'Reanudar' : 'Pausar'} movimiento de herramientas`);
      pauseButton.title = `${manuallyPaused ? 'Reanudar' : 'Pausar'} movimiento`;
      pauseButton.innerHTML = manuallyPaused
        ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 5 10 7-10 7Z"/></svg>'
        : '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 5v14M15 5v14"/></svg>';
      sync();
    };
    viewport.addEventListener('pointerenter', enter);
    viewport.addEventListener('pointerleave', leave);
    viewport.addEventListener('focusin', focus);
    viewport.addEventListener('focusout', blur);
    pauseButton.addEventListener('click', toggle);
    document.addEventListener('visibilitychange', sync);
    const intersection = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); });
    intersection.observe(viewport);
    const resize = new ResizeObserver(measure);
    resize.observe(original);
    measure();
    return () => {
      tween?.kill();
      resize.disconnect();
      intersection.disconnect();
      duplicate.remove();
      viewport.classList.remove('is-moving');
      pauseButton.hidden = true;
      pauseButton.setAttribute('aria-pressed', 'false');
      pauseButton.setAttribute('aria-label', 'Pausar movimiento de herramientas');
      pauseButton.title = 'Pausar movimiento';
      pauseButton.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 5v14M15 5v14"/></svg>';
      gsap.set(rail, { clearProps: 'transform' });
      viewport.removeEventListener('pointerenter', enter);
      viewport.removeEventListener('pointerleave', leave);
      viewport.removeEventListener('focusin', focus);
      viewport.removeEventListener('focusout', blur);
      pauseButton.removeEventListener('click', toggle);
      document.removeEventListener('visibilitychange', sync);
    };
  });
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray('.reveal').forEach(element => {
      gsap.from(element, {
        y: 26, autoAlpha: 0, duration: .75, ease: 'power3.out', clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: element, start: 'top 94%', once: true }
      });
    });
    gsap.from('.tools-carousel', {
      y: 20, autoAlpha: 0, duration: .7, ease: 'power3.out', clearProps: 'transform,opacity,visibility',
      scrollTrigger: { trigger: '.tools-carousel', start: 'top 93%', once: true }
    });
    gsap.from('.process-stage', {
      y: 22, autoAlpha: 0, duration: .7, stagger: .12, ease: 'power3.out', clearProps: 'transform,opacity,visibility',
      scrollTrigger: { trigger: '.process-flow', start: 'top 88%', once: true }
    });
    gsap.from('.scene-float', {
      y: 12, duration: 1.2, stagger: .13, ease: 'elastic.out(1,.7)', clearProps: 'transform',
      scrollTrigger: { trigger: '.process-flow', start: 'top 80%', once: true }
    });
    gsap.from('.contact-simple', {
      y: 24, autoAlpha: 0, duration: .8, stagger: .14, ease: 'power3.out', clearProps: 'transform,opacity,visibility',
      scrollTrigger: { trigger: '.contact-simple', start: 'top 90%', once: true }
    });
    gsap.utils.toArray('.service-visual').forEach(visual => {
      gsap.from(visual.querySelector('.visual-note'), {
        y: 18, scale: .96, opacity: 0, duration: .8, ease: 'back.out(1.6)', clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: visual, start: 'top 85%', once: true }
      });
    });
  });
  // Hover solo para ratón; en móvil no hay estados que se queden activados.
  motion.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
    const cleanups = [];
    document.querySelectorAll('.tech-chip, .process-art').forEach(element => {
      const enter = () => gsap.to(element, { y: -5, duration: .3, ease: 'power2.out', overwrite: 'auto' });
      const leave = () => gsap.to(element, { y: 0, duration: .4, ease: 'power2.out', overwrite: 'auto' });
      element.addEventListener('mouseenter', enter);
      element.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        element.removeEventListener('mouseenter', enter);
        element.removeEventListener('mouseleave', leave);
        gsap.killTweensOf(element);
        gsap.set(element, { clearProps: 'transform' });
      });
    });
    return () => cleanups.forEach(cleanup => cleanup());
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
