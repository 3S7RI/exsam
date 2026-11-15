import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import * as fs from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import * as au from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {firebaseConfig} from "./config.js";
const app=initializeApp(firebaseConfig);
export const db=fs.getFirestore(app),auth=au.getAuth(app);export {fs,au};
export const $=(s,r=document)=>r.querySelector(s);
export const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
export const fmt=s=>Math.floor(s/60)+":"+String(s%60).padStart(2,"0");
export const gradeOf=p=>p>=90?"ممتاز":p>=80?"جيد جدًا":p>=65?"جيد":p>=50?"مقبول":"ضعيف";
export const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
// k = {answers:{qid:optionIndex}, model:{qid:text}} ; em = درجات المقالي
export function grade(ex,k,a,em={}){let obj=0,ess=0,tot=0,pend=false;
 const d=ex.questions.map(q=>{tot+=q.marks;let got,s,c;
  if(q.type==="essay"){got=em[q.id]??null;got==null?pend=true:ess+=+got;s=a[q.id]||"";c=k.model?.[q.id]||""}
  else{const key=k.answers?.[q.id];got=a[q.id]===key?q.marks:0;obj+=got;s=a[q.id]==null?"—":q.options[a[q.id]];c=q.options[key]}
  return {t:q.text,type:q.type,marks:q.marks,got,s,c}});
 const score=obj+ess,pct=tot?Math.round(score/tot*1000)/10:0;return {d,obj,ess,tot,pend,score,pct,g:gradeOf(pct)}}
export const review=d=>d.map((x,i)=>`<div class=card><b>${i+1}.</b> ${esc(x.t)}<br>إجابتك: <span class="${x.type==="essay"?"":x.got?"ok":"no"}">${esc(x.s)}</span><br>`+
 (x.type==="essay"?`النموذجية: ${esc(x.c)}<br>`:x.got?"":`الصحيحة: <span class=ok>${esc(x.c)}</span><br>`)+`<small>الدرجة: ${x.got??"لم تُصحح"} / ${x.marks}</small></div>`).join("");

export async function hash(t){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
