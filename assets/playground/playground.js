/* Shared bilingual previews and the published Playground. No analytics or storage. */
(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const published = document.documentElement.dataset.site === 'production';
  const theme = published ? 'play' : ['editorial', 'play', 'studio'].includes(params.get('theme')) ? params.get('theme') : 'editorial';
  const lang = published ? (document.documentElement.lang === 'en' ? 'en' : 'zh') : params.get('lang') === 'en' ? 'en' : 'zh';
  const en = lang === 'en';
  const aligned = document.documentElement.dataset.skin === 'ink';
  const entry = aligned ? 'ink.html' : 'concept.html';
  const assetBase = published ? document.documentElement.dataset.assetBase : 'assets/';
  const assetVersion = published ? `?v=${document.documentElement.dataset.release}` : '';
  const languageLink = published ? (en ? '../' : 'en/') : `${entry}?theme=${theme}&lang=${en ? 'zh' : 'en'}`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pick = (zh, english) => en ? english : zh;
  const t = {
    names: pick(['A · 品牌编辑部', 'B · 消气游乐场', 'C · 陪伴小站'], ['A · The Editorial', 'B · The Playground', 'C · The Companion']),
    title: pick(['这口气，<br><em>有地方放了。</em>', '气成这样？<br><em>砸一下试试。</em>', '先照顾<br><em>你的心情。</em>'], ['Give that anger<br><em>somewhere to go.</em>', 'Mad again?<br><em>Take it out here.</em>', 'A little company.<br><em>A little less mad.</em>']),
    intro: pick([
      '他说那句话，你已经在脑内吵了八百遍。<br>来，做一件很小、很解气的事。',
      '想发火？手上先有点动作。<br>不用下载，现在就能试着砸一块。',
      '这会儿不想听大道理，也没关系。<br>发泄一下，换个念头，或者让我们哄哄你。'
    ], [
      'Still replaying that conversation? Give your hands<br>something to do. Give your head a tiny break.',
      'Too mad to think? Put your hands to work.<br>No download needed to try this little smash.',
      'You don’t have to talk it through right now.<br>Let it out, switch gears, or let us keep you company.'
    ]),
    tag: pick(['给气头上的你，一个小出口', '消气小游戏 · 可以先玩再下载', '生气的时候，也有人站你这边'], ['A SMALL APP FOR BIG FEELINGS', 'ANGER RELIEF · TRY A LITTLE FIRST', 'A LITTLE HELP WHEN YOU’RE A LOT MAD']),
    download: pick('App Store 免费下载', 'Get Unmad for iPhone'),
    trial: pick('先在这里玩一下', 'Try a little here'),
    nav: pick(['怎么玩', '关于隐私', '常见问题'], ['How it works', 'Privacy', 'Questions']),
    free: pick('免费使用 · 无广告 · 不用注册', 'Free to use · No ads · No sign-up'),
    pause: pick('一次小暂停', 'A little breather'),
    games: pick('轻巧小游戏', 'Little activities'),
    local: pick('记录留在手机', 'Your data stays yours'),
    sectionTitle: pick('现在，想怎么来？', 'What do you need right now?'),
    sectionSub: pick('不用把事情想明白。先挑一个顺手的。', 'No need to figure it all out. Just pick something.'),
    modes: pick(['我想发泄', '别让我想了', '哄哄我'], ['Let it out', 'Switch gears', 'Keep me company']),
    modeTitles: pick(['把这口气，砸成小碎片。', '大脑，先换个台。', '收到，今天站你这边。'], ['Give that anger something to hit.', 'A new channel for your brain.', 'Okay. We’re on your side.']),
    modeBody: pick([
      '切掉烦恼、砸碎这破事、戳破怒气泡泡。把手指忙起来，让脑内吵架先暂停一下。',
      '火锅还是烧烤？海边还是雪山？做几个不费劲的选择，把注意力从刚才那句话上挪开。',
      '娘娘息怒、管他呢、给我蹦迪。想被哄就被哄，谁都不想听，也有团子陪着你。'
    ], [
      'Slice a worry, smash that mess, pop a rage bubble. A few small things to do while the heat passes.',
      'Beach or mountains? Cats or dogs? Make a few easy choices and give that replay loop a break.',
      'A little reassurance, a little nonsense, a little dance break. Or quiet company, if that’s all you want.'
    ]),
    modeList: pick([
      ['切掉烦恼', '砸碎这破事', '怒气泡泡', '扔掉这个念头', '撕掉标签'],
      ['脑子换个台', '找找看', '整理一下', '敲木鱼', '捏团子'],
      ['娘娘息怒', '不值得', '管他呢', '给我蹦迪']
    ], [
      ['Slice the Noise', 'Smash This Crap', 'Rage Bubbles', 'Bin That Thought', 'Rip the Labels'],
      ['Brain, Change the Channel', 'Look Around', 'Tidy Something', 'Tap for Merit', 'Squish It'],
      ['Your Majesty', 'Not Worth It', 'Whatever', 'Dance It Off']
    ]),
    demo: pick('网页小试玩', 'A little website demo'),
    demoNote: pick('演示数字随点击变化，不代表实际消气效果。', 'Demo numbers respond to clicks; they aren’t a measure of real relief.'),
    bubbleTitle: pick('这几颗气，先戳掉。', 'Pop a little of that rage.'),
    bubbleHint: pick('一颗一颗来。不用想。', 'One at a time. No thinking needed.'),
    smash: pick('他怎么又不回消息！', 'Read. No reply. AGAIN.'),
    smashHint: pick('点一下，砸掉一点。', 'Tap it. Put a dent in it.'),
    smashed: pick('已碎，概不维修。', 'Broken. No repairs offered.'),
    again: pick('再来一块 ↻', 'Smash another ↻'),
    counter: pick('试玩进度', 'Demo progress'),
    privacyTitle: pick('你写的话，只留给你。', 'Your words are yours.'),
    privacyBody: pick('没有账号。心情记录和冷静箱留在你的手机里，你写的字不上传，想说的话也不会发给任何人。', 'No account. Your notes and cool-down drafts stay on your phone, and nothing you write gets uploaded. There’s no send button.'),
    privacyLink: pick('看看隐私说明 ↗', 'Read the privacy policy ↗'),
    noteTitle: pick('气头上的话，先写给自己。', 'Write it now. Decide later.'),
    noteBody: pick('可以顺手放进冷静箱。5、10、30 分钟，到点了，再决定。', 'Give that draft 5, 10, or 30 minutes. Read it again, then decide.'),
    faqTitle: pick('你可能还想知道', 'A few things you might wonder'),
    faq: pick([
      ['不气了是什么？', '一款免费的 iPhone 消气 App。吵完架、气头上，玩一个 30 到 90 秒的发泄解压小游戏，或者把想说的话先写下来，先别发。'],
      ['是免费的吗？', '核心功能免费使用，无广告、无订阅。'],
      ['一定要注册才能用吗？', '不用。没有账号，打开就能用，断网也能玩。'],
      ['我写的话会发给他吗？', '不会。不气了没有发送功能，冷静箱到点也只会把这段话再拿给你看。'],
      ['有安卓版吗？', '目前是 iPhone App。中英文都可以在 App 内切换。']
    ], [
      ['What is Unmad?', 'A free anger relief app for iPhone. Quick venting and stress relief games for when you’re too mad to think, plus a place to write it all down instead of hitting send.'],
      ['Is it free?', 'The core features are free, with no ads or subscription.'],
      ['Do I need an account?', 'No sign-up, no login. Just open it. It works offline too.'],
      ['Can my draft get sent to anyone?', 'No. Unmad has no send button. When a cool-down ends, you simply get to read your draft again.'],
      ['Is there an Android version?', 'It’s an iPhone app for now. You can switch between English and Simplified Chinese in the app.']
    ]),
    closeTitle: pick('好了，就去过你的日子。', 'Feel a little better? Go live your life.'),
    closeBody: pick('不气了的目标，是让你少待一会儿。', 'The goal is a little less time here, and a little more life out there.'),
    comforts: pick(['收到，站你这边。', '这口气，我们先接住。', '不想说，也可以待一会儿。', '今晚先放过自己，好不好。'], ['Okay. We’re on your side.', 'That was a lot. Take a little break.', 'You don’t have to say anything.', 'You can leave the replay for later.']),
    comfortButton: pick('再哄我一句 →', 'One more kind word →')
  };
  const idx = { editorial: 0, play: 1, studio: 2 }[theme];
  if (aligned) {
    t.title = pick([
      '这口气，<br>有<span class="marker-word">地方</span>放了。',
      '气成这样？<br><span class="marker-word wide">砸一下</span>试试。',
      '先照顾<br>你的<span class="marker-word">心情</span>。'
    ], [
      'Give that anger<br><span class="marker-word wide">somewhere</span> to go.',
      'Mad again?<br><span class="marker-word wide">Take it out</span> here.',
      'A little company.<br>A little <span class="marker-word wide">less mad.</span>'
    ]);
  }
  const store = en ? 'https://apps.apple.com/app/id6809241933' : 'https://apps.apple.com/cn/app/id6809241933';
  const policy = published ? 'privacy.html' : en ? '../site/en/privacy.html' : '../site/privacy.html';
  const support = published ? 'support.html' : en ? '../site/en/support.html' : '../site/support.html';
  const asset = name => aligned ? `${assetBase}live/${name}-${lang}.${published ? 'webp' : 'png'}${assetVersion}` : `assets/${name}-${lang}.${en ? 'webp' : 'png'}`;
  const face = (expression = 'smile') => `<span class="face ${expression}" aria-hidden="true"><i class="brow left"></i><i class="brow right"></i><i class="eye left"></i><i class="eye right"></i><i class="mouth"></i><i class="cheek left"></i><i class="cheek right"></i></span>`;
  const phone = (name, cls = '') => `<div class="phone ${cls}"><img src="${asset(name)}" ${published ? 'loading="lazy" width="402" height="874"' : ''} alt="${pick('不气了 App 实际界面', 'An actual Unmad app screen')}"></div>`;
  const download = cls => `<a class="button primary ${cls || ''}" href="${store}" target="_blank" rel="noopener"><span class="apple" aria-hidden="true">●</span>${t.download}<span aria-hidden="true">↗</span></a>`;
  const message = `<p class="eyebrow"><span class="live-dot"></span>${t.tag[idx]}</p><h1>${t.title[idx]}</h1><p class="intro">${t.intro[idx]}</p>`;
  const heading = `<div class="hero-copy">${aligned && theme === 'editorial' ? `<div class="ink-hero-message">${message}</div>` : message}<div class="hero-actions">${download()}<a class="try-link" href="#try">${t.trial} <span>↓</span></a></div><p class="micro">${t.free}</p></div>`;
  const bubbles = (count = 8) => `<div class="bubble-field">${Array.from({ length: count }, (_, i) => `<button class="rage-bubble b-${i % 8}" aria-label="${pick('戳掉怒气', 'Pop rage bubble')} ${i + 1}">${i % 3 === 0 ? face('mad') : '<span>×</span>'}</button>`).join('')}</div>`;
  const score = `<div class="demo-score"><span>${t.counter}</span><div class="progress"><i style="width:0%"></i></div><b class="score-value">0 / 8</b></div>`;
  const smash = `<div class="smash-game" data-game="smash"><div class="game-top"><span><i class="live-dot"></i>${t.demo}</span><span>01 / SMASH</span></div><div class="smash-wrap"><button class="smash-slab" aria-label="${pick('砸这块板子', 'Smash this slab')}"><span class="bolt bolt1"></span><span class="bolt bolt2"></span><span class="bolt bolt3"></span><span class="bolt bolt4"></span><strong>${t.smash}</strong><span class="cracks"></span></button><div class="smash-result" hidden>${face()}<strong>${t.smashed}</strong><button class="reset-game">${t.again}</button></div></div><div class="game-footer"><span class="smash-hint">${t.smashHint}</span><span class="hit-count">0 / 5</span></div></div>`;
  let hero;
  if (theme === 'editorial') {
    hero = `<section class="hero hero-editorial wrap">${heading}<div class="editorial-scene"><div class="scene-orbit"></div><span class="scene-spark spark-one">✳</span><span class="scene-spark spark-two">✦</span><span class="vertical-note">A TINY RESET, IN YOUR POCKET.</span>${phone('home', 'hero-phone')}<div class="floating-note">${face('mad')}<div><small>${pick('刚刚还是', 'A minute ago')}</small><strong>${pick('气死我了。', 'SO. MAD.')}</strong></div></div><button class="float-bubble rage-bubble b-1" aria-label="${pick('戳掉这颗气', 'Pop this rage bubble')}">×</button><div class="little-receipt"><span>${pick('给心情一个出口', 'A little way out')}</span><strong>${pick('生气 → 做点小事', 'MAD → DO ONE THING')}</strong><div class="receipt-dashes"></div><small>${pick('不用讲道理，先玩一会儿。', 'A little play. A little space.')}</small></div></div></section>`;
  } else if (theme === 'play') {
    hero = `<section class="hero hero-play wrap">${heading}<div class="play-scene"><div class="play-side left-side"><span class="orbit-caption">${pick('先戳一颗', 'POP ONE')}</span>${face('mad')}<span class="orbit-star">✳</span><button class="play-bubble rage-bubble b-2" aria-label="${pick('戳掉旁边的气泡', 'Pop the side bubble')}">×</button></div>${smash}<div class="play-side right-side"><span class="small-sticker">${pick('理智，<br>等会儿再上线。', 'REASON<br>CAN WAIT.')}</span><span class="orbit-caption lower">${pick('已碎，概不维修。', 'NO REPAIRS.')}</span><span class="orbit-star">✦</span></div></div><p class="demo-disclaimer">${t.demoNote}</p></section>`;
  } else {
    hero = `<section class="hero hero-studio wrap">${heading}<div class="studio-scene"><div class="studio-cloud cloud-one"></div><div class="studio-cloud cloud-two"></div><div class="studio-message"><span class="message-label">${pick('团子在这里', 'HERE WITH YOU')}</span><p class="comfort-line" aria-live="polite">${t.comforts[0]}</p><button class="comfort-button">${t.comfortButton}</button></div>${phone('comfort', 'studio-phone')}<div class="studio-companion">${face()}<span>${pick('不用马上变好。', 'One small thing at a time.')}</span></div><span class="studio-spark">✳</span></div></section>`;
  }
  document.documentElement.lang = en ? 'en' : 'zh-Hans';
  if (!published) document.title = `${t.names[idx]} · Unmad`;
  document.body.className = `${theme} ${en ? 'english' : 'chinese'}${aligned ? ' app-ink' : ''}${published ? ' published' : ''}${reduced ? ' motion-off' : ''}`;
  document.getElementById('app').innerHTML = `
    ${published ? '' : `<div class="proposal-bar"><a href="index.html?lang=${lang}${aligned ? '&skin=ink' : ''}">← ${pick('三套方案', 'All three concepts')}</a><span>${t.names[idx]} <i>·</i> ${aligned ? pick('新版 App 风格', 'CURRENT APP STYLE') : pick('设计预览', 'Design preview')}</span><button id="motion" aria-pressed="${!reduced}">${pick('动效', 'Motion')} ${reduced ? 'OFF' : 'ON'}</button></div>`}
    <header class="site-header wrap"><a class="brand" href="#top">${en ? aligned ? '<strong>UN<span class="brand-red">MAD</span></strong>' : '<strong>Unmad</strong>' : `<img src="${assetBase}wordmark.png${assetVersion}" alt="不气了"><span>UNMAD</span>`}</a><nav aria-label="${pick('网站导航', 'Site navigation')}"><a href="#how">${t.nav[0]}</a><a href="#privacy">${t.nav[1]}</a><a href="#faq">${t.nav[2]}</a></nav><div class="header-actions"><a class="language" href="${languageLink}" hreflang="${en ? 'zh-Hans' : 'en'}" lang="${en ? 'zh-Hans' : 'en'}">${en ? '中文' : 'EN'} <span>↗</span></a><a class="nav-download" href="${store}" target="_blank" rel="noopener">${pick('获取 App', 'Get the app')} ↗</a></div></header>
    <main id="top">${hero}
    <div class="facts wrap"><div><strong>30–90<span>s</span></strong><p>${t.pause}</p></div><div><strong>10</strong><p>${t.games}</p></div><div><strong>${pick('只在本地', 'On-device')}</strong><p>${t.local}</p></div><div class="facts-caption"><span>LESS RAGE.<br>MORE LIFE.</span><i>↘</i></div></div>
    <section id="how" class="feature-section wrap section"><div class="section-head"><div><p class="eyebrow">01 / ${pick('一件小事，三种方向', 'ONE SMALL THING, THREE WAYS')}</p><h2>${t.sectionTitle}</h2></div><p>${t.sectionSub}</p></div>
      <div class="feature-layout"><div class="feature-copy"><div class="mode-tabs" role="tablist" aria-label="${pick('消气方向', 'Ways to reset')}">${t.modes.map((m, i) => `<button id="mode-${i}" role="tab" aria-controls="mode-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-mode="${i}"><span>0${i + 1}</span>${m}<i>↗</i></button>`).join('')}</div><div id="mode-panel" role="tabpanel" aria-labelledby="mode-0" tabindex="0"><h3 id="mode-title">${t.modeTitles[0]}</h3><p id="mode-body">${t.modeBody[0]}</p><div id="mode-list" class="activity-pills">${t.modeList[0].map(x => `<span>${x}</span>`).join('')}</div></div><a class="text-link" href="#try">${t.trial} ↗</a></div><div class="feature-art"><div class="feature-shape"></div>${phone('smash', 'feature-phone')}<span class="feature-label">${pick('实际 App 界面', 'ACTUAL APP SCREEN')}</span></div></div>
    </section>
    <section id="try" class="try-section wrap section"><div class="section-head"><div><p class="eyebrow">02 / ${pick('手上先有点动作', 'PUT YOUR HANDS TO WORK')}</p><h2>${t.bubbleTitle}</h2></div><button id="refill" class="outline-button">${pick('换一盘气泡 ↻', 'Fresh bubbles ↻')}</button></div><div class="bubble-demo"><div class="bubble-copy"><span class="pill-label">${t.demo}</span><h3>${t.bubbleHint}</h3><p class="bubble-response" aria-live="polite">${pick('点右边任意一颗，试试手感。', 'Tap any bubble. See how it feels.')}</p>${score}<p class="demo-disclaimer">${t.demoNote}</p></div>${bubbles()}</div></section>
    <section class="small-features wrap section"><article class="note-card"><div class="small-icon">✎</div><p class="eyebrow">${pick('写下来 · 先别发', 'WRITE IT DOWN · DON’T SEND IT')}</p><h3>${t.noteTitle}</h3><p>${t.noteBody}</p><div class="timer-options" role="group" aria-label="${pick('冷静时间演示', 'Cool-down preview')}">${[5, 10, 30].map(n => `<button data-minutes="${n}" aria-pressed="${n === 5}">${n} ${pick('分钟', 'min')}</button>`).join('')}</div><div class="timer-message" aria-live="polite">${pick('先替你收着 5 分钟。', 'We’ll hold it for 5 minutes.')}</div></article><article class="privacy-card" id="privacy"><div class="small-icon">⌑</div><p class="eyebrow">${pick('隐私 · 从一开始就这样', 'PRIVATE, FROM THE START')}</p><h3>${t.privacyTitle}</h3><p>${t.privacyBody}</p><div class="privacy-tags"><span>${pick('不用注册', 'No sign-up')}</span><span>${pick('断网也能用', 'Works offline')}</span><span>${pick('没有发送按钮', 'No send button')}</span></div><a class="text-link" href="${policy}" target="_blank" rel="noopener">${t.privacyLink}</a></article></section>
    <section class="faq-section wrap section" id="faq"><div><p class="eyebrow">03 / FAQ</p><h2>${t.faqTitle}</h2></div><div class="faq-items">${t.faq.map(([q, a]) => `<details><summary>${q}<span>+</span></summary><p>${a}</p></details>`).join('')}</div></section>
    <section class="closing wrap section">${face()}<h2>${t.closeTitle}</h2><p>${t.closeBody}</p>${download()}</section>
    </main><footer class="wrap"><div class="footer-brand"><span>© 2026 Unmad · 不气了</span>${published ? `<p><a href="mailto:hellounmad1@gmail.com">hellounmad1@gmail.com</a></p>${en ? '' : '<p class="beian"><a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">鲁ICP备2026055416号-2</a></p>'}` : ''}</div><div class="footer-links">${published ? `<a href="features.html">${pick('玩法', 'Games')}</a><a href="changelog.html">${pick('更新记录', 'What’s new')}</a>` : ''}<a href="${policy}" target="_blank" rel="noopener">${t.nav[1]}</a><a href="${support}" target="_blank" rel="noopener">${pick('联系与支持', 'Support')}</a>${published ? `<a href="terms.html">${pick('使用条款', 'Terms')}</a><button id="motion" type="button" aria-pressed="${!reduced}">${pick('动效', 'Motion')} ${reduced ? 'OFF' : 'ON'}</button>` : `<a href="index.html?lang=${lang}${aligned ? '&skin=ink' : ''}">${pick('返回方案总览', 'Back to concepts')} ↗</a>`}</div></footer><div id="toast" role="status"></div>`;

  // Use native anchors, buttons and details; every product interaction works on touch and keyboard.
  let motion = !reduced;
  const motionButton = document.getElementById('motion');
  motionButton.addEventListener('click', () => {
    motion = !motion;
    document.body.classList.toggle('motion-off', !motion);
    motionButton.setAttribute('aria-pressed', String(motion));
    motionButton.textContent = `${pick('动效', 'Motion')} ${motion ? 'ON' : 'OFF'}`;
  });
  const toast = document.getElementById('toast');
  let toastTimer;
  function tell(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2200); }
  function burst(element) {
    if (!motion) return;
    const r = element.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('i');
      p.className = 'particle';
      const a = i * Math.PI / 4;
      p.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;--x:${Math.cos(a) * 65}px;--y:${Math.sin(a) * 65}px;--r:${i * 58}deg;background:${['#F24738', '#FFE05D', '#b7a5ef'][i % 3]}`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 700);
    }
  }
  let popped = 0;
  function bindBubbles() {
    document.querySelectorAll('.rage-bubble').forEach(b => b.addEventListener('click', () => {
      if (b.classList.contains('popped')) return;
      burst(b);
      b.classList.add('popped'); b.disabled = true;
      if (b.closest('.bubble-field')) {
        popped++;
        document.querySelector('.score-value').textContent = `${popped} / 8`;
        document.querySelector('.progress i').style.width = `${popped / 8 * 100}%`;
        document.querySelector('.bubble-response').textContent = popped === 8 ? pick('清场。给脑子腾了点地方。', 'All clear. A little room in your head.') : pick(`戳掉 ${popped} 颗了，继续慢慢来。`, `${popped} down. One at a time.`);
      } else tell(pick('这颗气，退订成功。', 'That bit of rage? Unsubscribed.'));
    }));
  }
  bindBubbles();
  document.getElementById('refill').addEventListener('click', () => {
    popped = 0;
    document.querySelectorAll('.bubble-field .rage-bubble').forEach(b => { b.disabled = false; b.classList.remove('popped'); });
    document.querySelector('.score-value').textContent = '0 / 8';
    document.querySelector('.progress i').style.width = '0%';
    document.querySelector('.bubble-response').textContent = pick('新的一盘。点哪颗都可以。', 'A fresh batch. Start anywhere.');
  });
  function selectMode(n, focus = false) {
    document.querySelectorAll('[data-mode]').forEach(b => { const selected = Number(b.dataset.mode) === n; b.setAttribute('aria-selected', String(selected)); b.tabIndex = selected ? 0 : -1; if (selected && focus) b.focus(); });
    document.getElementById('mode-panel').setAttribute('aria-labelledby', `mode-${n}`);
    document.getElementById('mode-title').textContent = t.modeTitles[n];
    document.getElementById('mode-body').textContent = t.modeBody[n];
    document.getElementById('mode-list').innerHTML = t.modeList[n].map(x => `<span>${x}</span>`).join('');
    const image = document.querySelector('.feature-phone img');
    image.src = asset(['smash', 'level', 'comfort'][n]);
    const panel = document.querySelector('.feature-art');
    panel.dataset.mode = String(n);
    if (motion) panel.animate([{ opacity: .35, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350, easing: 'ease-out' });
  }
  document.querySelectorAll('[data-mode]').forEach(b => {
    b.addEventListener('click', () => selectMode(Number(b.dataset.mode)));
    b.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (Number(b.dataset.mode) + 1) % 3;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (Number(b.dataset.mode) + 2) % 3;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = 2;
      if (next !== undefined) { e.preventDefault(); selectMode(next, true); }
    });
  });
  document.querySelectorAll('[data-minutes]').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('[data-minutes]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    document.querySelector('.timer-message').textContent = pick(`先替你收着 ${b.dataset.minutes} 分钟。`, `We’ll hold it for ${b.dataset.minutes} minutes.`);
  }));
  let comfortIndex = 0;
  document.querySelector('.comfort-button')?.addEventListener('click', () => {
    comfortIndex = (comfortIndex + 1) % t.comforts.length;
    document.querySelector('.comfort-line').textContent = t.comforts[comfortIndex];
    const f = document.querySelector('.studio-companion .face');
    f.classList.toggle('wink', comfortIndex % 2 === 1);
  });
  const slab = document.querySelector('.smash-slab');
  let hits = 0;
  if (slab) {
    slab.addEventListener('click', e => {
      if (hits >= 5) return;
      hits++;
      const r = slab.getBoundingClientRect();
      const x = e.detail ? e.clientX - r.left : r.width / 2;
      const y = e.detail ? e.clientY - r.top : r.height / 2;
      const layer = slab.querySelector('.cracks');
      for (let i = 0; i < 5; i++) {
        const line = document.createElement('i');
        line.style.cssText = `left:${x}px;top:${y}px;width:${45 + i * 18}px;transform:rotate(${i * 73 + hits * 23}deg)`;
        layer.appendChild(line);
      }
      document.querySelector('.hit-count').textContent = `${hits} / 5`;
      if (motion) slab.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-2deg) translateY(3px)' }, { transform: 'rotate(1deg)' }, { transform: 'rotate(0)' }], { duration: 240 });
      burst(slab);
      if (hits === 5) {
        if (motion) {
          const stage = document.querySelector('.smash-wrap');
          const s = stage.getBoundingClientRect();
          for (let i = 0; i < 12; i++) {
            const fragment = slab.cloneNode(true);
            fragment.className = 'smash-slab smash-fragment';
            fragment.setAttribute('aria-hidden', 'true');
            fragment.tabIndex = -1;
            const col = i % 4, row = Math.floor(i / 4);
            fragment.style.cssText = `left:${r.left-s.left}px;top:${r.top-s.top}px;width:${r.width}px;height:${r.height}px;clip-path:polygon(${col*25}% ${row*100/3}%,${(col+1)*25}% ${row*100/3}%,${(col+1)*25}% ${(row+1)*100/3}%,${col*25}% ${(row+1)*100/3}%);`;
            stage.appendChild(fragment);
            const a = fragment.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${(col-1.5)*56}px,${(row-1)*45+110}px) rotate(${(col-1.5)*14}deg)`,opacity:0}],{duration:720,easing:'cubic-bezier(.25,.1,.6,1)',fill:'forwards'});
            a.finished.then(()=>fragment.remove()).catch(()=>fragment.remove());
          }
        }
        slab.hidden = true;
        document.querySelector('.smash-result').hidden = false;
        document.querySelector('.smash-hint').textContent = pick('想继续？再来一块。', 'Want another? Go ahead.');
      }
    });
    document.querySelector('.reset-game').addEventListener('click', () => {
      hits = 0; slab.hidden = false; slab.querySelector('.cracks').replaceChildren();
      document.querySelector('.smash-result').hidden = true;
      document.querySelector('.hit-count').textContent = '0 / 5';
      document.querySelector('.smash-hint').textContent = t.smashHint;
      slab.focus({ preventScroll: true });
    });
  }
  // Subtle pointer depth on desktop only; no forced scroll or cursor replacement.
  const scene = document.querySelector('.editorial-scene, .studio-scene');
  if (scene && matchMedia('(hover:hover)').matches) {
    scene.addEventListener('pointermove', e => {
      if (!motion) return;
      const r = scene.getBoundingClientRect();
      scene.style.setProperty('--px', `${(e.clientX - r.left - r.width / 2) * .012}px`);
      scene.style.setProperty('--py', `${(e.clientY - r.top - r.height / 2) * .012}px`);
    });
    scene.addEventListener('pointerleave', () => { scene.style.setProperty('--px', '0px'); scene.style.setProperty('--py', '0px'); });
  }
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('entered'); observer.unobserve(e.target); } }), { threshold: .08 });
    document.querySelectorAll('.section').forEach(el => { el.classList.add('reveal'); observer.observe(el); });
  }
})();
