const t=document.querySelector(".back-to-top");t.addEventListener("click",(function t(){window.pageYOffset>0&&(window.scrollBy(0,-80),setTimeout(t,0))})),window.addEventListener("scroll",(function(){const e=window.pageYOffset,o=document.documentElement.clientHeight;e>o&&t.classList.add("back-to-top--show","animate__animated","animate__heartBeat");e<o&&t.classList.remove("back-to-top--show")}));
//# sourceMappingURL=index.9fc9a7cb.js.map
