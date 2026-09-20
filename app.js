emailjs.init("eOnK3qvUFiw89dhdV");
const SERVICE_ID="service_147bn6m";const TEMPLATE_ID="template_kndbrqg";
const ADMIN="markobinna120@gmail.com";
const APPS=[{id:"Facebook",logo:"https://cdn.simpleicons.org/facebook/1877F2"},{id:"Instagram",logo:"https://cdn.simpleicons.org/instagram/E4405F"},{id:"TikTok",logo:"https://cdn.simpleicons.org/tiktok/000000"},{id:"YouTube",logo:"https://cdn.simpleicons.org/youtube/FF0000"},{id:"Twitter/X",logo:"https://cdn.simpleicons.org/x/000000"},{id:"WhatsApp",logo:"https://cdn.simpleicons.org/whatsapp/25D366"},{id:"Telegram",logo:"https://cdn.simpleicons.org/telegram/26A5E4"},{id:"Website",logo:"https://cdn.simpleicons.org/googlechrome/4285F4"}];
const PRICES={"Like a post":{adv:12,earn:4},"Like a video":{adv:12,earn:4},"Watch a video":{adv:10,earn:3},"View a video":{adv:10,earn:3},"Comment on a video":{adv:12,earn:5},"Custom comment":{adv:35,earn:8},"Share a post":{adv:12,earn:4},"Join a group":{adv:35,earn:7},"Follow a channel":{adv:35,earn:7},"Follow a page":{adv:12,earn:5},"Subscribe to a channel":{adv:35,earn:9},"Start a telegram bot":{adv:40,earn:9},"Website Signup":{adv:50,earn:10},"Website Vote":{adv:10,earn:3},"Website Visit":{adv:10,earn:3}};
let curUser=null,curTask=null,currentPage=1,perPage=10,selectedApp="Facebook";let authMode='signin';
function genRefCode(e){return e.split('@')[0].replace(/[^a-z0-9]/gi,'').toLowerCase()+Math.floor(100+Math.random()*900)}
function init(){let users=JSON.parse(localStorage.getItem('mt_users')||'[]');if(!users.find(u=>u.email===ADMIN)){users.push({email:ADMIN,username:'Admin Mark',password:'Admin123',status:'active',av:0,pd:0,dep:0,totalSpent:0,refCode:'admin120',referredBy:null,refEarn:0,hasWithdrawn:false})}users.forEach(u=>{if(!u.refCode)u.refCode=genRefCode(u.email);if(!u.status)u.status='active'});localStorage.setItem('mt_users',JSON.stringify(users));let grid=document.getElementById('appGrid');if(grid){grid.innerHTML='';APPS.forEach(a=>{let d=document.createElement('div');d.style.cssText='background:#fff;border:2px solid #eef2ee;border-radius:16px;padding:12px;text-align:center;cursor:pointer';d.innerHTML=`<img src="${a.logo}" style="width:40px;height:40px;border-radius:50%"><br><small style="font-weight:800;font-size:11px">${a.id}</small>`;d.onclick=()=>selectApp(a.id);d.id='app_'+a.id;grid.appendChild(d)});selectApp('Facebook')}let urlParams=new URLSearchParams(window.location.search);let ref=urlParams.get('ref');if(ref){let refInput=document.getElementById('aRef');if(refInput){refInput.value=ref;setAuthMode('signup')}}setAuthMode('signin');checkLogin()}
function setAuthMode(mode){authMode=mode;let tabIn=document.getElementById('tabSignIn');let tabUp=document.getElementById('tabSignUp');let userInput=document.getElementById('aUser');let authBtn=document.getElementById('authBtn');let switchBtn=document.getElementById('switchBtn');let codeInput=document.getElementById('aCode');let refInput=document.getElementById('aRef');if(!tabIn)return;if(mode==='signin'){tabIn.className='active';tabUp.className='inactive';userInput.classList.add('hidden');codeInput.classList.add('hidden');refInput.classList.add('hidden');authBtn.textContent='Sign In';switchBtn.textContent="Don't have account? Sign Up"}else{tabIn.className='inactive';tabUp.className='active';userInput.classList.remove('hidden');refInput.classList.remove('hidden');authBtn.textContent='Sign Up - Send Code';switchBtn.textContent="Already have account? Sign In"}document.getElementById('emailStatus').textContent=''}
function toggleAuthMode(){setAuthMode(authMode==='signin'?'signup':'signin')}
function selectApp(id){selectedApp=id;document.querySelectorAll('#appGrid div').forEach(x=>x.style.borderColor='#eef2ee');let el=document.getElementById('app_'+id);if(el)el.style.borderColor='#0ea500';document.getElementById('selectedAppText').textContent='Selected: '+id+' ✓';loadTypes()}
function loadTypes(){let sel=document.getElementById('pType');if(!sel)return;sel.innerHTML='';let opts=[];if(selectedApp==='YouTube'){opts=["Subscribe to a channel","Like a post","Watch a video","Comment on a video","Custom comment","Share a post"]}else if(selectedApp==='Facebook'){opts=["Follow a page","Like a video","View a video","Comment on a video","Custom comment","Share a post","Join a group"]}else if(selectedApp==='Instagram'){opts=["Follow a page","Like a video","View a video","Comment on a video","Custom comment","Share a post"]}else if(selectedApp==='TikTok'||selectedApp==='Twitter/X'){opts=["Follow a page","Like a video","View a video","Comment on a video","Custom comment","Share a post"]}else if(selectedApp==='WhatsApp'){opts=["Join a group","Follow a channel"]}else if(selectedApp==='Telegram'){opts=["Join a group","Follow a channel","Start a telegram bot"]}else if(selectedApp==='Website'){opts=["Website Signup","Website Vote","Website Visit"]}opts.forEach(o=>{let e=document.createElement('option');e.value=o;e.textContent=o+' - ₦'+(PRICES[o]?PRICES[o].adv:30);sel.appendChild(e)});sel.onchange=()=>{updatePrice();checkCustomBox()};document.getElementById('pQty').oninput=updatePrice;updatePrice();checkCustomBox()}
function updatePrice(){let t=document.getElementById('pType').value;let q=parseInt(document.getElementById('pQty').value)||0;if(!PRICES[t])return;document.getElementById('priceInfo').innerHTML=`You will pay: <b>₦${PRICES[t].adv*q}</b> for ${q} units`}
function checkCustomBox(){let t=document.getElementById('pType').value;let box=document.getElementById('customBox');if(!box)return;if(t==='Custom comment'){box.classList.remove('hidden')}else{box.classList.add('hidden')}}
function checkLogin(){let email=localStorage.getItem('mt_cur');if(!email){showAuth();return}let users=JSON.parse(localStorage.getItem('mt_users')||'[]');curUser=users.find(u=>u.email===email);if(!curUser){showAuth();return}if(curUser.status!=='active'){alert('Suspended');localStorage.removeItem('mt_cur');showAuth();return}document.getElementById('auth').classList.add('hidden');document.getElementById('home').classList.remove('hidden');document.getElementById('avBal').textContent='₦'+(curUser.av||0);document.getElementById('pdBal').textContent='₦'+(curUser.pd||0);document.getElementById('postDep').textContent='₦'+(curUser.dep||0);if(document.getElementById('menuDep'))document.getElementById('menuDep').textContent='₦'+(curUser.dep||0);let adminLink=document.getElementById('adminLink');if(curUser.email===ADMIN){adminLink.classList.remove('hidden');adminLink.style.display='block'}else{adminLink.classList.add('hidden')}loadHomeTasks();loadAllTasks();loadMyDeposits();loadReferral();loadWithdrawPage();loadMyCreatedTasks()}
function showAuth(){document.getElementById('auth').classList.remove('hidden');document.getElementById('home').classList.add('hidden')}
function toggleMenu(){document.getElementById('sideMenu').classList.toggle('active')}
function showPage(p){['home','tasks','post','deposit','admin','referral','withdraw'].forEach(id=>{let el=document.getElementById(id);if(el)el.classList.add('hidden')});let t=document.getElementById(p);if(t)t.classList.remove('hidden');if(p==='tasks')loadAllTasks();if(p==='deposit')loadMyDeposits();if(p==='post'){document.getElementById('postDep').textContent='₦'+(curUser.dep||0);loadMyCreatedTasks()}if(p==='referral')loadReferral();if(p==='withdraw')loadWithdrawPage();if(p==='admin')showAdmin('users')}
let codeSent='',tempData={};
async function handleAuth(){let user=document.getElementById('aUser').value.trim();let email=document.getElementById('aEmail').value.trim();let pass=document.getElementById('aPass').value.trim();let codeInput=document.getElementById('aCode');let refCodeInput=document.getElementById('aRef').value.trim().toLowerCase();let users=JSON.parse(localStorage.getItem('mt_users')||'[]');let exists=users.find(u=>u.email===email);if(authMode==='signin'){if(!email||!pass)return;if(!exists){setAuthMode('signup');return}if(exists.password!==pass)return;if(exists.status!=='active')return;localStorage.setItem('mt_cur',email);location.reload();return}if(authMode==='signup'){if(codeInput.classList.contains('hidden')){if(!user||!email||!pass)return;if(exists){setAuthMode('signin');return}let referredByUser=null;if(refCodeInput){referredByUser=users.find(u=>u.refCode.toLowerCase()===refCodeInput);if(!referredByUser)return}tempData={user,email,pass,referredBy:referredByUser?referredByUser.email:null};codeSent=Math.floor(100000+Math.random()*900000).toString();try{await emailjs.send(SERVICE_ID,TEMPLATE_ID,{to_email:email,code:codeSent,username:user});document.getElementById('emailStatus').textContent='Code sent'}catch(e){document.getElementById('emailStatus').textContent='Code: '+codeSent}codeInput.classList.remove('hidden');document.getElementById('authBtn').textContent='Verify'}else{if(document.getElementById('aCode').value.trim()!==codeSent)return;let newRef=genRefCode(tempData.email);users.push({email:tempData.email,username:tempData.user,password:tempData.pass,status:'active',av:0,pd:0,dep:0,totalSpent:0,refCode:newRef,referredBy:tempData.referredBy,refEarn:0,hasWithdrawn:false});localStorage.setItem('mt_users',JSON.stringify(users));localStorage.setItem('mt_cur',tempData.email);location.reload()}}}
function logout(){localStorage.removeItem('mt_cur');location.reload()}
function taskHtml(t){let app=APPS.find(a=>a.id===t.app);let img=app?`<img src="${app.logo}">`:'';return `<div class="task-fansup"><div class="task-top"><div class="task-logo">${img}</div><div style="flex:1"><div style="font-size:11px;color:#888">${t.app}</div><div style="font-weight:800">${t.type}</div><span class="badge">👥 ${t.remaining} left</span></div></div><div class="task-bottom"><div class="earn"><b>₦${t.priceEarn||20}</b></div><button class="start-btn" onclick="openTask('${t.id}')">Start Task</button></div></div>`}
function getMyDoneIds(){let p=JSON.parse(localStorage.getItem('mt_proofs')||'[]');return p.filter(x=>x.user===curUser.email).map(x=>x.taskId)}
function loadHomeTasks(){let done=getMyDoneIds();let tasks=JSON.parse(localStorage.getItem('mt_tasks')||'[]').filter(t=>t.remaining>0&&t.owner!==curUser.email&&!done.includes(t.id)).slice(0,4);document.getElementById('homeTasks').innerHTML=tasks.length?tasks.map(taskHtml).join(''):'<div style="text-align:center;color:#888;margin-top:20px">There are no available tasks</div>'}
function loadAllTasks(){let done=getMyDoneIds();let tasks=JSON.parse(localStorage.getItem('mt_tasks')||'[]').filter(t=>t.remaining>0&&t.owner!==curUser.email&&!done.includes(t.id));let start=(currentPage-1)*perPage;document.getElementById('allTasks').innerHTML=tasks.slice(start,start+perPage).map(taskHtml).join('')||'No tasks'}
function changePage(d){currentPage+=d;if(currentPage<1)currentPage=1;loadAllTasks()}
function loadMyCreatedTasks(){let tasks=JSON.parse(localStorage.getItem('mt_tasks')||'[]').filter(t=>t.owner===curUser.email);document.getElementById('activeCount').textContent=tasks.length;let list=document.getElementById('myCreatedList');if(list)list.innerHTML=tasks.map(t=>`<div style="background:#fff;border:1px solid #eee;padding:12px;border-radius:14px;margin-bottom:8px;display:flex;justify-content:space-between"><div><b>${t.name}</b><br><small>${t.remaining}/${t.qty}</small></div><button onclick="deleteTask('${t.id}')" style="background:#ffe9e9;color:#e53935;border:none;padding:6px 10px;border-radius:10px">Delete</button></div>`).join('')||''}
function getAssignedComment(task){let all=JSON.parse(localStorage.getItem('mt_proofs')||'[]').filter(p=>p.taskId===task.id);return task.customComments?task.customComments[all.length%task.customComments.length]:''}
function createTask(){
let type=document.getElementById('pType').value;
let link=document.getElementById('pLink').value.trim();
let qty=parseInt(document.getElementById('pQty').value)||0;
if(!link){alert('Put task link');return;}
if(!qty||qty<1){alert('Put units');return;}
let total=PRICES[type].adv*qty;
if((curUser.dep||0)<total){
  let pop=document.getElementById('lowBalPopup');
  if(pop)pop.style.display='flex';
  else alert('Low posting balance');
  return;
}
let tasks=JSON.parse(localStorage.getItem('mt_tasks')||'[]');
let custom=[];
if(type==='Custom comment'){
 let el=document.getElementById('customCommentsInput');
 let raw=el?el.value.trim():'';
 if(!raw){alert('Paste your custom comments');return;}
 if(raw.includes('\n'))custom=raw.split('\n').map(s=>s.trim()).filter(Boolean);
 else custom=raw.split(',').map(s=>s.trim()).filter(Boolean);
}
tasks.push({id:'t_'+Date.now(),name:type+' on '+selectedApp,app:selectedApp,type,link,qty,remaining:qty,priceAdv:PRICES[type].adv,priceEarn:PRICES[type].earn,owner:curUser.email,customComments:custom,created:Date.now()});
localStorage.setItem('mt_tasks',JSON.stringify(tasks));
curUser.dep-=total;
curUser.totalSpent=(curUser.totalSpent||0)+total;
let users=JSON.parse(localStorage.getItem('mt_users')||'[]');
users[users.findIndex(u=>u.email===curUser.email)]=curUser;
localStorage.setItem('mt_users',JSON.stringify(users));
document.getElementById('pLink').value='';
let cEl=document.getElementById('customCommentsInput');
if(cEl)cEl.value='';
loadMyCreatedTasks();
checkLogin();
showPage('post');
document.getElementById('postSuccessPopup').style.display='flex';
}
function submitDeposit(){
let name=document.getElementById('dName').value.trim();
let amt=parseInt(document.getElementById('dAmt').value);
if(!name||!amt)return;
let deps=JSON.parse(localStorage.getItem('mt_deposits')||'[]');
deps.push({id:'d_'+Date.now(),user:curUser.email,accountName:name,amount:amt,status:'pending',created:Date.now()});
localStorage.setItem('mt_deposits',JSON.stringify(deps));
loadMyDeposits();
document.getElementById('dName').value='';
document.getElementById('dAmt').value='';
document.getElementById('depositSuccessPopup').style.display='flex';
}
function requestWithdraw(){
let accName=document.getElementById('wAccName').value.trim();
let accNum=document.getElementById('wAccNum').value.trim();
let bank=document.getElementById('wBank').value.trim();
let amt=parseInt(document.getElementById('wAmt').value);
if(!accName||!accNum||!bank||!amt)return;
if(amt<300||(curUser.av||0)<amt)return;
let withdrawals=JSON.parse(localStorage.getItem('mt_withdrawals')||'[]');
withdrawals.push({id:'w_'+Date.now(),user:curUser.email,accName,accNum,bank,amount:amt,net:amt-20,status:'pending',created:Date.now()});
localStorage.setItem('mt_withdrawals',JSON.stringify(withdrawals));
curUser.av-=amt;
let users=JSON.parse(localStorage.getItem('mt_users')||'[]');
users[users.findIndex(u=>u.email===curUser.email)]=curUser;
localStorage.setItem('mt_users',JSON.stringify(users));
loadWithdrawPage();
checkLogin();
document.getElementById('wAccName').value='';
document.getElementById('wAccNum').value='';
document.getElementById('wBank').value='';
document.getElementById('wAmt').value='';
document.getElementById('withdrawSuccessPopup').style.display='flex';
}
function goToDepositFromLowBal(){closePopup('lowBalPopup');showPage('deposit')}
function openTask(id){let tasks=JSON.parse(localStorage.getItem('mt_tasks')||'[]');curTask=tasks.find(t=>t.id===id);document.getElementById('popTitle').textContent=curTask.name;document.getElementById('popLink').href=curTask.link;let cl=document.getElementById('popCustomList');if(curTask.type==='Custom comment'&&curTask.customComments){let assigned=getAssignedComment(curTask);cl.innerHTML=`<div style="background:#fff8cc;padding:10px;border-radius:12px;border:1px dashed #0ea500"><b>Comment:</b><br><span id="copyTxt">${assigned}</span><br><button onclick="navigator.clipboard.writeText(document.getElementById('copyTxt').innerText)" style="width:100%;padding:10px;background:#ff9800;color:#fff;border:none;border-radius:10px;margin-top:6px">Copy</button></div>`}else{cl.innerHTML=''}document.getElementById('taskPopup').style.display='flex'}
function closePopup(id){document.getElementById(id).style.display='none'}
function submitProof(){let handle=document.getElementById('popHandle').value.trim();let file=document.getElementById('popFile').files[0];if(!handle||!file)return;let reader=new FileReader();reader.onload=function(e){let proofs=JSON.parse(localStorage.getItem('mt_proofs')||'[]');proofs.push({id:'p_'+Date.now(),taskId:curTask.id,taskName:curTask.name,user:curUser.email,handle,proof:e.target.result,status:'pending',assignedComment:getAssignedComment(curTask),created:Date.now()});localStorage.setItem('mt_proofs',JSON.stringify(proofs));closePopup('taskPopup');document.getElementById('successPopup').style.display='flex';loadHomeTasks();loadAllTasks()};reader.readAsDataURL(file)}
function loadReferral(){let baseUrl=window.location.origin+window.location.pathname;document.getElementById('myRefCode').textContent=curUser.refCode;document.getElementById('myRefLink').textContent=baseUrl+'?ref='+curUser.refCode;let users=JSON.parse(localStorage.getItem('mt_users')||'[]');let myRefs=users.filter(u=>u.referredBy===curUser.email);document.getElementById('refCount').textContent=myRefs.length;document.getElementById('refEarn').textContent='₦'+(curUser.refEarn||0);document.getElementById('myReferralsList').innerHTML=myRefs.map(u=>`<div style="border:1px solid #eee;padding:10px;margin:6px 0;border-radius:12px"><b>${u.username}</b></div>`).join('')||'No refs'}
function copyRef(){navigator.clipboard.writeText(document.getElementById('myRefLink').textContent)}
function loadWithdrawPage(){document.getElementById('wAvBal').textContent='₦'+(curUser.av||0);document.getElementById('wPdBal').textContent='₦'+(curUser.pd||0);let wds=JSON.parse(localStorage.getItem('mt_withdrawals')||'[]').filter(w=>w.user===curUser.email);document.getElementById('myWithdrawals').innerHTML=wds.map(w=>`<div style="border:1px solid #eee;padding:10px;margin:6px 0;border-radius:12px">₦${w.amount} - <b>${w.status}</b></div>`).join('')||'No withdrawals'}
function loadMyDeposits(){let deps=JSON.parse(localStorage.getItem('mt_deposits')||'[]').filter(d=>d.user===curUser.email);document.getElementById('myDeposits').innerHTML=deps.map(d=>`<div style="border:1px solid #eee;padding:8px;margin:6px 0;border-radius:12px">₦${d.amount} - <b>${d.status}</b></div>`).join('')||'No deposits';let el=document.getElementById('depBalText');if(el)el.textContent='₦'+(curUser.dep||0)}
function toggleSuspend(email){
if(email===ADMIN)return;
let users=JSON.parse(localStorage.getItem('mt_users')||'[]');
let u=users.find(x=>x.email===email);
if(!u)return;
if(u.status==='active'){u.status='suspended';}else{u.status='active';}
localStorage.setItem('mt_users',JSON.stringify(users));
showAdmin('users');
}
function permanentDeleteUser(email){
if(email===ADMIN)return;
if(!confirm('Delete '+email+'?'))return;
let users=JSON.parse(localStorage.getItem('mt_users')||'[]');
users=users.filter(x=>x.email!==email);
localStorage.setItem('mt_users',JSON.stringify(users));
showAdmin('users');
}
function showAdmin(tab){
if(curUser.email!==ADMIN)return;
let c=document.getElementById('adminContent');
if(tab==='users'){
let users=JSON.parse(localStorage.getItem('mt_users')||'[]');
c.innerHTML='<h4>Users ('+users.length+')</h4>'+users.map(u=>`<div style="padding:12px;border:1px solid #eee;margin:8px 0;border-radius:14px;background:${u.status!=='active'?'#ffe9e9':'#fff'}"><b>${u.username}</b> - ${u.email}<br>Status: <b style="color:${u.status==='active'?'#0ea500':'red'}">${u.status.toUpperCase()}</b> | Av ₦${u.av||0} | Dep ₦${u.dep||0}<br><div style="margin-top:8px;display:flex;gap:8px"><button onclick="toggleSuspend('${u.email}')" style="padding:10px 14px;border:none;border-radius:10px;background:${u.status==='active'?'#ff9800':'#0ea500'};color:#fff;font-weight:800">${u.status==='active'?'SUSPEND':'UNSUSPEND'}</button><button onclick="permanentDeleteUser('${u.email}')" style="padding:10px 14px;border:none;border-radius:10px;background:#111;color:#fff;font-weight:800">DELETE</button></div></div>`).join('');
}
if(tab==='pendingBal'){let users=JSON.parse(localStorage.getItem('mt_users')||'[]').filter(u=>(u.pd||0)>0);c.innerHTML='<h4>Pending</h4>'+(users.length?users.map(u=>`<div style="border:1px solid #eee;padding:12px;margin:8px 0;border-radius:14px;background:#fff8cc"><b>${u.username}</b> - ₦${u.pd}<br><button onclick="approvePendingBal('${u.email}')" style="width:100%;padding:12px;background:#0ea500;color:#fff;border:none;border-radius:12px">APPROVE</button></div>`).join(''):'No pending')}
if(tab==='proofs'){let proofs=JSON.parse(localStorage.getItem('mt_proofs')||'[]').filter(p=>p.status==='pending');c.innerHTML='<h4>Proofs</h4>'+(proofs.length?proofs.map(p=>`<div style="border:1px solid #eee;padding:12px;margin:8px 0;border-radius:14px"><b>${p.taskName}</b><br>${p.user}<br><img src="${p.proof}" style="width:100%;max-width:240px"><br><div style="display:flex;gap:8px;margin-top:8px"><button onclick="approveProof('${p.id}')" style="flex:1;background:#0ea500;color:#fff;padding:12px;border:none;border-radius:10px">APPROVE</button><button onclick="rejectProof('${p.id}')" style="flex:1;background:red;color:#fff;padding:12px;border:none;border-radius:10px">REJECT</button></div></div>`).join(''):'No proofs')}
if(tab==='depositsAdmin'){let deps=JSON.parse(localStorage.getItem('mt_deposits')||'[]').filter(d=>d.status==='pending');c.innerHTML='<h4>Deposits</h4>'+(deps.length?deps.map(d=>`<div style="border:1px solid #eee;padding:12px;margin:8px 0;border-radius:12px">${d.user} - ₦${d.amount}<br><div style="display:flex;gap:8px;margin-top:8px"><button onclick="approveDeposit('${d.id}')" style="flex:1;background:#0ea500;color:#fff;padding:10px;border:none;border-radius:10px">APPROVE</button><button onclick="rejectDeposit('${d.id}')" style="flex:1;background:red;color:#fff;padding:10px;border:none;border-radius:10px">REJECT</button></div></div>`).join(''):'No deposits')}
if(tab==='withdrawalsAdmin'){let wds=JSON.parse(localStorage.getItem('mt_withdrawals')||'[]').filter(w=>w.status==='pending');c.innerHTML='<h4>Withdrawals</h4>'+(wds.length?wds.map(w=>`<div style="border:1px solid #eee;padding:12px;margin:8px 0;border-radius:12px"><b>${w.user}</b><br>₦${w.amount}<br><div style="display:flex;gap:8px;margin-top:8px"><button onclick="approveWithdrawal('${w.id}')" style="flex:1;background:#0ea500;color:#fff;padding:10px;border:none;border-radius:10px">PAY</button><button onclick="rejectWithdrawal('${w.id}')" style="flex:1;background:red;color:#fff;padding:10px;border:none;border-radius:10px">REJECT</button></div></div>`).join(''):'No withdrawals')}
if(tab==='allTasksAdmin'){let tasks=JSON.parse(localStorage.getItem('mt_tasks')||'[]');c.innerHTML='<h4>All Tasks</h4>'+tasks.map(t=>`<div style="padding:10px;border-bottom:1px solid #eee;display:flex;justify-content:space-between"><span>${t.name}</span><button onclick="deleteTask('${t.id}')" style="background:red;color:#fff;border:none;padding:6px 10px;border-radius:8px">Del</button></div>`).join('')}
}
function approvePendingBal(email){let users=JSON.parse(localStorage.getItem('mt_users')||'[]');let u=users.find(x=>x.email===email);u.av=(u.av||0)+u.pd;u.pd=0;localStorage.setItem('mt_users',JSON.stringify(users));showAdmin('pendingBal')}
function approveProof(id){let proofs=JSON.parse(localStorage.getItem('mt_proofs')||'[]');let p=proofs.find(x=>x.id===id);let tasks=JSON.parse(localStorage.getItem('mt_tasks')||'[]');let t=tasks.find(x=>x.id===p.taskId);if(t){t.remaining=Math.max(0,t.remaining-1);localStorage.setItem('mt_tasks',JSON.stringify(tasks))}let users=JSON.parse(localStorage.getItem('mt_users')||'[]');let u=users.find(x=>x.email===p.user);u.pd=(u.pd||0)+(t?t.priceEarn:20);localStorage.setItem('mt_users',JSON.stringify(users));p.status='approved';localStorage.setItem('mt_proofs',JSON.stringify(proofs));showAdmin('proofs')}
function rejectProof(id){let proofs=JSON.parse(localStorage.getItem('mt_proofs')||'[]');let p=proofs.find(x=>x.id===id);p.status='rejected';localStorage.setItem('mt_proofs',JSON.stringify(proofs));showAdmin('proofs')}
function approveDeposit(id){let deps=JSON.parse(localStorage.getItem('mt_deposits')||'[]');let d=deps.find(x=>x.id===id);let users=JSON.parse(localStorage.getItem('mt_users')||'[]');let u=users.find(x=>x.email===d.user);u.dep=(u.dep||0)+d.amount;localStorage.setItem('mt_users',JSON.stringify(users));d.status='approved';localStorage.setItem('mt_deposits',JSON.stringify(deps));showAdmin('depositsAdmin')}
function rejectDeposit(id){let deps=JSON.parse(localStorage.getItem('mt_deposits')||'[]');let d=deps.find(x=>x.id===id);d.status='rejected';localStorage.setItem('mt_deposits',JSON.stringify(deps));showAdmin('depositsAdmin')}
function approveWithdrawal(id){let wds=JSON.parse(localStorage.getItem('mt_withdrawals')||'[]');let w=wds.find(x=>x.id===id);let users=JSON.parse(localStorage.getItem('mt_users')||'[]');let u=users.find(x=>x.email===w.user);if(!u.hasWithdrawn&&u.referredBy){let ref=users.find(x=>x.email===u.referredBy);if(ref){let bonus=Math.floor(w.amount*0.10);ref.av=(ref.av||0)+bonus;ref.refEarn=(ref.refEarn||0)+bonus}}u.hasWithdrawn=true;localStorage.setItem('mt_users',JSON.stringify(users));w.status='approved';localStorage.setItem('mt_withdrawals',JSON.stringify(wds));showAdmin('withdrawalsAdmin')}
function rejectWithdrawal(id){let wds=JSON.parse(localStorage.getItem('mt_withdrawals')||'[]');let w=wds.find(x=>x.id===id);let users=JSON.parse(localStorage.getItem('mt_users')||'[]');let u=users.find(x=>x.email===w.user);u.av=(u.av||0)+w.amount;localStorage.setItem('mt_users',JSON.stringify(users));w.status='rejected';localStorage.setItem('mt_withdrawals',JSON.stringify(wds));showAdmin('withdrawalsAdmin')}
function deleteTask(id){let tasks=JSON.parse(localStorage.getItem('mt_tasks')||'[]');tasks=tasks.filter(t=>t.id!==id);localStorage.setItem('mt_tasks',JSON.stringify(tasks));loadMyCreatedTasks();showAdmin('allTasksAdmin');}
window.onload=init;
