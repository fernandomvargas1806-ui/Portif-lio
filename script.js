(function(){
  var img=document.getElementById('foto'),ph=document.getElementById('ph'),inp=document.getElementById('file');
  function show(src){img.src=src;img.hidden=false;ph.hidden=true;}
  if(img.getAttribute('src')&&!img.hidden){ph.hidden=true;}
  try{var s=localStorage.getItem('foto');if(s)show(s);}catch(e){}
  inp.addEventListener('change',function(){
    var f=inp.files[0];if(!f)return;
    var r=new FileReader();
    r.onload=function(){
      var im=new Image();
      im.onload=function(){
        var k=Math.min(1,900/Math.max(im.width,im.height)),c=document.createElement('canvas');
        c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);
        c.getContext('2d').drawImage(im,0,0,c.width,c.height);
        var d=c.toDataURL('image/jpeg',.85);show(d);
        try{localStorage.setItem('foto',d);}catch(e){}
      };
      im.src=r.result;
    };
    r.readAsDataURL(f);
  });

  var links=[].slice.call(document.querySelectorAll('#menu a'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'));});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id);});}
      });
    },{rootMargin:'-35% 0px -60% 0px'});
    secs.forEach(function(s){io.observe(s);});
  }
})();
