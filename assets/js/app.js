/* app.js - logika halaman, tidak perlu diubah */
var chosen = "", cat = "Semua", view = "cv", shown = 0;
var $ = function(id){return document.getElementById(id)};
function waLink(t){return "https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(t)}
function formLink(){return chosen ? FORM_URL+"?usp=pp_url&"+FORM_TEMPLATE_ENTRY+"="+encodeURIComponent(chosen) : FORM_URL}
function waText(){return chosen ? 'Halo, saya mau pesan CV dengan template "'+chosen+'".' : "Halo, saya mau tanya soal jasa pembuatan CV."}
function refresh(){
  ["formBtn","formBtn2"].forEach(function(i){$(i).href=formLink()});
  ["waBtn","waBtn2"].forEach(function(i){$(i).href=waLink(waText())});
  document.querySelectorAll("[data-wa]").forEach(function(a){a.href=waLink(a.dataset.wa)});
  document.querySelectorAll("[data-pk]").forEach(function(a){a.href=waLink('Halo, saya mau pesan paket '+a.dataset.pk+(chosen?' dengan template "'+chosen+'"':'')+'.')});
  $("telLink").href=waLink("Halo, saya mau konsultasi soal CV.");
  $("pick").textContent = chosen ? "Template: "+chosen : "Belum pilih template";
  $("igLink").href = IG_URL;
  document.querySelectorAll('a[href^="https://wa.me"]').forEach(function(a){a.target="_top"});
}
function preview(l){
  var lines='<i></i><i></i><i style="width:80%"></i><i></i><i style="width:65%"></i><i></i>';
  if(l==="side") return '<div class="prev"><div class="side"></div><div class="main"><i class="t"></i>'+lines+'</div></div>';
  if(l==="top") return '<div class="prev top"><div class="band"></div><div class="main"><i class="t"></i>'+lines+lines+'</div></div>';
  return '<div class="prev"><div class="main"><i class="t"></i>'+lines+lines+'</div></div>';
}
function letter(l){
  var bg=l==="top"?"var(--navy)":(l==="side"?"#3C3C3C":"var(--gold)");
  var p='<i></i><i></i><i style="width:85%"></i><i></i><i style="width:70%"></i>';
  return '<div class="prev top"><div class="band" style="height:10%;background:'+bg+'"></div><div class="main"><i style="width:35%;align-self:flex-end"></i><i class="t" style="width:30%"></i><i style="width:45%"></i>'+p+p+'<i style="width:30%;margin-top:auto;align-self:flex-end"></i></div></div>';
}
function doc(t,v,big){
  var im=v==="surat"?t.imgSurat:t.img;
  if(im&&big) return '<img src="'+im+'" alt="'+(v==="surat"?"Surat lamaran ":"CV ")+t.n+'">';
  if(im) return '<div class="prev pic"><img src="'+im+'" alt="'+(v==="surat"?"Surat lamaran ":"CV ")+t.n+'" loading="lazy"></div>';
  return v==="surat"?letter(t.l):preview(t.l);
}
function cur(){return TEMPLATES.filter(function(x){return x.n===chosen})[0]}
function hasSurat(t){return !!t&&t.surat!==false}
function openLb(){
  var t=cur();if(!t)return;
  $("lbsw").style.display=hasSurat(t)?"":"none";
  $("lbt").textContent=t.n.toUpperCase()+" - "+(view==="cv"?"CV":"Surat lamaran")+(pos()?" ("+pos()+")":"");
  $("lbdoc").innerHTML=doc(t,view,true);$("lbdoc").scrollTop=0;
  $("lbsw").textContent=view==="cv"?"Lihat surat lamaran":"Lihat CV";
  $("lb").classList.add("on");document.body.style.overflow="hidden";$("lbx").focus();
}
function closeLb(){
  $("lb").classList.remove("on");document.body.style.overflow="";
  var z=document.querySelector(".zoom");if(z)z.focus();
}
function filtered(){return TEMPLATES.filter(function(t){return cat==="Semua"||t.c===cat})}
function pageSize(){return window.innerWidth<720?PAGE_MOBILE:PAGE_DESKTOP}
function pos(){var fl=filtered();for(var k=0;k<fl.length;k++)if(fl[k].n===chosen)return (k+1)+"/"+fl.length;return ""}
function nav(d){
  var fl=filtered(),i=-1,k;
  for(k=0;k<fl.length;k++)if(fl[k].n===chosen)i=k;
  if(i<0){i=0;d=0}
  var j=(i+d+fl.length)%fl.length;
  chosen=fl[j].n;view="cv";shown=Math.max(shown,j+1);
  render();refresh();openLb();
}
function render(){
  var cats=["Semua"].concat(TEMPLATES.map(function(t){return t.c}).filter(function(v,i,a){return a.indexOf(v)===i}));
  $("chips").innerHTML=cats.map(function(c){return '<button class="chip" aria-pressed="'+(c===cat)+'" data-c="'+c+'">'+c+'</button>'}).join("");
  var fl=filtered();
  $("cnt").textContent="Menampilkan "+Math.min(shown,fl.length)+" dari "+fl.length+" template";
  $("moreBtn").style.display=shown<fl.length?"":"none";
  $("grid").innerHTML=fl.slice(0,shown).map(function(t){
    var sel=t.n===chosen;
    return '<div class="cw"><button class="card" aria-pressed="'+sel+'" data-n="'+t.n+'">'+doc(t,sel?view:"cv")+'<span class="code">'+t.n.toUpperCase()+'</span><small class="dsc">'+t.d+'</small>'+(sel?'<b class="mode">Tampilan: '+(view==="cv"?"CV":"Surat lamaran")+'</b><small>'+(hasSurat(t)?"Ketuk lagi untuk ganti":"Surat lamaran belum tersedia")+'</small>':'')+'</button>'+(sel?'<button class="btn zoom" type="button">Perbesar</button>':'')+'</div>'}).join("");
}
$("chips").onclick=function(e){var c=e.target.dataset.c;if(c){cat=c;shown=pageSize();render()}};
$("grid").onclick=function(e){if(e.target.closest(".zoom")){openLb();return}var b=e.target.closest(".card");if(!b)return;if(chosen===b.dataset.n){if(hasSurat(cur()))view=view==="cv"?"surat":"cv"}else{chosen=b.dataset.n;view="cv"}render();refresh();var c=$("grid").querySelector('[data-n="'+chosen+'"]');if(c)c.focus()};
$("pk").innerHTML=PACKAGES.map(function(p){return '<div><h3>'+p.n+'</h3><small class="tm">'+p.t+'</small><b>'+p.p+'</b><ul>'+p.f.map(function(f){return '<li>'+f+'</li>'}).join("")+'</ul><a class="btn wa" data-pk="'+p.n+'" href="#">Pesan paket</a></div>'}).join("");
$("pl").innerHTML=SERVICES.map(function(r){return '<div><span>'+r[0]+'</span><b>Rp'+r[1]+'</b></div>'}).join("");
$("startPrice").textContent=PACKAGES[0].p;
shown=pageSize();render();refresh();
$("lbx").onclick=closeLb;
$("lb").onclick=function(e){if(e.target===this)closeLb()};
$("lbsw").onclick=function(){view=view==="cv"?"surat":"cv";render();refresh();openLb()};
$("lbp").onclick=function(){nav(-1)};
$("lbn").onclick=function(){nav(1)};
$("moreBtn").onclick=function(){shown+=pageSize();render()};
document.addEventListener("keydown",function(e){
  if(!$("lb").classList.contains("on"))return;
  if(e.key==="Escape")closeLb();
  else if(e.key==="ArrowLeft")nav(-1);
  else if(e.key==="ArrowRight")nav(1);
});
