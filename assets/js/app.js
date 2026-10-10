/* app.js - logika halaman, tidak perlu diubah */
var chosen = "", cat = "Semua", view = "cv", shown = 0;
var $ = function(id){return document.getElementById(id)};
function waLink(t){return "https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(t)}
/* ===== KERANJANG ===== */
var cart = [], lastCode = "";
try { cart = JSON.parse(localStorage.getItem("ejasa-cart") || "[]"); lastCode = localStorage.getItem("ejasa-code") || ""; } catch(e) {}
function fmt(n){return "Rp"+String(n).replace(/\B(?=(\d{3})+(?!\d))/g,".")}
function saveCart(){try{localStorage.setItem("ejasa-cart",JSON.stringify(cart));localStorage.setItem("ejasa-code",lastCode)}catch(e){}}
function orderCode(){var d=new Date();return "EJ-"+("0"+d.getDate()).slice(-2)+("0"+(d.getMonth()+1)).slice(-2)+"-"+Math.floor(100+Math.random()*900)}
function findLine(k){return cart.filter(function(l){return l.k===k})[0]}
function pkgLine(p){return {k:"pk|"+p.id,id:"pk-"+p.id,n:"Paket "+p.name,o:"",p:p.p,pk:1,form:1,tpl:1}}
function addItem(it){var l=findLine(it.k);if(l)l.qty++;else{if(!cart.length)lastCode=orderCode();it.qty=1;cart.push(it)}refresh()}
function chg(k,d){var l=findLine(k);if(!l)return;l.qty+=d;if(l.qty<1)cart.splice(cart.indexOf(l),1);refresh()}
function totals(){var t=0,ask=0;cart.forEach(function(l){if(l.p==null)ask++;else t+=l.p*l.qty});return {t:t,ask:ask}}
function lineName(l){return l.n+(l.o?" ("+l.o+")":"")}
function pr(id,o){var l=cart.filter(function(x){return x.id===id&&(!o||x.o===o)})[0];return l&&l.p?l.p:0}
function suggest(){
  if(cart.some(function(l){return l.pk}))return null;
  var cv=pr("cv","Dari template"),sl=pr("sl","Dari template"),pdf=pr("pdf"),bg=pr("bg"),best=null;
  if(!cv||!sl)return null;
  [["std",cv+sl],["biz",cv+sl+pdf+bg]].forEach(function(c){
    var p=PAKET.filter(function(x){return x.id===c[0]})[0];
    if(c[0]==="biz"&&!(pdf||bg))return;
    var save=c[1]-p.p;
    if(save>0&&(!best||save>=best.save)){
      var rm=[["cv","Dari template"],["sl","Dari template"]];
      if(c[0]==="biz"){if(pdf)rm.push(["pdf"]);if(bg)rm.push(["bg"])}
      best={p:p,save:save,rm:rm};
    }
  });
  return best;
}
function applySug(){
  var s=suggest();if(!s)return;
  s.rm.forEach(function(r){var l=cart.filter(function(x){return x.id===r[0]&&(!r[1]||x.o===r[1])})[0];if(l){l.qty--;if(l.qty<1)cart.splice(cart.indexOf(l),1)}});
  addItem(pkgLine(s.p));
}
function waMsg(){
  if(!cart.length)return "Halo Ejasa CV, saya mau tanya soal jasa pembuatan CV.";
  var m=["Halo Ejasa CV, saya mau pesan:","Kode pesanan: "+lastCode,""],tt=totals();
  cart.forEach(function(l,i){m.push((i+1)+". "+lineName(l)+" x"+l.qty+" - "+(l.p==null?"tanya harga":fmt(l.p*l.qty)))});
  m.push("","Total: "+fmt(tt.t)+(tt.ask?" (belum termasuk "+tt.ask+" item tanya harga)":""));
  if(chosen&&cart.some(function(l){return l.tpl}))m.push("Template pilihan: "+chosen);
  m.push("","Mohon dikonfirmasi ya. Terima kasih.");
  return m.join("\n");
}
function okEntry(e){return !!e&&!/^entry\.0+\d?$/.test(e)}
function formLink(){
  var t=cur(),q=[];
  if(lastCode&&okEntry(FORM_ORDER_ENTRY))q.push(FORM_ORDER_ENTRY+"="+encodeURIComponent(lastCode));
  if(t&&okEntry(FORM_TEMPLATE_ENTRY))q.push(FORM_TEMPLATE_ENTRY+"="+encodeURIComponent(typeof FORM_TEMPLATE_PAKAI!=="undefined"&&FORM_TEMPLATE_PAKAI==="kode"?t.kode:t.n));
  return FORM_URL+(q.length?"?usp=pp_url&"+q.join("&"):"");
}
function nextText(){
  var f=cart.some(function(l){return l.form}),o=cart.some(function(l){return !l.form});
  if(f&&o)return "Setelah dikonfirmasi: isi form data untuk CV/surat, dan kirim file foto/dokumen lewat WhatsApp.";
  if(f)return "Setelah dikonfirmasi: kamu mengisi form data dan memilih template.";
  if(o)return "Setelah dikonfirmasi: kirim file langsung lewat WhatsApp, tanpa form.";
  return "";
}
function drawCart(){
  var t=totals(),s=suggest();
  $("cl").innerHTML=cart.map(function(l){
    return '<div class="ln2"><div><b>'+lineName(l)+'</b><small>'+(l.p==null?"Tanya admin":fmt(l.p)+" / item")+'</small></div><div class="qty"><button type="button" data-k="'+l.k+'" data-d="-1" aria-label="Kurangi">-</button><span>'+l.qty+'</span><button type="button" data-k="'+l.k+'" data-d="1" aria-label="Tambah">+</button></div></div>';
  }).join("")||'<p class="sub">Keranjang masih kosong. Tambahkan layanan dari daftar.</p>';
  $("sg").innerHTML=s?'<div class="sg"><b>Lebih hemat dengan Paket '+s.p.name+'</b><small>Hemat '+fmt(s.save)+' dari pesananmu sekarang</small><button class="btn acc" type="button">Ganti ke paket</button></div>':"";
  $("tt").textContent=fmt(t.t);
  $("tn").textContent=t.ask?"Belum termasuk "+t.ask+" item yang harganya ditanyakan ke admin.":"";
  $("nx").textContent=nextText();
}
function refresh(){
  var t=totals(),n=0;cart.forEach(function(l){n+=l.qty});
  document.querySelectorAll(".wa-cart").forEach(function(a){a.href=waLink(waMsg());a.textContent=cart.length?"Pesan via WhatsApp":"Chat WhatsApp"});
  document.querySelectorAll("[data-wa]").forEach(function(a){a.href=waLink(a.dataset.wa)});
  $("formBtn").href=formLink();
  $("telLink").href=waLink("Halo, saya mau konsultasi soal CV.");
  $("igLink").href=IG_URL;
  $("cartCount").textContent=n?n+" item - "+fmt(t.t)+(t.ask?" + tanya harga":""):"Keranjang kosong";
  $("cartPick").textContent=chosen?"Template: "+chosen:"Ketuk untuk melihat keranjang";
  drawCart();saveCart();
  document.querySelectorAll('a[href^="https://wa.me"]').forEach(function(a){a.target="_top"});
}
function renderServices(){
  var li=function(x){return '<li>'+x+'</li>'},price=function(p){return p==null?"Tanya admin":fmt(p)};
  $("pkg").innerHTML=PAKET.map(function(p){
    return '<div class="sv gold"><h3>Paket '+p.name+'</h3><small class="tm">Pengerjaan '+p.t+'</small><b class="pr">'+fmt(p.p)+'</b><ul>'+p.f.map(li).join("")+'</ul><button class="btn acc" type="button" data-pk="'+p.id+'">Tambah paket</button></div>';
  }).join("");
  $("svc").innerHTML=SERVICES.map(function(s){
    var multi=s.opts.length>1;
    return '<div class="sv"><h3>'+s.name+'</h3><small class="tm">'+s.desc+'</small>'+(multi?'<select data-s="'+s.id+'" aria-label="Pilihan '+s.name+'">'+s.opts.map(function(o,i){return '<option value="'+i+'">'+o.o+' - '+price(o.p)+'</option>'}).join("")+'</select>':'<b class="pr">'+price(s.opts[0].p)+'</b>')+'<button class="btn acc" type="button" data-s="'+s.id+'">Tambah</button></div>';
  }).join("");
}
function flash(b){var t=b.textContent;b.textContent="Ditambahkan";setTimeout(function(){b.textContent=t},900)}
function closeCart(){$("cart").classList.remove("on")}
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
$("startPrice").textContent=fmt(PAKET[0].p);
shown=pageSize();renderServices();render();refresh();
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
$("layanan").onclick=function(e){
  var b=e.target.closest("button");if(!b)return;
  if(b.dataset.pk){addItem(pkgLine(PAKET.filter(function(p){return p.id===b.dataset.pk})[0]));flash(b)}
  else if(b.dataset.s){
    var s=SERVICES.filter(function(x){return x.id===b.dataset.s})[0],sel=$("svc").querySelector('select[data-s="'+s.id+'"]'),o=s.opts[sel?+sel.value:0];
    addItem({k:s.id+"|"+o.o,id:s.id,n:s.name,o:o.o,p:o.p,form:o.form,tpl:o.tpl});flash(b);
  }
};
$("cartOpen").onclick=function(){$("cart").classList.add("on")};
$("cartX").onclick=closeCart;
$("cart").onclick=function(e){if(e.target===this)closeCart()};
$("clrCart").onclick=function(){cart=[];refresh()};
$("cl").onclick=function(e){var b=e.target.closest("button");if(b)chg(b.dataset.k,+b.dataset.d)};
$("sg").onclick=function(e){if(e.target.closest("button"))applySug()};
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeCart()});
