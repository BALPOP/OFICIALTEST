// Brazil timezone offset = UTC-3
function brazilNow(){
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset()*60000;
  return new Date(utc + (-3)*3600000);
}
function daysOnline(launchDate){
  const today = brazilNow();
  today.setHours(0,0,0,0);
  const launch = new Date(launchDate);
  launch.setHours(0,0,0,0);
  const diff = Math.floor((today - launch)/(1000*60*60*24));
  if(diff <= 0) return 'Lançamento hoje!';
  if(diff === 1) return 'Online há 1 dia';
  return `Online há ${diff} dias`;
}

const platformColors={
  POPBRA:'#C0392B',POPBEA:'#B06AE8',POPPG:'#E84393',POPBEM:'#27AE60',
  POPBIS:'#FF6B35',POPSUR:'#F1C40F','26BET':'#D4A017',POP555:'#E67E22',
  POPCEU:'#2E86C1',POPN1:'#9B59B6',POP888:'#C0392B',POPLUA:'#3498DB',
  POPBOA:'#2980B9',POPVAI:'#8E44AD',POPKKK:'#D4A017',POPWB:'#C0392B',
  POPDEZ:'#E67E22',POPLUZ:'#9B59B6',POP678:'#E74C3C',
  POPMEL:'#F39C12',POPFLU:'#27AE60',POPZOE:'#3498DB'
};

const platforms=[
  {name:'POPBRA', launch:'2022-03-22', date:'22 Mar 2022',r:'30',w:'50', logo:'asset/bra.png', url:'https://popbra.com'},
  {name:'POPBEA', launch:'2026-03-23', date:'23 Mar 2026',r:'20',w:'30', logo:'asset/bea.png', url:'https://popbea.com'},
  {name:'POPPG', launch:'2024-03-08',  date:'08 Mar 2024',r:'20',w:'50', logo:'asset/pg.png',  url:'https://poppg.com'},
  {name:'POPBEM', launch:'2025-04-21', date:'21 Abr 2025',r:'20',w:'30', logo:'asset/bem.png', url:'https://popbem.com'},
  {name:'POPBIS', launch:'2025-10-07', date:'07 Out 2025',r:'20',w:'30', logo:'asset/bis.png', url:'https://popbis.com'},
  {name:'POPSUR', launch:'2026-03-12', date:'12 Mar 2026',r:'20',w:'30', logo:'asset/sur.png', url:'https://popsur.com'},
  {name:'26BET', launch:'2023-05-01',  date:'01 Mai 2023',r:'30',w:'30', logo:'asset/26bet.png',url:'https://26bet.com'},
  {name:'POP555', launch:'2024-04-15', date:'15 Abr 2024',r:'20',w:'50', logo:'asset/555.png', url:'https://pop555.com'},
  {name:'POPCEU', launch:'2025-05-15', date:'15 Mai 2025',r:'20',w:'30', logo:'asset/ceu.png', url:'https://popceu.com'},
  {name:'POPN1', launch:'2025-10-10',  date:'10 Out 2025',r:'10',w:'20', logo:'asset/n1.png',  url:'https://popn1.com'},
  {name:'POP888', launch:'2023-11-01', date:'01 Nov 2023',r:'20',w:'30', logo:'asset/888.png', url:'https://pop888.com'},
  {name:'POPLUA', launch:'2025-03-15', date:'15 Mar 2025',r:'20',w:'30', logo:'asset/lua.png', url:'https://poplua.com'},
  {name:'POPBOA', launch:'2025-07-08', date:'08 Jul 2025',r:'20',w:'30', logo:'asset/boa.png', url:'https://popboa.com'},
  {name:'POPVAI', launch:'2025-12-01', date:'01 Dez 2025',r:'20',w:'30', logo:'asset/vai.png', url:'https://popvai.com'},
  {name:'POPKKK', launch:'2024-01-08', date:'08 Jan 2024',r:'30',w:'30', logo:'asset/kkk.png', url:'https://popkkk.com'},
  {name:'POPWB', launch:'2025-04-07',  date:'07 Abr 2025',r:'10',w:'20', logo:'asset/wb.png',  url:'https://popwb.com'},
  {name:'POPDEZ', launch:'2025-06-09', date:'09 Jun 2025',r:'10',w:'30', logo:'asset/dez.png', url:'https://popdez.com'},
  {name:'POPLUZ', launch:'2026-01-06', date:'06 Jan 2026',r:'20',w:'30', logo:'asset/luz.png', url:'https://popluz.com'},
  {name:'POP678', launch:'2024-03-01', date:'01 Mar 2024',r:'10',w:'50', logo:'asset/678.png', url:'https://pop678.com'},
  {name:'POPMEL', launch:'2025-05-05', date:'05 Mai 2025',r:'20',w:'30', logo:'asset/mel.png', url:'https://popmel.com'},
  {name:'POPFLU', launch:'2025-09-08', date:'08 Set 2025',r:'20',w:'30', logo:'asset/flu.png', url:'https://popflu.com'},
  {name:'POPZOE', launch:'2026-03-03', date:'03 Mar 2026',r:'20',w:'30', logo:'asset/zoe.png', url:'https://popzoe.com'},
];

// Showcase chips
document.getElementById('sc-chips').innerHTML=platforms.map(p=>`
  <div class="chip" onclick="openModal('${p.name}')" title="${p.name}">
    <img src="${p.logo}" alt="${p.name}"
      onerror="this.outerHTML='<span class=\\'chip-text\\'>${p.name}</span>'"
      loading="lazy">
  </div>`).join('');

(function(){
  const el=document.getElementById('sc-chips');
  if(!el) return;
  let timer=null;
  function tick(){
    const maxScrollX=el.scrollWidth-el.clientWidth;
    const maxScrollY=el.scrollHeight-el.clientHeight;
    if(maxScrollX<=2 && maxScrollY<=2) return;
    const cs=window.getComputedStyle(el);
    const first=el.querySelector('.chip');
    const useVertical=maxScrollY>2 && maxScrollX<=2;
    if(useVertical){
      const gapY=parseFloat(cs.rowGap)||0;
      const stepY=first?Math.round(first.getBoundingClientRect().height+gapY):52;
      const atEndY=el.scrollTop+el.clientHeight>=maxScrollY-2;
      if(atEndY) el.scrollTo({top:0,behavior:'smooth'});
      else el.scrollTo({top:Math.min(el.scrollTop+stepY,maxScrollY),behavior:'smooth'});
      return;
    }
    const gapX=parseFloat(cs.columnGap)||6;
    const stepX=first?Math.round(first.getBoundingClientRect().width+gapX):58;
    const atEndX=el.scrollLeft+el.clientWidth>=maxScrollX-4;
    if(atEndX) el.scrollTo({left:0,behavior:'smooth'});
    else el.scrollTo({left:Math.min(el.scrollLeft+stepX,maxScrollX),behavior:'smooth'});
  }
  function start(){if(timer) clearInterval(timer);timer=setInterval(tick,3500);}
  start();
  el.addEventListener('mouseenter',function(){if(timer) clearInterval(timer);});
  el.addEventListener('mouseleave',start);
  el.addEventListener('touchstart',function(){if(timer) clearInterval(timer);},{passive:true});
  el.addEventListener('touchend',function(){setTimeout(start,2500);},{passive:true});
  window.addEventListener('resize',start);
})();

// Live Activity Feed
const plats=['POPBRA','POPPG','POPBEM','POPBIS','POPSUR','26BET','POP555','POPCEU','POPN1','POPBEA','POP888','POPLUA','POPBOA','POPVAI','POPKKK','POPWB','POPDEZ','POPLUZ','POP678','POPMEL','POPFLU','POPZOE'];
const states=['SP','RJ','MG','BA','PR','RS','PE','CE','GO','SC','AM','PA'];
function rp(arr){return arr[Math.floor(Math.random()*arr.length)];}
function ramt(){const vals=[20,30,50,80,100,150,200,300,500];return vals[Math.floor(Math.random()*vals.length)];}
function rmult(){const m=[5,8,10,12,15,18,20,25,30,40,50,80,100,120,150,200];return m[Math.floor(Math.random()*m.length)];}

const popLovePlats=['POPBRA','POPVAI','POPLUZ','POPBEM','POPCEU','POPBOA','POPFLU','POPZOE','POP888','POPLUA'];
const sortePlats=['POPSUR','POPN1','POPZOE','POPLUZ','POPBEA'];
const jackpotGames=['Fortune Tiger','Fortune Ox','Fortune Mouse','Gates of Olympus','Sweet Bonanza','Spaceman','Fortune Rabbit','Fishing God'];
const checkInPlats=['POPBRA','POPPG','POP888','POPKKK','26BET','POPBOA','POPLUA','POPBEM','POPCEU'];
const sachoAmts=[200,300,400,500,600,700,800,900,1000,1200,1500,2000];
const jackAmts=[312,487,623,741,832,950,1100,1243,1480,1750,2100,2680,3200];
const quinaPlats=['POPSUR','POPN1','POPZOE','POPLUZ','POPBEA'];

function rJack(){return jackAmts[Math.floor(Math.random()*jackAmts.length)];}
function rSach(){return sachoAmts[Math.floor(Math.random()*sachoAmts.length)];}
function rGame(){return jackpotGames[Math.floor(Math.random()*jackpotGames.length)];}

const feedTemplates=(() => {
  // ── ID generators by platform format ────────────────────────────
  // Short numeric (4-7 digits): POPBRA, POP888, POP678, POPPG, POP555, POPLUA, POPBEM, POPCEU
  const shortPlats = ['POPBRA','POP888','POP678','POPPG','POP555','POPLUA','POPBEM','POPCEU'];
  function shortId(plat) {
    const ranges = {
      POPBRA:[20000,2900000], POP888:[10000,800000], POP678:[3000,400000],
      POPPG:[4000,410000], POP555:[100000,450000], POPLUA:[100000,340000],
      POPBEM:[100000,310000], POPCEU:[100000,270000]
    };
    const [lo,hi] = ranges[plat]||[10000,999999];
    return Math.floor(Math.random()*(hi-lo)+lo).toString();
  }
  // Username: POPKKK, 26BET
  const userPlats = ['POPKKK','26BET'];
  const userNames = ['marylha','clarinha4','kzinn24k','ketty90','bisteka','jaelsonnn','dboeira','anasara',
    'reginaldo94','silvani20','laiana7777','beatrizrcruz','gerleide','eduardo77','iracyy','lucia2424',
    'flaviama19','rodr','juju','fabi','luiz','carlos','ana','jose','maria','pedro','paulo'];
  function userId() { return rp(userNames); }
  // 10-digit starting 1: POPSUR, POPWB, POPMEL
  const ten1Plats = ['POPSUR','POPWB','POPMEL'];
  function id1() { return (Math.floor(Math.random()*900000000)+1000000000).toString(); }
  // 10-digit starting 2: POPBOA, POPDEZ, POPZOE
  const ten2Plats = ['POPBOA','POPDEZ','POPZOE'];
  function id2() { return (Math.floor(Math.random()*900000000)+2000000000).toString(); }
  // 10-digit starting 3: POPFLU, POPBIS, POPN1, POPVAI, POPLUZ, POPBEA
  const ten3Plats = ['POPFLU','POPBIS','POPN1','POPVAI','POPLUZ','POPBEA'];
  function id3() { return (Math.floor(Math.random()*900000000)+3000000000).toString(); }

  // Get correct ID for any platform
  function getId(plat) {
    if(shortPlats.includes(plat)) return shortId(plat)+'**';
    if(userPlats.includes(plat)) return userId();
    if(ten1Plats.includes(plat)) return id1().slice(0,-4)+'****';
    if(ten2Plats.includes(plat)) return id2().slice(0,-4)+'****';
    if(ten3Plats.includes(plat)) return id3().slice(0,-4)+'****';
    return '######';
  }
  function getPlat(group) { return rp(group); }

  const allGroups = [shortPlats, userPlats, ten1Plats, ten2Plats, ten3Plats];
  function anyPlat() { return rp(rp(allGroups)); }
  function anyId(plat) { return getId(plat); }

  return [
  // Check-in diário — all platforms
  ()=>{const p=anyPlat();return{dot:'green',msg:`<strong>${p} ${anyId(p)}</strong> acaba de reivindicar o <em>Bônus de Check-in Diário</em>`}},
  ()=>{const p=anyPlat();return{dot:'green',msg:`<strong>${p} ${anyId(p)}</strong> resgatou o <em>Bônus de Check-in Diário</em> com sucesso`}},
  // Pop-Love — POPVAI ONLY
  ()=>{const p='POPVAI';return{dot:'gold',msg:`<strong>POPVAI ${getId(p)}</strong> reivindicou com sucesso o <em>Presente Grátis</em> no <em>Pop-Love.shop</em>`}},
  ()=>{const p='POPVAI';return{dot:'gold',msg:`<strong>Pop-Love.shop</strong> — POPVAI ${getId(p)} retirou seu <em>presente exclusivo</em> de membro`}},
  ()=>{const p='POPVAI';return{dot:'gold',msg:`🎁 <strong>POPVAI ${getId(p)}</strong> acabou de resgatar um <em>presente surpresa</em> em <em>Pop-Love.shop</em>`}},
  // Jackpot — correct IDs
  ()=>{const p=anyPlat();return{dot:'gold',msg:`<strong>${p} ${anyId(p)}</strong> ganhou um jackpot de <em>R$ ${rJack()}</em> da <em>${rGame()}</em>`}},
  ()=>{const p=anyPlat();return{dot:'gold',msg:`🔥 <strong>${p} ${anyId(p)}</strong> acertou <em>x${rmult()}</em> na <em>${rGame()}</em> — R$ ${rJack()}`}},
  ()=>{const p=anyPlat();return{dot:'gold',msg:`<strong>${rGame()}</strong> — ${p} ${anyId(p)} faturou <em>R$ ${rJack()}</em> no jackpot`}},
  // Novo membro
  ()=>{const p=anyPlat();return{dot:'green',msg:`<strong>Um novo membro</strong> se cadastrou no <em>${p}</em>`}},
  ()=>{const p=anyPlat();return{dot:'green',msg:`<strong>Novo membro</strong> registrado em <em>${p}</em> — ${rp(states)}`}},
  // Saque — correct IDs
  ()=>{const p=anyPlat();return{dot:'red',msg:`<strong>${p} ${anyId(p)}</strong> acabou de sacar <em>R$ ${rSach()}</em> com sucesso`}},
  ()=>{const p=anyPlat();return{dot:'red',msg:`<strong>Saque aprovado!</strong> ${p} ${anyId(p)} recebeu <em>R$ ${rSach()}</em>`}},
  ()=>{const p=anyPlat();return{dot:'red',msg:`<strong>${p} ${anyId(p)}</strong> realizou saque de <em>R$ ${rSach()}</em> com sucesso`}},
  // PopSorte — correct plats
  ()=>{const p=rp(sortePlats);return{dot:'green',msg:`<strong>${p} ${anyId(p)}</strong> reivindicou com sucesso o <em>bilhete Quina Grátis</em> no <em>PopSorte.vip</em>`}},
  ()=>{const p=rp(sortePlats);return{dot:'green',msg:`<strong>PopSorte.vip</strong> — ${p} ${anyId(p)} gerou seu <em>bilhete da Quina</em> gratuito`}},
  ()=>{const p=rp(sortePlats);return{dot:'gold',msg:`🎟️ <strong>${p} ${anyId(p)}</strong> acertou números na <em>Quina</em> via <em>PopSorte.vip</em>`}},
  // VIP
  ()=>{const p=anyPlat();return{dot:'gold',msg:`<strong>${p} ${anyId(p)}</strong> subiu para <em>VIP ${Math.floor(Math.random()*5)+2}</em>`}},
  ()=>{const p=anyPlat();return{dot:'gold',msg:`🏅 <strong>${p} ${anyId(p)}</strong> atingiu <em>VIP ${Math.floor(Math.random()*4)+3}</em> e ganhou bônus exclusivo`}},
  // Bônus boas vindas
  ()=>{const p=anyPlat();return{dot:'green',msg:`<strong>${p} ${anyId(p)}</strong> resgatou o <em>Bônus de Boas-Vindas</em> com sucesso`}},
  // Comissão
  ()=>{const p=rp([...userPlats,...shortPlats]);return{dot:'red',msg:`<strong>Comissão liberada</strong> — Agente ${p} ${anyId(p)} recebeu <em>R$ ${ramt()}</em>`}},
  // Roleta
  ()=>{const p=anyPlat();return{dot:'green',msg:`<strong>${p} ${anyId(p)}</strong> ganhou na <em>Roleta Diária</em> — ${rp(states)}`}},
  ()=>{const p=anyPlat();return{dot:'gold',msg:`<strong>Roleta Slot</strong> — ${p} ${anyId(p)} qualificado com <em>3 jackpots</em> acima de 50x`}},
  ()=>{const p=anyPlat();return{dot:'green',msg:`<strong>Aniversariante</strong> ${p} ${anyId(p)} inscrito na <em>Roleta de Aniversário</em>`}},
  // Recarga
  ()=>{const p=anyPlat();return{dot:'green',msg:`<strong>Recarga confirmada</strong> — ${p} ${anyId(p)} ativou bônus de <em>R$ ${ramt()}</em>`}},
  // PopRTP
  ()=>{const p=anyPlat();return{dot:'green',msg:`📡 <strong>PopRTP.com</strong> — ${rGame()} com RTP <em>${Math.floor(Math.random()*15+80)}%</em> agora no <em>${p}</em>`}},
  ()=>{const p=anyPlat();return{dot:'gold',msg:`🔥 <strong>Horário Quente Ativo</strong> — ${p} pagando acima do normal agora · <em>PopRTP.com</em>`}},
  ()=>{return{dot:'green',msg:`📡 <strong>Sinal do Dia</strong>: ${rGame()} — RTP <em>${Math.floor(Math.random()*10+85)}%</em> · confira em <em>PopRTP.com</em>`}},
  // POPBRA highlight
  ()=>{return{dot:'gold',msg:`⭐ <strong>POPBRA ${shortId('POPBRA')}**</strong> faturou <em>R$ ${rJack()}</em> em ${rGame()} — a plataforma original!`}},
  ()=>{return{dot:'gold',msg:`⭐ <strong>POPBRA</strong> — Plataforma original da Rede POP desde Mar 2022 · Recarga mínima <em>R$ 30</em>`}},
  // POPBEA highlight
  ()=>{const p='POPBEA';return{dot:'green',msg:`🆕 <strong>POPBEA ${getId(p)}</strong> resgatou bônus de boas-vindas na <em>plataforma mais nova</em> da rede`}},
  ()=>{return{dot:'green',msg:`🆕 <strong>POPBEA</strong> — Plataforma mais nova da Rede POP · Lançada em 23 Mar 2026`}},
  // ── Expanded win/reward/new-member phrases (inside IIFE for scope access) ──
  function(){const p=anyPlat();const phrases=[
    p=>`<strong>${p} ${anyId(p)}</strong> — Vitória de <em>R$ ${rJack()}</em> no Fortune Snake 🐍`,
    p=>`<strong>${p} ${anyId(p)}</strong> completou o Wild e faturou <em>R$ ${rJack()}</em> no Fortune Tiger 🐯`,
    p=>`<strong>${p} ${anyId(p)}</strong> apostou <em>R$ ${Math.floor(Math.random()*50+20)}</em> e ganhou <em>R$ ${rJack()}</em> no Fortune Rabbit 🐰`,
    p=>`🎰 <strong>${p} ${anyId(p)}</strong> cravou <em>R$ ${rJack()}</em> em poucos minutos`,
    p=>`<strong>${p} ${anyId(p)}</strong> transformou <em>R$ ${Math.floor(Math.random()*40+20)}</em> em <em>R$ ${rJack()}</em> no Fortune Ox 🐂`,
    p=>`🔥 <strong>${p} ${anyId(p)}</strong> bateu <em>R$ ${rJack()}</em> no Tiger com rodada incrível`,
    p=>`<strong>${p} ${anyId(p)}</strong> começou com <em>R$ ${Math.floor(Math.random()*30+20)}</em> e saiu com <em>R$ ${rJack()}</em> 💸`,
    p=>`🎯 <strong>${p} ${anyId(p)}</strong> pequena aposta, grande vitória: <em>R$ ${rJack()}</em>`,
    p=>`<strong>${p} ${anyId(p)}</strong> feito hoje um jackpot de mais de <em>R$ ${rJack()}</em> na PG`,
  ];return{dot:'gold',msg:rp(phrases)(p)};},
  function(){const p=anyPlat();const phrases=[
    p=>`<strong>${p} ${anyId(p)}</strong> — Vitória de <em>R$ ${rJack()}</em> no Fortune Snake 🐍`,
    p=>`<strong>${p} ${anyId(p)}</strong> completou o Wild e faturou <em>R$ ${rJack()}</em> no Fortune Tiger 🐯`,
    p=>`<strong>${p} ${anyId(p)}</strong> apostou <em>R$ ${Math.floor(Math.random()*50+20)}</em> e ganhou <em>R$ ${rJack()}</em> no Fortune Rabbit 🐰`,
    p=>`🎰 <strong>${p} ${anyId(p)}</strong> cravou <em>R$ ${rJack()}</em> em poucos minutos`,
    p=>`<strong>${p} ${anyId(p)}</strong> transformou <em>R$ ${Math.floor(Math.random()*40+20)}</em> em <em>R$ ${rJack()}</em> no Fortune Ox 🐂`,
    p=>`🔥 <strong>${p} ${anyId(p)}</strong> bateu <em>R$ ${rJack()}</em> no Tiger com rodada incrível`,
    p=>`<strong>${p} ${anyId(p)}</strong> começou com <em>R$ ${Math.floor(Math.random()*30+20)}</em> e saiu com <em>R$ ${rJack()}</em> 💸`,
    p=>`🎯 <strong>${p} ${anyId(p)}</strong> pequena aposta, grande vitória: <em>R$ ${rJack()}</em>`,
    p=>`<strong>${p} ${anyId(p)}</strong> feito hoje um jackpot de mais de <em>R$ ${rJack()}</em> na PG`,
  ];return{dot:'gold',msg:rp(phrases)(p)};},
  function(){const p=anyPlat();const phrases=[
    p=>`<strong>${p} ${anyId(p)}</strong> coletou <em>R$ ${ramt()*2}</em> no bônus de recarga 💸`,
    p=>`<strong>${p} ${anyId(p)}</strong> garantiu <em>R$ ${ramt()*2}</em> de cashback hoje 🔥`,
    p=>`<strong>${p} ${anyId(p)}</strong> acabou de resgatar o <em>bônus VIP</em> 🎁`,
    p=>`<strong>${p} ${anyId(p)}</strong> sacou mais de <em>R$ ${rSach()}</em> do extra VIP de agente 💰`,
    p=>`<strong>${p} ${anyId(p)}</strong> já fez o segundo saque hoje com <em>recompensas de agente</em> 🚀`,
    p=>`<strong>${p} ${anyId(p)}</strong> cashback liberado: <em>R$ ${ramt()*2}</em> direto na conta 🔥`,
    p=>`<strong>${p} ${anyId(p)}</strong> resgatou benefício VIP exclusivo hoje 👑`,
    p=>`<strong>${p} ${anyId(p)}</strong> comissão de agente convertida em saque de <em>R$ ${ramt()}</em> 💰`,
  ];return{dot:'red',msg:rp(phrases)(p)};},
  function(){const p=anyPlat();const phrases=[
    p=>`<strong>${p} ${anyId(p)}</strong> depositou e já garantiu mais de <em>R$ 200</em> em recompensas de novo membro 💸`,
    p=>`🎁 <strong>Novo membro</strong> em <em>${p}</em> acabou de entrar e coletou <em>R$ 200</em> em bônus de iniciante`,
    p=>`<strong>${p} ${anyId(p)}</strong> primeiro depósito feito e bônus de <em>R$ 200</em> já liberado 🚀`,
    p=>`<strong>Novo VIP</strong> em <em>${p}</em> — entrada confirmada + bônus de boas-vindas de <em>R$ 5</em> liberado 🎁`,
    p=>`<strong>${p} ${anyId(p)}</strong> entrou hoje e já desbloqueou várias recompensas 🎯`,
  ];return{dot:'green',msg:rp(phrases)(p)};},
  ];
})();


let feedIndex=0;
const feedItem=document.getElementById('feed-item');
const feedText=document.getElementById('feed-text');
const feedDot=feedItem.querySelector('.feed-dot');
const feedTrack=document.getElementById('feed-track');

/**
 * Runs the horizontal marquee on the live-feed line when text is wider than the visible wrap.
 * Narrow screens have a smaller wrap, so overflow distance `max` is larger; we use a higher
 * pixels-per-second rate there so duration matches the intended “faster” feel (and matches
 * desktop tuning). `width: max-content` on `.feed-text` (CSS) keeps scrollWidth reliable on mobile WebKit.
 */
function scheduleFeedTextScroll(){
  if(!feedText) return;
  const wrap=feedText.parentElement;
  if(!wrap||!wrap.classList.contains('feed-text-wrap')) return;
  feedText.style.transition='none';
  feedText.style.transform='translateX(0)';
  void feedText.offsetWidth;
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      const max=feedText.scrollWidth-wrap.clientWidth;
      if(max<=0) return;
      const narrow=typeof window.matchMedia==='function'&&window.matchMedia('(max-width:768px)').matches;
      const pxPerSec=narrow?420:280;
      const minDur=narrow?2:2.5;
      const maxDur=narrow?5:6;
      const dur=Math.min(maxDur,Math.max(minDur,max/pxPerSec));
      feedText.style.transition='transform '+dur+'s linear';
      feedText.style.transform='translateX(-'+max+'px)';
    });
  });
}

function nextFeed(){
  feedIndex=Math.floor(Math.random()*feedTemplates.length);
  const tpl=feedTemplates[feedIndex];
  const data=tpl();
  if(feedText){
    feedText.style.transition='none';
    feedText.style.transform='translateX(0)';
  }
  // slide out
  feedItem.style.transition='transform .5s ease-in, opacity .4s ease-in';
  feedItem.style.transform='translateX(-120%)';
  feedItem.style.opacity='0';
  
  setTimeout(()=>{
    feedText.innerHTML=data.msg;
    feedDot.className='feed-dot '+data.dot;
    feedItem.style.transition='none';
    feedItem.style.transform='translateX(120%)';
    
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        feedItem.style.transition='transform .6s cubic-bezier(.25,.8,.25,1), opacity .5s ease-out';
        feedItem.style.transform='translateX(0)';
        feedItem.style.opacity='1';
        feedItem.classList.add('visible');
        setTimeout(scheduleFeedTextScroll,750);
      });
    });
  }, 550);
}

// Position item centered
feedItem.style.position='relative';
feedItem.style.left='auto';
feedItem.style.transform='translateX(120%)';
feedItem.style.opacity='0';
feedItem.style.display='flex';
feedItem.style.alignItems='center';
feedItem.style.width='100%';
feedItem.style.justifyContent='flex-start';

setTimeout(()=>{
  nextFeed();
  setInterval(nextFeed, 4500);
}, 800);

let feedScrollResizeTimer;
window.addEventListener('resize',function(){
  clearTimeout(feedScrollResizeTimer);
  feedScrollResizeTimer=setTimeout(function(){
    if(feedItem&&feedItem.classList.contains('visible')) scheduleFeedTextScroll();
  },120);
});

function cardClass(p){
  if(p.name==='POPBRA') return 'pcard card-founder';
  if(p.name==='POPBEA') return 'pcard card-latest';
  return 'pcard';
}
function crownBadge(p){
  if(p.name==='POPBRA') return '<div class="card-crown crown-founder">⭐ Original</div>';
  if(p.name==='POPBEA') return '<div class="card-crown crown-latest">🆕 Nova</div>';
  return '';
}

function renderCards(data){
  document.getElementById('pgrid').innerHTML=data.map(p=>{
    const col=platformColors[p.name]||'#CC0000';
    const colDim=col+'22';
    const colMid=col+'55';
    const extra=cardClass(p).includes('card-founder')?'card-founder':cardClass(p).includes('card-latest')?'card-latest':cardClass(p).includes('card-hot')?'card-hot':'';
    return `<div class="pcard2 ${extra}" onclick="openModal('${p.name}')" style="--accent:${col};--accent-dim:${colDim};--accent-mid:${colMid}">
      ${crownBadge(p)}
      <div class="pc2-status-top"><div class="pc-dot"></div> Ativa</div>
      <div class="pc2-top">
        <div class="pc2-logo-wrap">
          <img src="${p.logo}" alt="${p.name}"
            onload="this.closest('.pcard2').classList.add('has-logo')"
            onerror="this.style.display='none'"
            loading="lazy">
          <span class="pc2-logo-fallback">${p.name}</span>
        </div>
      </div>
      <div class="pc2-accent-bar"></div>
      <div class="pc2-days">${daysOnline(p.launch)}</div>
      <div class="pc2-date">Desde ${p.date}</div>
      <div class="pc2-fin">
        <div class="pc2-fin-cell">
          <span class="pc2-fin-lbl">Recarga</span>
          <span class="pc2-fin-val">${p.r}<em>R$</em></span>
        </div>
        <div class="pc2-fin-div"></div>
        <div class="pc2-fin-cell">
          <span class="pc2-fin-lbl">Saque</span>
          <span class="pc2-fin-val">${p.w}<em>R$</em></span>
        </div>
      </div>
      <button class="pc2-btn" onclick="event.stopPropagation();openModal('${p.name}')">ACESSAR ▶</button>
    </div>`;
  }).join('');
}

// Shuffle everything after POPBRA and POPBEA
function getShuffled(){
  const top = platforms.slice(0,2);
  const rest = platforms.slice(2);
  for(let i=rest.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [rest[i],rest[j]]=[rest[j],rest[i]];
  }
  return [...top,...rest];
}
renderCards(getShuffled());

document.querySelectorAll('.fb').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.fb').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const f=this.dataset.f;
    const filtered = f==='all' ? getShuffled() : (() => {
  const top=platforms.slice(0,2).filter(p=>p.r===f);
  const rest=platforms.slice(2).filter(p=>p.r===f);
  for(let i=rest.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[rest[i],rest[j]]=[rest[j],rest[i]];}
  return [...top,...rest];
})();
renderCards(filtered);
    observeCards();
  });
});

let cur=null;
function openModal(name){
  const p=name?platforms.find(x=>x.name===name):null;
  cur=p;
  const wrap=document.getElementById('m-logo-wrap');
  const col=p?platformColors[p.name]||'#CC0000':'#CC0000';
  if(p){
    wrap.classList.remove('no-logo');
    wrap.innerHTML=`<img src="${p.logo}" alt="${p.name}"
      onerror="this.parentElement.classList.add('no-logo');this.outerHTML='<span style=\\'font-family:Oswald,sans-serif;font-size:1.8rem;font-weight:700;color:${col}\\'>${p.name}</span>'"
      style="height:100%;max-width:200px;object-fit:contain;filter:drop-shadow(0 0 12px ${col}55)">`;
    const titleEl=document.getElementById('m-title');
    if(titleEl) titleEl.textContent='◆ '+p.name;w
    const noticeEl=document.getElementById('m-notice');
    if(noticeEl) noticeEl.innerHTML=`Você está acessando <strong>${p.name}</strong> pelo hub oficial POP REDE. Recarga mínima <strong>R$ ${p.r}</strong>.`;
    const confirmBtn=document.querySelector('.m-confirm');
    if(confirmBtn) confirmBtn.textContent=`▶ ACESSAR ${p.name}`;
  } else {
    wrap.classList.add('no-logo');
    wrap.innerHTML='<span>—</span>';
  }
  document.getElementById('mdate').innerHTML=p
  ? `Desde ${p.date} <span style="color:var(--red);font-weight:700;margin-left:.5rem">${daysOnline(p.launch)}</span>`
  : '—';
  document.getElementById('mrec').innerHTML=p?`${p.r}<em> R$</em>`:'—';
  document.getElementById('mwit').innerHTML=p?`${p.w}<em> R$</em>`:'—';
  document.getElementById('overlay').classList.add('on');
  document.body.style.overflow='hidden';
}
function closeModal(){document.getElementById('overlay').classList.remove('on');document.body.style.overflow='';}
function handleOverlay(e){if(e.target===document.getElementById('overlay'))closeModal();}
function doAccess(){
  if(cur && cur.url){
    closeModal();
    window.open(cur.url,'_blank','noopener,noreferrer');
  } else {
    closeModal();
  }
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

function observeCards(){
  document.getElementById('pgrid').querySelectorAll('.pcard2').forEach((c,i)=>{
    c.style.opacity='0';c.style.transform='translateY(15px)';
    c.style.transition=`opacity .4s ${i*25}ms,transform .4s ${i*25}ms`;
    setTimeout(()=>{c.style.opacity='1';c.style.transform='translateY(0)';},80+i*25);
  });
}
const cobs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){observeCards();cobs.unobserve(e.target);}});},{threshold:.05});
cobs.observe(document.getElementById('pgrid'));

window.addEventListener('scroll',()=>{document.querySelector('nav').style.borderBottomColor=window.scrollY>60?'rgba(204,0,0,0.35)':'rgba(204,0,0,0.2)';});


// ── 18+ GATE ───────────────────────────────────────────────────
(function(){
  if(!sessionStorage.getItem('age_ok')){
    const g=document.getElementById('gate');
    g.style.display='flex';
    setTimeout(function(){g.style.opacity='1';g.style.pointerEvents='all';},10);
    document.body.style.overflow='hidden';
    document.querySelector('.float-btns').style.display='none';
  }
})();
function closeGate(){
  sessionStorage.setItem('age_ok','1');
  const g=document.getElementById('gate');
  g.style.opacity='0';g.style.transition='opacity .4s';
  setTimeout(()=>{g.style.display='none';document.body.style.overflow='';document.querySelector('.float-btns').style.display='';},400);
}
function leaveGate(){ window.location.href='https://google.com'; }

// ── SECTION ORDER (homepage flow) ──────────────────────────────
(function(){
  const hero=document.getElementById('hero');
  if(!hero) return;
  const order=['testimonial','beneficios','eventos','platforms','ecosystem'];
  let prev=hero;
  order.forEach(function(id){
    const sec=document.getElementById(id);
    if(!sec) return;
    prev.insertAdjacentElement('afterend',sec);
    prev=sec;
  });
})();

// ── SCROLL TOP ─────────────────────────────────────────────────
const scrollTopBtn=document.getElementById('scroll-top');
const mobTrackedSections=['hero','testimonial','beneficios','eventos','platforms'];
function getActiveMobileSection(){
  const trigger=Math.max(120,Math.round(window.innerHeight*0.38));
  let active='hero';
  mobTrackedSections.forEach(function(id){
    const el=document.getElementById(id);
    if(!el) return;
    const rect=el.getBoundingClientRect();
    if(rect.top<=trigger && rect.bottom>trigger) active=id;
  });
  return active;
}
function syncMobileNavByScroll(){
  const active=getActiveMobileSection();
  document.querySelectorAll('.mob-nav-btn[data-section]').forEach(function(btn){
    btn.classList.toggle('active',btn.dataset.section===active);
  });
}
window.addEventListener('scroll',()=>{
  scrollTopBtn.classList.toggle('show',window.scrollY>400);
  syncMobileNavByScroll();
});
window.addEventListener('resize',syncMobileNavByScroll);
setTimeout(syncMobileNavByScroll,50);

// ── MOBILE NAV ─────────────────────────────────────────────────
function setMobActive(el){
  document.querySelectorAll('.mob-nav-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
}



// ── EVENT SLIDER ────────────────────────────────────────────────
(function(){
  const track=document.getElementById('ev-track');
  if(!track) return;
  const dotsEl=document.getElementById('ev-dots');
  const slides=track.querySelectorAll('.ev-slide');
  let current=0;
  const total=slides.length;

  // Build dots
  for(let i=0;i<total;i++){
    const d=document.createElement('button');
    d.className='ev-dot'+(i===0?' active':'');
    d.setAttribute('aria-label','Slide '+(i+1));
    d.onclick=(function(idx){return function(){goTo(idx);};})(i);
    dotsEl.appendChild(d);
  }

  function updateDots(idx){
    dotsEl.querySelectorAll('.ev-dot').forEach(function(d,i){
      d.classList.toggle('active',i===idx);
    });
  }
  function goTo(idx){
    if(idx<0) idx=total-1;
    if(idx>=total) idx=0;
    current=idx;
    // Scroll only inside the track — never move the page
    track.scrollTo({left:slides[idx].offsetLeft,behavior:'smooth'});
    updateDots(idx);
  }
  window.evCarousel=function(dir){goTo(current+dir);};

  // Sync dots on scroll
  let ticking=false;
  track.addEventListener('scroll',function(){
    if(!ticking){
      requestAnimationFrame(function(){
        const sw=slides[0]?slides[0].offsetWidth:1;
        const idx=Math.round(track.scrollLeft/sw);
        if(idx!==current){current=idx;updateDots(idx);}
        ticking=false;
      });
      ticking=true;
    }
  },{passive:true});

  // Auto-advance every 3.5s — pauses when user touches or hovers the carousel
  var autoTimer=setInterval(function(){goTo(current+1);},3500);
  function pauseAuto(){clearInterval(autoTimer);}
  function resumeAuto(){clearInterval(autoTimer);autoTimer=setInterval(function(){goTo(current+1);},3500);}
  track.addEventListener('mouseenter',pauseAuto);
  track.addEventListener('touchstart',pauseAuto,{passive:true});
  track.addEventListener('mouseleave',resumeAuto);
  track.addEventListener('touchend',function(){setTimeout(resumeAuto,4000);},{passive:true});
})();

// ── ANIMATED COUNTERS ──────────────────────────────────────────
function animateCounter(el,target,duration){
  duration=duration||1800;
  const start=performance.now();
  function step(now){
    const progress=Math.min((now-start)/duration,1);
    const ease=1-Math.pow(1-progress,3);
    const val=Math.floor(ease*target);
    if(target>=1000) el.textContent=(val/1000).toFixed(val>=10000?0:1)+'K+';
    else el.textContent=val;
    if(progress<1) requestAnimationFrame(step);
    else el.textContent=target>=1000?(target/1000).toFixed(0)+'K+':target;
  }
  requestAnimationFrame(step);
}
const counterObs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(!e.isIntersecting) return;
    const nums=e.target.querySelectorAll('.t-num');
    if(nums[0]) animateCounter(nums[0],500000);
    counterObs.unobserve(e.target);
  });
},{threshold:0.4});
const trustGrid=document.querySelector('.tgrid');
if(trustGrid) counterObs.observe(trustGrid);

// ── PLATFORM SEARCH ────────────────────────────────────────────
// === BENEFIT CAROUSEL ===
let bIndex = 1;
const bCards = document.querySelectorAll('#b-carousel .benefit-card');
let bTimer = null;

function syncBenefitDots() {
  const dots = document.querySelectorAll('#benefits-dots .benefits-dot');
  if (!dots.length) return;
  dots.forEach((d, i) => d.classList.toggle('active', i === bIndex));
}

function updateBCarousel() {
  if(!bCards.length) return;
  bCards.forEach((c, i) => {
    let pos = '';
    if(i === bIndex) pos = 'center';
    else if(i === (bIndex - 1 + 3) % 3) pos = 'left';
    else if(i === (bIndex + 1) % 3) pos = 'right';
    c.setAttribute('data-pos', pos);
  });
  syncBenefitDots();
}

function nextBCarousel() {
  bIndex = (bIndex + 1) % 3;
  updateBCarousel();
}

const bGrid = document.getElementById('b-carousel');
if(bGrid) {
  bTimer = setInterval(nextBCarousel, 3500);
  bGrid.addEventListener('mouseenter', () => clearInterval(bTimer));
  bGrid.addEventListener('mouseleave', () => bTimer = setInterval(nextBCarousel, 3500));
  bGrid.scrollLeft = 0;
  updateBCarousel();
}

window.handleBenefitClick = function(index) {
  // If user clicks a side card, rotate to it.
  if (index !== bIndex) {
    bIndex = index;
    updateBCarousel();
    // Don't open modal immediately if just rotating, or do both? 
    // Let's do both since prompt says "click on any... show up a pop up"
  }
  openBenefitModal(index);
};

window.openBenefitModal = function(index) {
  const card = bCards[index];
  const title = card.getAttribute('data-title');
  const link = card.getAttribute('data-link');
  
  document.getElementById('b-title').innerText = title;
  document.getElementById('b-iframe').src = link;
  
  document.getElementById('benefit-overlay').classList.add('on');
};

window.closeBenefitModal = function() {
  document.getElementById('benefit-overlay').classList.remove('on');
  setTimeout(() => {
    document.getElementById('b-iframe').src = '';
  }, 300); 
};

window.handleBenefitOverlayClick = function(e) {
  if(e.target === document.getElementById('benefit-overlay')) {
    closeBenefitModal();
  }
};
// ========================

function searchPlatforms(q){
  const query=q.trim().toLowerCase();
  document.querySelectorAll('.fb').forEach(function(b){b.classList.remove('active');});
  document.querySelector('.fb[data-f="all"]').classList.add('active');
  if(!query){ renderCards(getShuffled()); return; }
  const filtered=platforms.filter(function(p){return p.name.toLowerCase().includes(query);});
  if(filtered.length===0){
    document.getElementById('pgrid').innerHTML='<div class="search-no-results">Nenhuma plataforma encontrada</div>';
  } else {
    renderCards(filtered);
  }
}
document.querySelectorAll('.fb').forEach(function(btn){
  btn.addEventListener('click',function(){
    const si=document.getElementById('plat-search');
    if(si) si.value='';
  });
});

// ── EVENT COUNTDOWNS ───────────────────────────────────────────
function brazilNowFull(){
  const now=new Date();
  const utc=now.getTime()+now.getTimezoneOffset()*60000;
  return new Date(utc+(-3)*3600000);
}
function updateCountdowns(){
  document.querySelectorAll('.ev-countdown').forEach(function(el){
    const now=brazilNowFull();
    const h=parseInt(el.dataset.targetHour||'23');
    const m=parseInt(el.dataset.targetMin||'30');
    const weekday=el.dataset.targetWeekday!==undefined?parseInt(el.dataset.targetWeekday):-1;
    let target=new Date(now);
    if(weekday>=0){
      let daysAhead=weekday-now.getDay();
      if(daysAhead<0||(daysAhead===0&&(now.getHours()>h||(now.getHours()===h&&now.getMinutes()>=m)))) daysAhead+=7;
      target.setDate(now.getDate()+daysAhead);
      target.setHours(h,m,0,0);
      const diff=target-now;
      const days=Math.floor(diff/86400000);
      const hrs=Math.floor((diff%86400000)/3600000);
      const mins=Math.floor((diff%3600000)/60000);
      const blocks=el.querySelectorAll('.ev-cd-num');
      if(blocks[0]) blocks[0].textContent=String(days).padStart(2,'0');
      if(blocks[1]) blocks[1].textContent=String(hrs).padStart(2,'0');
      if(blocks[2]) blocks[2].textContent=String(mins).padStart(2,'0');
    } else {
      target.setHours(h,m,0,0);
      if(target<=now) target.setDate(target.getDate()+1);
      const diff=target-now;
      const hrs=Math.floor(diff/3600000);
      const mins=Math.floor((diff%3600000)/60000);
      const secs=Math.floor((diff%60000)/1000);
      const blocks=el.querySelectorAll('.ev-cd-num');
      if(blocks[0]) blocks[0].textContent=String(hrs).padStart(2,'0');
      if(blocks[1]) blocks[1].textContent=String(mins).padStart(2,'0');
      if(blocks[2]) blocks[2].textContent=String(secs).padStart(2,'0');
    }
  });
}
updateCountdowns();
setInterval(updateCountdowns,1000);


// ── BENEFITS CAROUSEL (mobile dots + swipe; no horizontal scroll — breaks absolute centering) ─
(function(){
  var grid=document.querySelector('.benefits-grid');
  var dotsWrap=document.getElementById('benefits-dots');
  if(!grid||!dotsWrap) return;
  var total=grid.querySelectorAll('.benefit-card').length;
  if(!total) return;

  for(var i=0;i<total;i++){
    var d=document.createElement('div');
    d.className='benefits-dot';
    (function(idx){d.addEventListener('click',function(){bIndex=idx;updateBCarousel();});})(i);
    dotsWrap.appendChild(d);
  }

  grid.scrollLeft=0;
  syncBenefitDots();

  var touchX=0;
  grid.addEventListener('touchstart',function(e){touchX=e.touches[0].clientX;},{passive:true});
  grid.addEventListener('touchend',function(e){
    var diff=touchX-e.changedTouches[0].clientX;
    if(Math.abs(diff)<45) return;
    if(diff>0) nextBCarousel();
    else{bIndex=(bIndex-1+total)%total;updateBCarousel();}
  },{passive:true});

  window.addEventListener('resize',function(){grid.scrollLeft=0;});
})();

// ── TESTIMONIAL GALLERY (winner carousel + lightbox) ───────────
(function(){
  var track=document.getElementById('tm-track');
  var carousel=document.getElementById('tm-carousel');
  var prevBtn=document.getElementById('tm-prev');
  var nextBtn=document.getElementById('tm-next');
  var lightbox=document.getElementById('tm-lightbox');
  var lightboxImg=document.getElementById('tm-lightbox-img');
  if(!track||!carousel||!prevBtn||!nextBtn||!lightbox||!lightboxImg) return;

  /* asset/winner: 1.webp plus Screenshot_1.webp … Screenshot_264.webp (265 images total). */
  var winnerImages=['asset/winner/1.webp'];
  for(var i=1;i<=264;i++) winnerImages.push('asset/winner/Screenshot_'+i+'.webp');

  track.innerHTML=winnerImages.map(function(src,idx){
    var label='Winner '+(idx+1);
    return '<button class="tm-item" type="button" data-src="'+src+'" data-alt="'+label+'" aria-label="Abrir imagem '+(idx+1)+'"><img src="'+src+'" alt="'+label+'" loading="lazy"></button>';
  }).join('');

  /* Horizontal scroll lives on .tm-track (overflow-x:auto); .tm-carousel is overflow:hidden — scroll track, not carousel. */
  function tmTrackGapPx(){
    var g=getComputedStyle(track).gap;
    if(!g||g==='normal') return 4;
    var n=parseFloat(g,10);
    return isNaN(n)?4:n;
  }
  function scrollStep(dir){
    var first=track.querySelector('.tm-item');
    if(!first) return;
    var step=first.offsetWidth+tmTrackGapPx();
    track.scrollBy({left:dir*step,behavior:'smooth'});
  }

  prevBtn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();scrollStep(-1);});
  nextBtn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();scrollStep(1);});

  var autoTimer=null;
  function startAuto(){
    clearInterval(autoTimer);
    autoTimer=setInterval(function(){
      if(track.scrollLeft+track.clientWidth>=track.scrollWidth-8){
        track.scrollTo({left:0,behavior:'smooth'});
      } else {
        scrollStep(1);
      }
    },2800);
  }
  startAuto();
  var tmWrap=prevBtn.closest('.tm-wrap');
  function pauseAuto(){clearInterval(autoTimer);}
  if(tmWrap){
    tmWrap.addEventListener('mouseenter',pauseAuto);
    tmWrap.addEventListener('mouseleave',startAuto);
  }
  track.addEventListener('touchstart',pauseAuto,{passive:true});
  track.addEventListener('touchend',function(){setTimeout(startAuto,2400);},{passive:true});

  window.openTestimonialLightbox=function(src,alt){
    lightboxImg.src=src;
    lightboxImg.alt=alt||'Testimonial';
    lightbox.classList.add('on');
    document.body.style.overflow='hidden';
  };
  window.closeTestimonialLightbox=function(ev){
    if(ev && ev.target && ev.target!==lightbox) return;
    lightbox.classList.remove('on');
    document.body.style.overflow='';
    setTimeout(function(){lightboxImg.src='';},180);
  };

  track.addEventListener('click',function(ev){
    var item=ev.target.closest('.tm-item');
    if(!item) return;
    openTestimonialLightbox(item.dataset.src,item.dataset.alt);
  });
})();

// ── EVENT BOARD MOBILE CAROUSEL (pop in / pop out) ─────────────
(function(){
  var board=document.querySelector('.ev-board');
  var dotsWrap=document.getElementById('ev-board-dots');
  if(!board||!dotsWrap) return;
  var cards=board.querySelectorAll('.ev-card');
  var total=cards.length;
  if(!total) return;

  // Build dots
  for(var i=0;i<total;i++){
    var d=document.createElement('div');
    d.className='ev-board-dot'+(i===0?' active':'');
    d.addEventListener('click',(function(idx){return function(){goTo(idx);};})(i));
    dotsWrap.appendChild(d);
  }
  var dots=dotsWrap.querySelectorAll('.ev-board-dot');
  var current=0,autoTimer=null,animating=false;

  function updateDots(idx){
    dots.forEach(function(dd,j){dd.classList.toggle('active',j===idx);});
  }

  function goTo(idx){
    if(animating||idx===current) return;
    if(idx<0) idx=total-1;
    if(idx>=total) idx=0;
    animating=true;
    // Pop out current
    cards[current].classList.remove('ev-active');
    cards[current].classList.add('ev-pop-out');
    // Pop in next
    cards[idx].classList.add('ev-active');
    var prev=current;
    current=idx;
    updateDots(idx);
    setTimeout(function(){
      cards[prev].classList.remove('ev-pop-out');
      animating=false;
    },460);
    resetAuto();
  }

  // Init: first card active
  function initMobile(){
    cards.forEach(function(c){c.classList.remove('ev-active','ev-pop-out');});
    cards[0].classList.add('ev-active');
    current=0;updateDots(0);animating=false;
  }

  // Auto-slide every 3.5s
  function startAuto(){
    autoTimer=setInterval(function(){
      if(window.innerWidth>768) return;
      goTo((current+1)%total);
    },3500);
  }
  function resetAuto(){clearInterval(autoTimer);startAuto();}

  // Swipe detection
  var touchX=0;
  board.addEventListener('touchstart',function(e){
    clearInterval(autoTimer);
    touchX=e.touches[0].clientX;
  },{passive:true});
  board.addEventListener('touchend',function(e){
    var diff=touchX-e.changedTouches[0].clientX;
    if(Math.abs(diff)>40){
      if(diff>0) goTo((current+1)%total);
      else goTo((current-1+total)%total);
    }
    setTimeout(resetAuto,3000);
  },{passive:true});

  function checkMobile(){
    if(window.innerWidth<=768){initMobile();startAuto();}
    else{clearInterval(autoTimer);cards.forEach(function(c){c.classList.remove('ev-active','ev-pop-out');});}
  }
  checkMobile();
  window.addEventListener('resize',function(){clearInterval(autoTimer);animating=false;checkMobile();});
})();

// ── PARTICLES ──────────────────────────────────────────────────
(function(){
  const canvas=document.getElementById('particles-canvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,particles=[];
  function particleTarget(){
    return window.innerWidth<=768 ? 44 : 100;
  }
  function syncParticleCount(){
    const target=particleTarget();
    while(particles.length<target) particles.push(new Particle());
    if(particles.length>target) particles.length=target;
  }
  
  // Make sure it takes the size of its PARENT container accurately
  function resize(){
    const parent = canvas.parentElement;
    W=canvas.width=parent.offsetWidth;
    H=canvas.height=parent.offsetHeight;
  }
  
  resize();
  syncParticleCount();
  window.addEventListener('resize',resize);
  window.addEventListener('resize',syncParticleCount);
  
  function Particle(startY){
    this.x=Math.random()*W;
    this.y=startY !== undefined ? startY : Math.random()*H;
    this.r=Math.random()*2.0+1.0; 
    this.vx=(Math.random()-.5)*0.3;
    this.vy=Math.random()*0.6+0.2; 
    this.alpha=Math.random()*0.8+0.2; 
    this.decay=Math.random()*0.003+0.001;
    const isRed=Math.random()<0.6;
    this.colorPrefix=isRed ? 'rgba(255,70,70,' : 'rgba(255,200,80,';
  }
  Particle.prototype.update=function(){
    this.x+=this.vx;this.y+=this.vy;
    this.alpha-=this.decay;
  };
  
  function draw(){
    // Use the parent's actual computed dimensions to check for changes
    if(canvas.parentElement && (canvas.width !== canvas.parentElement.offsetWidth || canvas.height !== canvas.parentElement.offsetHeight)){
      resize();
    }
    
    ctx.clearRect(0,0,W,H);
    particles.forEach(function(p,i){
      p.update();
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = p.colorPrefix + Math.max(0, p.alpha) + ')';
      ctx.fill();
      if(p.alpha<=0 || p.y > H + 10) {
        particles[i]=new Particle(-Math.random()*20);
        // Important: When respawning, ensure its X is recalculated based on the CURRENT W, 
        // in case the screen was resized while the particle was alive.
        particles[i].x = Math.random() * W; 
      }
    });
    requestAnimationFrame(draw);
  }
  
  // Also delay initial sizing by a tick to ensure CSS has applied
  setTimeout(resize, 100);
  
  draw();
})();

// ── HOT BADGE (daily seed) ──────────────────────────────────────
(function(){
  const d=new Date();
  const seed=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
  function seededRand(s){s=Math.sin(s)*10000;return s-Math.floor(s);}
  const total=platforms.length;
  const hotCount=Math.min(4,Math.floor(total*0.2));
  const hotSet=new Set();
  let attempt=0;
  while(hotSet.size<hotCount && attempt<200){
    const idx=Math.floor(seededRand(seed+attempt++)*total);
    // Never make POPBRA or POPBEA hot (they have their own badge)
    if(idx>=2) hotSet.add(idx);
  }
  platforms.forEach(function(p,i){p._hot=hotSet.has(i);});
})();

// Patch cardClass and crownBadge for hot
const _origCardClass=cardClass;
cardClass=function(p){
  if(p._hot && p.name!=='POPBRA' && p.name!=='POPBEA') return _origCardClass(p)+' card-hot';
  return _origCardClass(p);
};
const _origCrown=crownBadge;
crownBadge=function(p){
  if(p._hot && p.name!=='POPBRA' && p.name!=='POPBEA') return '<div class="card-crown crown-hot">🔥 Hot</div>';
  return _origCrown(p);
};

// Re-render with hot badges applied
renderCards(getShuffled());

// ── EVENT POPUP ────────────────────────────────────────────────
function openEvPopup(){
  document.getElementById('ev-popup-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeEvPopup(){
  document.getElementById('ev-popup-overlay').classList.remove('open');
  document.body.style.overflow='';
}
function handleEvOverlay(e){if(e.target===document.getElementById('ev-popup-overlay'))closeEvPopup();}
function switchEvTab(idx,btn){
  document.querySelectorAll('.ev-tab').forEach(function(t){t.classList.remove('active');});
  document.querySelectorAll('.ev-tab-panel').forEach(function(p){p.classList.remove('active');});
  btn.classList.add('active');
  document.getElementById('ev-panel-'+idx).classList.add('active');
}
function openSpecialEvent(idx){
  openEvPopup();
  var tabs=document.querySelectorAll('.ev-tab');
  if(tabs[idx]) switchEvTab(idx,tabs[idx]);
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    closeEvPopup();
    closeModal();
    if(typeof closeTestimonialLightbox==='function') closeTestimonialLightbox();
  }
});
