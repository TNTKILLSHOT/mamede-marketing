"use strict";
const config = window.MAMEDE_CONFIG || {};
const phone = /^\d{10,15}$/.test(config.whatsapp || "") ? config.whatsapp : "";
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || "") ? config.email : "";
document.querySelector("#year").textContent = new Date().getFullYear();
const contacts = document.querySelector("#direct-contact");
for (const [label, url] of [["Conversar no WhatsApp", phone ? `https://wa.me/${phone}` : ""], [email, email ? `mailto:${email}` : ""]]) {
  if (!url) continue;
  const link = document.createElement("a");
  link.textContent = label;
  link.href = url;
  contacts.append(link);
}
if (phone || email) {
  document.querySelector("#contact-note").textContent = "Fale com a Mamede pelos canais abaixo ou prepare seu briefing.";
  document.querySelector("#submit-label").textContent = phone ? "Continuar no WhatsApp" : "Continuar no e-mail";
  document.querySelector("#form-note").textContent = "Você poderá revisar e enviar o briefing no aplicativo de contato. Este site não armazena seus dados.";
}
document.querySelector("#briefing").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = data.get("name").trim();
  const company = data.get("company").trim();
  const message = data.get("message").trim();
  if (!name || !company || !message) {
    document.querySelector("#form-status").textContent = "Preencha nome, empresa e ideia com texto válido.";
    return;
  }
  const text = `Olá, Mamede Marketing!\n\nNome: ${name}\nMarca: ${company}\nInteresse: ${data.get("service") || "Orientação para escolher"}\n\nIdeia: ${message}`;
  if (phone) {
    window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  } else if (email) {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Briefing — " + company)}&body=${encodeURIComponent(text)}`;
  } else {
    const url = URL.createObjectURL(new Blob([text], {type: "text/plain;charset=utf-8"}));
    const link = document.createElement("a");
    link.href = url;
    link.download = "briefing-mamede.txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.querySelector("#form-status").textContent = "Briefing preparado para download. Nenhum dado foi enviado.";
  }
});

document.querySelectorAll('.pick').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#service').value = button.dataset.s;
  document.querySelector('#service').focus({preventScroll:true});
  document.querySelector('#contato').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
}));
const burger=document.querySelector('#burger'), nav=document.querySelector('#nav');
document.documentElement.classList.add('has-js');
function closeMenu(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Abrir menu');}
burger.addEventListener('click',()=>{const open=nav.classList.toggle('open');burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.querySelector('.header').addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();burger.focus();}});
if(phone){const wa=document.querySelector('#wa');wa.href=`https://wa.me/${phone}`;wa.hidden=false;}

const stripPause=document.querySelector('.marquee-pause');
stripPause.addEventListener('click',()=>{
  const paused=stripPause.closest('.marquee-wrap').classList.toggle('paused');
  stripPause.setAttribute('aria-pressed',String(paused));
  stripPause.setAttribute('aria-label',paused?'Retomar faixa animada':'Pausar faixa animada');
  stripPause.title=paused?'Retomar faixa':'Pausar faixa';
  stripPause.textContent=paused?'▶':'Ⅱ';
});
