'use strict';

const projects = [
  {
    id:'rebagliati', name:'Rebagliati Diplomados', category:'web', label:'Plataforma educativa',
    subtitle:'Educación conectada, gestión más simple.',
    description:'Participé en la construcción de su web, aula virtual y ERP administrativo para acercar la formación a los estudiantes y facilitar la gestión del equipo.',
    image:'assets/rebagliati.webp', imageAlt:'Vista del sitio web público de Rebagliati Diplomados',
    url:'https://rebagliatidiplomados.edu.pe/', domain:'rebagliatidiplomados.edu.pe',
    color:'#193147', badge:'DESARROLLO EN EQUIPO',
    tags:['Web pública','Aula virtual','ERP administrativo'],
    overviewLabel:'Lo que construimos', approachLabel:'Beneficios', sourceLabel:'Ver sitio web',
    overviewSections:[
      {title:'Web pública', description:'Un sitio para presentar la oferta educativa y ayudar a los visitantes a encontrar su próxima formación.'},
      {title:'Aula virtual', description:'Un espacio de aprendizaje que reúne los contenidos y facilita el acceso de los estudiantes a su formación.'},
      {title:'ERP administrativo', description:'Un sistema para organizar la gestión académica y administrativa desde un mismo lugar.'}
    ],
    benefitSections:[
      {title:'Para los estudiantes', description:'Una experiencia más sencilla para conocer las opciones de estudio y acceder a sus contenidos de aprendizaje.'},
      {title:'Para el equipo', description:'Una gestión más organizada y procesos más claros para facilitar el trabajo diario.'}
    ],
    stack:['Acceso sencillo','Gestión organizada','Experiencia clara'],
    note:'Desarrollo en equipo. La imagen muestra el sitio web público de Rebagliati Diplomados.'
  },
  {
    id:'seillo', name:'Seillo', category:'mobile', label:'Aplicación móvil',
    subtitle:'Cada visita cuenta. Cada sello, también.',
    description:'Tarjetas de sellos digitales para conectar negocios y clientes, acumular visitas y canjear recompensas.',
    image:'assets/seillo-icono.jpg', url:'https://apps.apple.com/us/app/seillo/id6764853392',
    domain:'App Store · iPhone y iPad', color:'#ff6500', badge:'APP STORE',
    tags:['Fidelización','Sellos digitales','Recompensas'],
    context:'Seillo reúne programas de fidelización en el móvil: los clientes acumulan sellos y los negocios gestionan sus tarjetas y premios.',
    experience:'Descubrir negocios, consultar sellos y canjear premios. Para los comercios, crear campañas, enviar notificaciones y revisar la actividad de sus clientes.',
    challenge:'Hacer que sumar una visita y consultar una recompensa sean acciones rápidas y comprensibles para clientes y negocios.',
    approach:'Priorizaría el progreso de cada tarjeta, un escaneo sencillo y estados claros para los premios. Después, organizaría las campañas y métricas del negocio.',
    stack:['Experiencia móvil','Tarjetas digitales','Panel de negocio'],
    screenshots:[
      {src:'assets/seillo-1.jpg',alt:'Panel de negocio de Seillo con sellos, clientes y canjes',caption:'Panel de negocio'},
      {src:'assets/seillo-2.jpg',alt:'Personalización de una tarjeta de sellos en Seillo',caption:'Tarjetas personalizables'},
      {src:'assets/seillo-3.jpg',alt:'Creación de una campaña de doble sello en Seillo',caption:'Campañas y promociones'},
      {src:'assets/seillo-4.jpg',alt:'Recordatorios automáticos para clientes en Seillo',caption:'Automatizaciones'},
      {src:'assets/seillo-5.jpg',alt:'Pantalla de análisis de clientes de Seillo',caption:'Análisis de clientes'}
    ]
  }
];

const icon = name => `<svg aria-hidden="true"><use href="#${name}"/></svg>`;
const grid = document.querySelector('#project-grid');
grid.innerHTML = projects.map(p=>`<article class="project-card reveal" data-category="${p.category}" style="--project-bg:${p.color}">
  <div class="project-image-button">
    <span class="image-topline"><span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>${p.domain}</span></span>
    ${p.screenshots ? `<div class="app-preview"><div class="app-preview-brand"><img class="app-icon" src="${p.image}" alt="Icono de ${p.name}" width="512" height="512" loading="lazy"><strong>${p.name}</strong><span>iPhone · iPad</span></div>${p.screenshots.slice(0,2).map(s=>`<img class="app-screen" src="${s.src}" alt="${s.alt}" width="221" height="480" loading="lazy">`).join('')}</div>` : `<img src="${p.image}" alt="${p.imageAlt || `Captura de referencia de ${p.name}`}" width="640" height="360" loading="lazy">`}
  </div>
  <div class="project-body"><div class="project-meta"><span class="project-category">${p.label.toUpperCase()}</span><span>${p.badge || 'REFERENCIA VISUAL'}</span></div>
    <h3 class="project-heading"><button class="project-title" data-project="${p.id}" aria-label="Ver detalle de ${p.name}">${p.name}<span>${icon('arrow-up')}</span></button></h3>
    <p class="project-subtitle">${p.subtitle}</p><p class="project-description">${p.description}</p>
    <div class="project-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>
    <div class="project-footer"><span class="project-action" aria-hidden="true">Explorar proyecto ${icon('arrow-right')}</span></div>
  </div></article>`).join('');

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (!window.gsap && !reducedMotion.matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
  },{threshold:.07});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
reducedMotion.addEventListener('change',event=>{if(event.matches)document.documentElement.classList.remove('js-motion');});

const nav = document.querySelector('.nav-pill');
const links = [...nav.querySelectorAll('a')];
const navIndicator = document.querySelector('.nav-indicator');
const sections = links.map(link=>document.querySelector(link.hash));
let activeLink = links[0];
function setActiveLink(link) {
  if(!link)return;
  activeLink=link;
  links.forEach(item=>{
    item.classList.toggle('active',item===link);
    if(item===link)item.setAttribute('aria-current','location');else item.removeAttribute('aria-current');
  });
  const inset = parseFloat(getComputedStyle(nav).paddingLeft);
  const indicator = {width:link.offsetWidth,height:link.offsetHeight,x:link.offsetLeft-inset};
  if(window.gsap) {
    gsap.to(navIndicator,{...indicator,duration:reducedMotion.matches?0:.45,ease:'power3.out',overwrite:true});
  } else {
    navIndicator.style.width=indicator.width+'px';
    navIndicator.style.height=indicator.height+'px';
    navIndicator.style.transform='translateX('+indicator.x+'px)';
  }
}
let scrollQueued=false;
function updateScroll() {
  let current=sections[0];
  const line=scrollY+Math.min(innerHeight*.32,230);
  sections.forEach(section=>{if(section.offsetTop<=line)current=section;});
  if(innerHeight+scrollY>=document.documentElement.scrollHeight-25)current=sections.at(-1);
  const link=links.find(item=>item.hash===`#${current.id}`);
  if(link!==activeLink)setActiveLink(link);
  const maximum=document.documentElement.scrollHeight-innerHeight;
  document.querySelector('.reading-progress').style.transform=`scaleX(${maximum>0?scrollY/maximum:0})`;
  scrollQueued=false;
}
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll);}},{passive:true});
window.addEventListener('resize',()=>{setActiveLink(activeLink);updateScroll();});
document.fonts.ready.then(()=>{setActiveLink(activeLink);updateScroll();});
setActiveLink(activeLink);

const themeButton=document.querySelector('.theme-button');
function refreshThemeButton() {
  const light=document.documentElement.dataset.theme==='light';
  themeButton.setAttribute('aria-label',`Activar modo ${light?'oscuro':'claro'}`);
  themeButton.setAttribute('title',`Activar modo ${light?'oscuro':'claro'}`);
  themeButton.innerHTML=icon(light?'moon':'sun');
  document.querySelector('meta[name="theme-color"]').content=light?'#fbf9f8':'#0b0d12';
}
themeButton.addEventListener('click',()=>{
  const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
  document.documentElement.dataset.theme=theme;
  try{localStorage.setItem('david-portfolio-theme-warm',theme);}catch{}
  refreshThemeButton();
});
refreshThemeButton();

const projectDialog=document.querySelector('#project-dialog');
const detailTabs=[...document.querySelectorAll('[data-detail]')];
let selectedProject=projects[0];
function renderDetailTab(tabName,focus=false) {
  const p=selectedProject;
  const overview=tabName==='overview';
  const panel=document.querySelector('#detail-panel');
  const content = overview
    ? p.overviewSections || [{title:'El contexto',description:p.context},{title:'La experiencia',description:p.experience}]
    : p.benefitSections || [{title:'El reto a resolver',description:p.challenge},{title:'Mi enfoque propuesto',description:p.approach}];
  panel.innerHTML=`<div class="detail-columns ${content.length===3?'three-columns':''}">${content.map(item=>`<div><h3>${item.title}</h3><p>${item.description}</p></div>`).join('')}</div><div class="detail-points">${(overview?p.tags:p.stack).map(t=>`<span>${t}</span>`).join('')}</div>`;
  detailTabs.forEach(tab=>{
    const selected=tab.dataset.detail===tabName;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;
    if(selected&&focus)tab.focus();
  });
  panel.setAttribute('aria-labelledby',`detail-${tabName}`);
}
detailTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>renderDetailTab(tab.dataset.detail));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight'||event.key==='ArrowLeft')next=1-index;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=1;
    if(next!==undefined){event.preventDefault();renderDetailTab(detailTabs[next].dataset.detail,true);}
  });
});
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  selectedProject=projects.find(p=>p.id===button.dataset.project);
  document.querySelector('#dialog-title').textContent=selectedProject.name;
  document.querySelector('#dialog-category').textContent=selectedProject.label.toUpperCase();
  document.querySelector('#dialog-description').textContent=selectedProject.description;
  const image=document.querySelector('#dialog-image');image.src=selectedProject.image;image.alt=selectedProject.imageAlt || `Captura de referencia de ${selectedProject.name}`;
  projectDialog.classList.toggle('is-app',Boolean(selectedProject.screenshots));
  if(selectedProject.screenshots)image.alt=`Icono de ${selectedProject.name}`;
  document.querySelector('.dialog-picture > span').textContent=selectedProject.badge || 'REFERENCIA VISUAL';
  const gallery=document.querySelector('#project-gallery');
  gallery.hidden=!selectedProject.screenshots;
  gallery.innerHTML=selectedProject.screenshots ? `<h3>La app por dentro</h3><p>Capturas oficiales de App Store. Desliza para verlas todas.</p><div class="app-gallery" tabindex="0" role="region" aria-label="Capturas de Seillo">${selectedProject.screenshots.map(s=>`<figure><img src="${s.src}" alt="${s.alt}" width="221" height="480" loading="lazy"><figcaption>${s.caption}</figcaption></figure>`).join('')}</div>` : '';
  document.querySelector('.dialog-picture').style.background='var(--surface-raised)';
  const source=document.querySelector('#dialog-source');source.href=selectedProject.url;
  source.innerHTML=`${selectedProject.sourceLabel || (selectedProject.screenshots?'Ver en App Store':'Visitar referencia')} ${icon('arrow-up')}`;
  document.querySelector('#detail-overview').textContent=selectedProject.overviewLabel || 'El producto';
  document.querySelector('#detail-approach').textContent=selectedProject.approachLabel || 'Cómo lo abordaría';
  document.querySelector('.dialog-reference').textContent=selectedProject.note || (selectedProject.screenshots
    ? 'Información e imágenes de la ficha oficial de Seillo en App Store. Desarrollador publicado: Joshua Ferreyra.'
    : 'Proyecto de referencia incluido para visualizar el portafolio.');
  renderDetailTab('overview');
  projectDialog.showModal();projectDialog.scrollTop=0;
}));

document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const rect=dialog.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
  });
});
document.querySelector('#year').textContent=new Date().getFullYear();
