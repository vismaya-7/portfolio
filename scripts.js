const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
$('#yr').textContent=new Date().getFullYear();

// Menu, progress bar, active link
const menu=$('#menu'),burger=$('#burger');
burger.onclick=()=>burger.setAttribute('aria-expanded',menu.classList.toggle('open'));
$$('#menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}));
addEventListener('scroll',()=>{const h=document.documentElement;$('#progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true});
const act=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#menu a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>act.observe(s));

// Gentle reveal on scroll
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.08});
$$('.sec>.content').forEach(el=>{el.classList.add('rv');rv.observe(el)});

// 3D tilt on cards (mouse only)
$$('.tilt').forEach(el=>{
  el.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||calm)return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(700px) rotateX(${-y*9}deg) rotateY(${x*9}deg) translateY(-4px)`});
  el.addEventListener('pointerleave',()=>el.style.transform='');
});

// 3D hero: a wireframe globe with orbiting threat nodes
(()=>{
  const cv=$('#gl');if(!window.THREE||!cv)return;
  const R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true}),S=new THREE.Scene(),C=new THREE.PerspectiveCamera(45,1,.1,100),G=new THREE.Group();
  C.position.z=8;S.add(G);const g=0x19e68c;
  G.add(new THREE.Mesh(new THREE.SphereGeometry(2.15,32,32),new THREE.MeshBasicMaterial({color:0x07090a})));
  G.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.2,2)),new THREE.LineBasicMaterial({color:g,transparent:true,opacity:.4})));
  const p=[];for(let i=0;i<300;i++){const t=Math.random()*6.283,f=Math.acos(2*Math.random()-1),r=2.6+Math.random()*2.2;p.push(r*Math.sin(f)*Math.cos(t),r*Math.cos(f),r*Math.sin(f)*Math.sin(t))}
  const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.Float32BufferAttribute(p,3));
  const dots=new THREE.Points(pg,new THREE.PointsMaterial({color:g,size:.06,transparent:true,opacity:.85}));G.add(dots);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(3.3,.012,8,160),new THREE.MeshBasicMaterial({color:g,transparent:true,opacity:.6}));ring.rotation.x=1.2;G.add(ring);
  let mx=0,my=0,on=true;
  addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
  const size=()=>{const w=cv.clientWidth,h=cv.clientHeight;R.setPixelRatio(Math.min(devicePixelRatio,2));R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();G.position.set(w/h>1.2?3:0,w/h>1.2?0:1.6,0);G.scale.setScalar(w/h>1.2?.9:.8)};
  size();addEventListener('resize',size);
  new IntersectionObserver(e=>{on=e[0].isIntersecting;if(on)loop()}).observe(cv);
  function loop(){if(!on)return;G.rotation.y+=.003;dots.rotation.y-=.0015;ring.rotation.z+=.004;G.rotation.x+=((my*.5)-G.rotation.x)*.04;G.position.z=mx*.4;R.render(S,C);if(!calm)requestAnimationFrame(loop)}
  loop();
})();

// My Blogs: pulled live from Medium. First 4 are shown, the rest appear under "Show more".
const mediumRSS = "https://medium.com/feed/@vismayav";
fetch(`https://api.rss2json.com/v1/api.json?rss_url=${mediumRSS}`)
    .then(r => r.json())
    .then(data => {
        const box = $('#medium-blog'), items = data.items || [];
        if (!items.length) throw new Error("No posts");
        box.innerHTML = "";
        let first = null;
        items.forEach((p, i) => {
            const doc = new DOMParser().parseFromString(p.description || p.content || "", "text/html");
            const firstImg = html => [...new DOMParser().parseFromString(html || "", "text/html").querySelectorAll("img")].map(i => i.src).find(s => s && !s.includes("/_/stat"));
            const img = p.thumbnail || firstImg(p.content) || firstImg(p.description) || "";
            if (i === 0) first = { title: p.title, link: p.link, img };
            let text = doc.body.textContent.replace(/\s+/g, " ").trim();
            if (text.length > 160) text = text.slice(0, 160).replace(/\s+\S*$/, "") + "…";
            const card = document.createElement("article"); card.className = "bcard" + (i >= 4 ? " extra" : "");
            if (img) { const im = document.createElement("img"); im.className = "bthumb"; im.src = img; im.alt = ""; im.loading = "lazy"; im.onerror = () => im.remove(); card.append(im); }
            const b = document.createElement("div"); b.className = "bbody";
            const h = document.createElement("h3"); h.textContent = p.title;
            const d = document.createElement("p"); d.textContent = text;
            const a = document.createElement("a"); a.className = "cta-button"; a.href = p.link; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Read More";
            b.append(h, d, a); card.append(b); box.append(card);
        });
        // Home screen: latest post as a small card
        const m = $('#hero-blog');
        if (m && first) {
            m.href = first.link; $('b', m).textContent = first.title;
            const t = $('.mthumb', m);
            if (first.img) { t.src = first.img; t.onerror = () => t.remove(); } else t.remove();
            m.hidden = false;
        }
        const btn = $('#more-blogs');
        if (items.length > 4) {
            btn.hidden = false;
            btn.onclick = () => { const all = box.classList.toggle("all"); btn.textContent = all ? "Show less" : "Show more"; };
        }
    })
    .catch(error => {
        console.error("Error fetching Medium RSS feed:", error);
        $('#medium-blog').innerHTML = `<p class="muted">Unable to load my blogs right now. You can read them on <a href="https://medium.com/@vismayav">Medium</a>.</p>`;
    });

// Neokred logo: shows a text fallback until images/neokred-logo.png is added
$$('.plogo img').forEach(i => {
  const fb = () => { const s = document.createElement('span'); s.textContent = 'Neokred'; i.replaceWith(s); };
  i.addEventListener('error', fb); if (i.complete && !i.naturalWidth) fb();
});

// Certificate lightbox
// Certificates: 3D coverflow
const lb=$('#lightbox'),cards=$$('.ci'),cf=$('#cflow');let idx=0;
function layout(){cards.forEach((el,i)=>{const d=i-idx,a=Math.abs(d);
  el.style.transform=`translateX(${d*50}%) translateZ(${-a*140}px) rotateY(${-d*32}deg) scale(${a?.9:1})`;
  el.style.zIndex=10-a;el.style.opacity=a>2?0:1-a*.28;el.style.pointerEvents=a>2?'none':'auto';el.classList.toggle('cur',!a)});
  $('#ccount').textContent=`${idx+1} / ${cards.length}`;cf.style.height=cards[0].offsetHeight+30+'px'}
const go=n=>{idx=(n+cards.length)%cards.length;layout()};
cards.forEach((el,i)=>el.onclick=()=>{if(i!==idx)return go(i);const im=$('img',el);$('img',lb).src=im.src;$('img',lb).alt=im.alt;lb.showModal()});
$('#cprev').onclick=()=>go(idx-1);$('#cnext').onclick=()=>go(idx+1);
cf.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(idx-1);if(e.key==='ArrowRight')go(idx+1)});
let sx=null;cf.addEventListener('pointerdown',e=>sx=e.clientX);
cf.addEventListener('pointerup',e=>{if(sx!==null&&Math.abs(e.clientX-sx)>45)go(idx+(e.clientX<sx?1:-1));sx=null});
layout();addEventListener('resize',layout);addEventListener('load',layout);
lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});

// Contact form without leaving the page
$('#form').addEventListener('submit',async e=>{
  e.preventDefault();const f=e.target,s=$('#status');s.textContent='Sending…';
  try{const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});
    if(r.ok){f.reset();s.textContent='Thanks! Your message is on its way.'}else throw 0}
  catch{s.textContent='Message not sent. Please try again or message me on LinkedIn.'}
});

// FalconFeeds total tenure (from Oct 2023, counted the way LinkedIn does, inclusive of the current month)
(()=>{const n=new Date(),m=(n.getFullYear()-2023)*12+(n.getMonth()-9)+1,y=Math.floor(m/12),r=m%12;
  const t=[y?`${y} yr${y>1?'s':''}`:'',r?`${r} mo${r>1?'s':''}`:''].filter(Boolean).join(' ');const el=document.getElementById('tenure');if(el&&m>0)el.textContent=t})();

// TryHackMe profile link: only shown once a real URL is set in index.html
(()=>{const a=document.getElementById('thm-link');if(a&&!/^https?:/.test(a.getAttribute('href')))a.hidden=true})();
