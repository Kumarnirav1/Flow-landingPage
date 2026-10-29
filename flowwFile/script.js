(function(){
  var links=document.getElementById('links'),burger=document.getElementById('burger');
  function setMenu(open){links.classList.toggle('open',open);burger.setAttribute('aria-expanded',open);burger.textContent=open?'✕':'☰';}
  burger.addEventListener('click',function(){setMenu(!links.classList.contains('open'));});
  links.addEventListener('click',function(e){if(e.target.tagName==='A')setMenu(false);});

  
  document.getElementById('theme').addEventListener('click',function(){
    var r=document.documentElement,dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
    r.dataset.theme=dark?'light':'dark';
  });
  var anchors=[].slice.call(document.querySelectorAll('.links a[href^="#"]:not(.btn)'));
  var io=new IntersectionObserver(function(es){es.forEach(function(en){
    if(en.isIntersecting)anchors.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+en.target.id);});
  });},{rootMargin:'-40% 0px -55% 0px'});
  anchors.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)io.observe(s);});

  document.querySelectorAll('#faqList button').forEach(function(b){
    b.addEventListener('click',function(){
      var ans=b.nextElementSibling,open=!ans.classList.contains('open');
      document.querySelectorAll('#faqList .ans').forEach(function(a){a.classList.remove('open');});
      document.querySelectorAll('#faqList button').forEach(function(x){x.setAttribute('aria-expanded','false');x.lastElementChild.textContent='+';});
      if(open){ans.classList.add('open');b.setAttribute('aria-expanded','true');b.lastElementChild.textContent='−';}
    });
  });
  document.getElementById('form').addEventListener('submit',function(e){
    e.preventDefault();
    var v=document.getElementById('email').value.trim(),msg=document.getElementById('msg');
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){msg.textContent='Thanks! We’ll be in touch at '+v+'.';this.reset();}
    else{msg.textContent='Please enter a valid email address.';}
  });
})();
