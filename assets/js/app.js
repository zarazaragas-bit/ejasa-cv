/* app.js - logika halaman, tidak perlu diubah */
var chosen = "", cat = "Semua";
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
function pic(t){return '<div class="prev pic"><img src="'+t.img+'" alt="Contoh '+t.n+'" loading="lazy"></div>'}
function render(){
  var cats=["Semua"].concat(TEMPLATES.map(function(t){return t.c}).filter(function(v,i,a){return a.indexOf(v)===i}));
  $("chips").innerHTML=cats.map(function(c){return '<button class="chip" aria-pressed="'+(c===cat)+'" data-c="'+c+'">'+c+'</button>'}).join("");
  $("grid").innerHTML=TEMPLATES.filter(function(t){return cat==="Semua"||t.c===cat}).map(function(t){
    return '<button class="card" aria-pressed="'+(t.n===chosen)+'" data-n="'+t.n+'">'+(t.img?pic(t):preview(t.l))+'<span class="code">'+t.n.toUpperCase()+'</span><small>'+t.d+'</small></button>'}).join("");
}
$("chips").onclick=function(e){var c=e.target.dataset.c;if(c){cat=c;render()}};
$("grid").onclick=function(e){var b=e.target.closest(".card");if(b){chosen=chosen===b.dataset.n?"":b.dataset.n;render();refresh()}};
$("pk").innerHTML=PACKAGES.map(function(p){return '<div><h3>'+p.n+'</h3><small class="tm">'+p.t+'</small><b>'+p.p+'</b><ul>'+p.f.map(function(f){return '<li>'+f+'</li>'}).join("")+'</ul><a class="btn wa" data-pk="'+p.n+'" href="#">Pesan paket</a></div>'}).join("");
$("pl").innerHTML=SERVICES.map(function(r){return '<div><span>'+r[0]+'</span><b>Rp'+r[1]+'</b></div>'}).join("");
$("startPrice").textContent=PACKAGES[0].p;
render();refresh();
