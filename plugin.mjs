var xt=Object.defineProperty;var wt=(H,k,h)=>k in H?xt(H,k,{enumerable:!0,configurable:!0,writable:!0,value:h}):H[k]=h;var $=(H,k,h)=>(wt(H,typeof k!="symbol"?k+"":k,h),h);(function(){"use strict";const H=[];for(let t=0;t<256;++t)H.push((t+256).toString(16).slice(1));typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);function k(t){try{const{pathname:e,search:n}=new URL(t);return`${e}${n}`}catch(e){return t}}function h(t,e){const n=k(t.attr("href")),a=t.text().trim();return{path:n,name:e?e(a):a}}function M(t){const[e,n,a]=t.split("/");return new Date(`00:00 ${n}/${e}/${a}`).getTime()}function L(t){t=t.trim().toLowerCase().replace(".","");const e=parseFloat(t);if(Number.isNaN(e))return null;switch(t[t.length-1]){case"k":return e*1e3;case"m":return e*1e6;case"g":return e*1e9;default:return e}}function S(t,e){return t=t.trim().toLowerCase(),t.endsWith("giây trước")?e-parseInt(t)*1e3:t.endsWith("phút trước")?e-parseInt(t)*1e3*60:t.endsWith("giờ trước")?e-parseInt(t)*1e3*60*60:t.endsWith("ngày trước")?e-parseInt(t)*1e3*60*60*24:t.endsWith("tháng trước")?e-parseInt(t)*1e3*60*60*24*30:t.endsWith("năm trước")?e-parseInt(t)*1e3*60*60*24*365:new Date(t.replace(/^(\d{1,2}):(\d{1,2}) (\d{1,2})\/(\d{1,2})(\/\d{2,4})?$/,(n,a,r,o,s,c)=>{var i;return a+":"+r+":00 "+s+"/"+o+"/"+((i=c==null?void 0:c.slice(1))!=null?i:new Date(e).getFullYear())})).getTime()||new Date(t.replace(/^(\d{1,2})\/(\d{1,2})\/(\d{1,})$/,"$2/$1/$3")).getTime()}const N=/^Chương|Chapter|Chap\.?\s+/i;function R(t){return t.replace(N,"").trim()}function T(t){const{pathname:e}=new URL(t,"http://localhost");return!e||e==="/"||e==="/index"||e==="/index.html"}function J(t){return Object.assign(self,{__DEFINE_API__:t}),t}function W(t){return Object.assign(self,{__DEFINE_PACKAGE__:t}),t}const f="https://truyenqqvn.com",q="truyenqqq",X="Truyện QQ",V="0.0.5",Y="Plugin nguồn của Truyện QQ.",K="Tachibana Shin <tachibshin@duck.com>",Z="https://github.com/manga-raiku/raiku-plugin-truyenqq",tt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACf1BMVEUjHyAjHiEiISAkHyEkICEiHh4jHiAtKihXNROFTiAnICQAAAA6KyYAADpDMiUnIiJsQiIjHyAjHyAjHyAjHyAjHyAjHyAkHyEkICEjHyAjHyAkICEmISEkHyArJyg9OTorJygvLCw7NzgmIiMjICEqJisiHh82MjOura3m5eWwr68zLzBDQEHAv7/l5OWYlpYoJCUjHyAkICEjHyAiHh+Jh4jQz8/x8PBxbm8gHB2XlZbf399hXl8gHB0jHyEmIiO4t7fU09SLiosdGx25t7iMioseGhwnIyTJycqBcGOglY7DwsKMiosfGxwlISKzsbLv8PCsmYvCiFe9h1ujlYr///+DgYEfGxwiHh9XVFTZ2dn+/v76+vvq7O7Cu6eejVy7uro6NzgiHh8jHyAhHR5EQEG/vb78/Px2XBUsKCUjHyAkICEpJSYdGRpAPD3f398kICEjHyAlISKDgIGRj4+UkpPt7e1qYEdOS0shHR4kHyEkICEhHR5gXV7f3t7y8O/19fX29vjKwam7tak9OjsiHh8lISEkHyAkICE+OjpeVE5YUlFVUlNVU1NVUE83MjIjHx8jICErJCFrQR9ELR4gGxsdGRseGhseGhxGLx5sQSBUNyErJSdeOyFoQCFGLyIFEyI/LCFpQCFgPCFiPiIjHyAiHh+ysbHm5uarqqqRj5BZVlcgHR+0s7S8u7tJRke5uLh9e3tsPxtpPhzHyMl7eXr////8/PzGwbPd3Nf9/f2qkk6QcBb09fe/qWrHlAakegX+/v79/v/SyrPMnBa3ig04Lh0hHh/x8fHAo1TKlwhzWRbz7+z07+qyjja/qXRhVU5aTUVaUEx8SB5/Sh+kvHkiAAAApXRSTlMAAAAAAAAAAAAAAAAAAAAAADWs7/7spC4yz8UoCaL78/n78vqSA9/89/jr9Pz79eL1zRsz7ff++dz+/vDW2yfu/vvU/v3H1+7y1/v9xdfu+/Tt8vT7+cTY7vDz/v36+/zT3t3u/vLw/vns3e78/fX4+jDq8ff7/PjO1SQWv/P2+PLy+d7crQ1H1ff+9Onp9fXMOD7l2X5wcITd7EMMe5Q7AkSWew2abqMxAAAAAWJLR0RVkwS4MwAAAAd0SU1FB+cKAg8rCSPcU0AAAAEUSURBVBjTY2BgFBQSXgoCIqJi4kzMDAwSksuWLQMJAEkpaRYGGdllcvIKQJFlikrKy1RUGaTV1DU0tbSXLdPR1dM3MDRiMDYxNVtubmG5zGrFSmsbWzsGY3uHVasdnZzXrF233sXVDSjgvmHDRg/PTZu9tmz19vEFCvj5b9seEBgUHLJjZ2hYOFAgIjIqeldMbNzuPfEJiUlAgeSU1LT0XXv37T+QkbksCyiQnZObl3/w0OEjR48dLwAKFBYVl5SWHdx14uSp0+UVlVUM1TW1dWfO1jc0Np0739zS2sbA2t7R2XWhu6e37+Kl/gkT2RjYOSZNvjxl6rTpM2ZemTWbk4uBm2fO3Hnzefn4FyxctHiJADcAQx5tLT0vWccAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMTAtMDJUMTU6NDM6MDkrMDA6MDCZdQqgAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTEwLTAyVDE1OjQzOjA5KzAwOjAw6CiyHAAAAABJRU5ErkJggg==",U=q;W({id:q,name:X,favicon:tt,version:V,description:Y,author:K,homepage:Z,updatedAt:1696390068981});function j(t){const e=t.indexOf("/truyen-tranh/")+14;if(e===13)throw new Error("Invalid url "+t);t=t.slice(e,t.indexOf("?",e)>>>0).replace(/\.html$/,"");const n=t.match(/(.+?)-chap-(\d+)$/)||t.match(/(.+)$/);if(n){const[,a,r]=n;return r?{name:"comic chap",params:{sourceId:U,comic:a,chap:r}}:{name:"comic",params:{sourceId:U,comic:a}}}throw new Error("Invalid url "+t)}function b(t,e,n){var d;const a=j(e.find("a").attr("href")),r=e.find("img").attr("src"),o=e.find(".book_name").text().trim(),s=e.find(".more-info .info"),c=h(e.find(".last_chapter > a"),m=>R(m).replace("Đọc Tiếp","").trim()),i=j(c.path),y=[{route:i,name:c.name,id:(d=i.params.chap)!=null?d:i.params.comic,updated_at:S(e.find(".time-ago").text().trim(),n),views:null}],v=e.find(".type-label").text().trim(),x=s.length===0?null:s.eq(0).text().replace("Tình trạng:","").trim(),w=s.length===0?null:L(s.eq(2).text().trim().replace("Lượt theo dõi:","").replace(/,/g,"")),_=e.find(".list-tags").find("p").toArray().map(m=>t(m).text()),u=e.find(".excerpt").text().trim(),l=s.length===0?null:L(s.eq(1).text().trim().replace("Lượt xem:","").trim().replace(/,/g,""));return{route:a,image:r,name:o,othername:null,author:null,last_chapters:y,label:v,status:x,views:l,likes:w,comments:null,tags:_,description:u}}function et(t,e){const n=parseDom(t),a=n(".hero .is-child").toArray().map(s=>{var u;const c=n(s),i=j(c.find("a").attr("href")),y=c.find("img").attr("src").replace("290x191","583x386"),v=c.find("h3").text(),x=c.find("h5").text().replace("Thể loại: ","").split(",").map(l=>l.trim())||[],w=c.find(".excerpt").text(),_=[{route:i,name:R(c.find(".chapter").text()),id:(u=i.params.chap)!=null?u:i.params.comic,updated_at:null,views:null}];return{route:{name:"comic",params:{sourceId:i.params.sourceId,comic:i.params.comic}},last_chapters:_,image:y,name:v,othername:"",status:"",author:"",views:null,comments:null,likes:null,label:null,tags:x,description:w}}),r=n("#div_suggest li").toArray().map(s=>b(n,n(s),e)),o=n("#main_homepage li").toArray().map(s=>b(n,n(s),e));return{sliders:a,hot:r,last_update:o}}function Q(t){const e=t.indexOf("/the-loai/")+10,n=t.slice(e,t.indexOf("?",e)>>>0).replace(/\/$/,"").replace(/\/$/,"_");return{name:"genre",params:{sourceId:U,type:n},query:Object.fromEntries(new URL(t,"http://localhost").searchParams.entries())}}function P(t,e){var x,w,_;const n=parseDom(t),a=n(".homepage_tags h1").text().trim(),r=n(".tags_detail").text().trim(),o=n(".story-list-bl01 tr").toArray().map(u=>{const l=n(u),d=l.find("th").text(),m=l.find("select option").toArray().map(p=>{const A=n(p),C=Q(A.attr("value")),E=A.text();return{route:C,name:E}});if(d==="Sắp xếp"){let p="";const A=m.map(C=>{const[E,g]=Object.entries(C.route.query).at(-1);p=E;const I=C.name;return{value:g,name:I}});return{type:d,key:p,items:A}}if(m.length===0){let p="";const A=l.find(".choose a").toArray().map(C=>{const E=n(C),[g,I]=[...new URL(E.attr("href"),"http://localhost").searchParams.entries()].at(-1);p=g;const D=E.text();return{value:I,name:D}});return{type:d,key:p,items:A}}return{type:d,select:m}}),s=n("#main_homepage .list_grid li").toArray().map(u=>b(n,n(u),e)),c=parseInt(n(".page_redirect .active").text()),i=Number.isNaN(c)?1:c,y=parseInt((_=(w=(x=n(".page_redirect > *").last().attr("href"))==null?void 0:x.match(/\/trang-(\d+)/))==null?void 0:w[1])!=null?_:i+""),v=Number.isNaN(y)?1:y;return{name:a,description:r,filters:o,items:s,curPage:i,maxPage:v}}async function B(t,e,n){const{data:a,url:r}=await get({url:`${f}/${t.replace(".html","")}/trang-${e}.html?${new URLSearchParams(n)}`});if(T(r))throw new Error("not_found");return P(a,Date.now())}async function nt(){const[t,e]=await Promise.all([get({url:f}).then(n=>et(n.data,Date.now())),B("/top-ngay",1,{})]);return{sliders:e.items.slice(0,7),hot:e.items.slice(7),last_update:t.last_update}}async function at(t,e,n){const a=new URL(t,"http://localhost");a.searchParams.delete("page");for(const o in n){const s=n[o];Array.isArray(s)?s.forEach(c=>{a.searchParams.append(o,c)}):a.searchParams.set(o,n[o]+"")}const{data:r}=await get({url:`${f}/${a.pathname}/trang-${e}.html?${a.searchParams+""}`});return P(r,Date.now())}function O(t,e){const n=+t.find(".reply-comment").attr("onclick").match(/addReply\((\d+)\)/)[1]+"",a={avatar:t.find(".avartar-comment img").attr("data-src"),name:t.find(".outline-content-comment strong").text(),level:null,chapter:""},r=t.find(".content-comment").html().trim(),o=parseInt(t.find(".total-like-comment").text()),s=S(t.find(".time").text(),e),c=t.find(".text-list-reply").length===0?0:parseInt(t.find(".text-list-reply").text().trim());return{id:n,author:a,content:r,like:o,dislike:0,created_at:s,replies:c,chapter_name:""}}function rt(t,e){var s,c;const n=parseDom(t),a=n(".info-comment").toArray().map(i=>O(n(i),e)),r=parseInt(n(".comment-count").text()),o=parseInt(((c=(s=n("#comment_list .page_redirect > p").last().attr("onclick"))==null?void 0:s.match(/(\d+)/))==null?void 0:c[1])||"0");return{comments:a,comments_count:r,comments_pages:o}}async function st(t,e=0,n=1,a,r){const{data:o}=await post({url:`${f}/frontend/comment/list`,data:{book_id:t,parent_id:e,page:n,episode_id:a,team_id:r}});return rt(o,Date.now())}function G(t){const e=parseDom(t);return e("a").toArray().map(n=>{const a=e(n),r=a.find(".time-chap"),{name:o,path:s}=h(a.find("a"),R),c=j(s);return{route:c,id:c.params.chap,name:o,updated_at:M(r.text()),views:null}})}async function ot(t){const{data:e}=await post({url:`${f}/frontend/manga/list`,data:{id:t,order:1}});return await G(e)}function ct(t){const e=parseDom(t);return e("li > a").toArray().map(n=>{const a=e(n),r=j(a.attr("href")),o=a.find("img").attr("src"),s=a.find(".name").text(),c=a.find(".name_other").text(),i=R(a.find(".search_info p:eq(2)").text());return{route:r,image:o,name:s,othername:c,last_chapter:i,tags:[]}})}async function it(t){const{data:e}=await post({url:`${f}/frontend/search/search`,data:{type:"0",search:t}});return ct(e)}async function mt(t,e){const{data:n}=await get({url:`${f}/tim-kiem/trang-${e}.html?q=${encodeURIComponent(t)}`});return P(n,Date.now())}function pt(t){const e=t.indexOf("/tac-gia/")+9,n=t.slice(e,t.indexOf("?",e)>>>0).replace(/\/$/,"").replace(/\/$/,"_");return{name:"author",params:{sourceId:U,type:n},query:Object.fromEntries(new URL(t,"http://localhost").searchParams.entries())}}function ut(t,e){var C,E;const n=parseDom(t),a=n(".book_other h1").text().trim(),r=n(".other-name").text(),o=parseInt(n("#book_id").attr("value"))+"",s=S(n(".time-chap").eq(0).text().trim(),e),c=n(".book_avatar img").attr("src"),i=n(".author a").toArray().map(g=>{const{name:I,path:D}=h(n(g));return{name:I,route:pt(D)}}),y=n(".status p:not(.name)").text().trim(),v=n(".list01 a").toArray().map(g=>{const{name:I,path:D}=h(n(g));return{name:I,route:Q(D)}}),x=L(n(".status").next().next().next().find("p:not(.name)").text().replace(/,/g,"")),w={cur:0,max:0,count:0},_=parseInt(n(".status").next().next().find("p:not(.name)").text().replace(/,/g,"")),u=parseInt(n(".status").next().find("p:not(.name)").text().replace(/,/g,"")),l=n(".detail-content").text().trim(),d=n(".works-chapter-item").toArray().map(g=>{const I=n(g),D=I.find(".time-chap"),{name:ft,path:yt}=h(I.find("a"),R),F=j(yt);return{route:F,id:F.params.chap,name:ft,updated_at:M(D.text()),views:null}}),m=n(".info-comment").toArray().map(g=>O(n(g),e)),p=parseInt(n(".comment-count").text()),A=parseInt(((E=(C=n("#comment_list .page_redirect > p").last().attr("onclick"))==null?void 0:C.match(/(\d+)/))==null?void 0:E[1])||"0");return{name:a,othername:r,manga_id:o,updated_at:s,image:c,author:i,status:y,genres:v,views:x,rate:w,follows:_,likes:u,description:l,chapters:d,comments:m,comments_count:p,comments_pages:A}}async function lt(t){const{data:e,url:n}=await get({url:`${f}/truyen-tranh/${t}.html`});if(T(n))throw new Error("not_found");return ut(e,Date.now())}function dt(t,e,n=!1){var l,d;const a=parseDom(t),r=a("h1 > a").text(),o=parseInt(a("#book_id").attr("value"))+"",s=parseInt(a("#episode_name").attr("value"))+"",c=new Date(a(".detail-title").next("time").attr("datetime")).getTime(),i=a('meta[property="og:image"]').attr("content"),y=j(a("#path > ol > li:nth-child(2) > a").attr("href")),v=a(".page-chapter img").toArray().map(m=>{const p=a(m);return{src:p.attr("src"),original:p.attr("data-original"),cdn:p.attr("data-cdn")}}),x=a(".info-comment").toArray().map(m=>O(a(m),e)),w=parseInt(a(".comment-count").text()),_=parseInt(((d=(l=a("#comment_list .page_redirect > p").last().attr("onclick"))==null?void 0:l.match(/(\d+)/))==null?void 0:d[1])||"0"),u=a(".chapter_list option").toArray().map(m=>{const p=a(m),A=j(p.attr("value"));return{route:A,id:A.params.chap,name:r,updated_at:null,views:null}});return{name:r,manga_id:o,ep_id:s,updated_at:c,image:i,path_manga:y,pages:v,comments:x,comments_count:w,comments_pages:_,chapters:n?void 0:u}}async function ht(t,e,n){const{data:a,url:r}=await get({url:`${f}/truyen-tranh/${t}-chap-${e}.html`});if(T(r))throw new Error("not_found");const o=await dt(a,Date.now(),n);if(!o.chapters){const{data:s}=await post({url:`${f}/frontend/manga/list`,data:{id:o.manga_id,order:1}});o.chapters=await G(s)}return o}const z=[],At=[];class gt{constructor(e,n){$(this,"Rankings",z);$(this,"Servers",At);$(this,"get");$(this,"post");this.get=e,this.post=n}async index(){return nt()}async getComic(e){return lt(e)}async getComicChapter(e,n,a){return ht(e,n,a)}async getComicComments(e,n,a=-1,r=0,o,s){return st(e,r,o,a,s)}async getListChapters(e){return ot(e)}async searchQuickly(e,n){return it(e)}async search(e,n){return mt(e,n)}async getRanking(e,n,a){e=e.toLowerCase();const r=z.find(o=>o.value.toLowerCase()===e);if(!r)throw new Error("not_found");return B(r.match,n,a)}async getCategory(e,n,a){return at(e,n,a)}}J(gt)})();
