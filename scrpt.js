const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
const details={memory:{title:'Memory Trail',body:'<p><b>Concept:</b> A personal web project that explores a meaningful way to collect and revisit moments.</p><p><b>Development focus:</b> turning an idea into a clear user experience, working through structure and interaction along the way.</p><p><b>Next:</b> Add the problem, features, technologies, challenges, repository and live demo as the project develops.</p>'},tic:{title:'Tic Tac Toe',body:'<p>A programming project used to practise core logic, state handling and interaction design through a familiar game.</p><p><b>Key learning:</b> breaking a problem into small rules, validating outcomes and refining behaviour through testing.</p><p>Repository and demo links can be added here when available.</p>'},amazon:{title:'Amazon-inspired UI',body:'<p><b>Frontend Practice Project</b></p><p>A basic layout practice project created to understand webpage structure, UI development and frontend fundamentals. It is not affiliated with Amazon.</p><p>Add the technologies, repository and live demo when ready.</p>'},hack:{title:'Hackathon Project',body:'<p>This space is reserved for a future or undocumented hackathon project.</p><ul><li>Hackathon name: pending</li><li>Problem statement: pending</li><li>Team, solution & contribution: pending</li><li>Outcome, demo & repository: pending</li></ul>'}};
const dialog=document.getElementById('project-dialog');
document.querySelectorAll('.project-open').forEach(button=>button.addEventListener('click',()=>{const d=details[button.dataset.project];document.getElementById('modal-title').textContent=d.title;document.getElementById('modal-content').innerHTML=d.body;dialog.showModal()}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,index)=>{el.classList.add(['slide-left','slide-right','slide-up'][index%3]);observer.observe(el)});
const updateScrollProgress=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;document.documentElement.style.setProperty('--scroll-progress',max>0?`${window.scrollY/max*100}%`:'0%')};
window.addEventListener('scroll',updateScrollProgress,{passive:true});updateScrollProgress();
const contactForm=document.getElementById('contact-form');
const formStatus=document.getElementById('form-status');
contactForm.addEventListener('submit',async event=>{
  event.preventDefault();
  const submitButton=contactForm.querySelector('button[type="submit"]');
  submitButton.disabled=true;submitButton.innerHTML='Sending <b>···</b>';formStatus.textContent='Securely transmitting your message…';
  try{
    const response=await fetch(contactForm.action,{method:'POST',body:new FormData(contactForm),headers:{Accept:'application/json'}});
    if(!response.ok)throw new Error('Submission failed');
    contactForm.reset();formStatus.style.color='var(--acid)';formStatus.textContent='Message received. I’ll get back to you soon.';
  }catch(error){formStatus.style.color='#ef9b8e';formStatus.textContent='Unable to send right now. Please try again in a moment.'}
  finally{submitButton.disabled=false;submitButton.innerHTML='Send message <b>→</b>'}
});
