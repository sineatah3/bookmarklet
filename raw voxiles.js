javascript:(function(){
  if(window.__balatroWin) {
    window.__balatroWin.remove();
    window.__balatroWin = null;
    return;
  }
  const a = document.createElement("div");
  a.style.cssText = `
    position:fixed;
    top:80px;left:80px;
    width:900px;height:650px;
    background:#000;
    border:1px solid #aaa;
    border-radius:10px;
    box-shadow:0 8px 30px rgba(0,0,0,0.3);
    z-index:999999;
    display:flex;
    flex-direction:column;
    font-family:-apple-system,BlinkMacSystemFont,sans-serif;
  `;

  const d = document.createElement("div");
  d.style.cssText = `
    height:28px;
    background:#e0e0e0;
    border-bottom:1px solid #bbb;
    border-radius:10px 10px 0 0;
    display:flex;
    align-items:center;
    padding:0 8px;
    cursor:move;
  `;

  let minimized=false, fullscreen=false, g={x:80,y:80,w:900,h:650};

  ["#ff5f57","#febc2e","#28c840"].forEach((h,c)=>{
    const i=document.createElement("div");
    i.style.cssText=`
      width:12px;height:12px;
      background:${h};
      border-radius:50%;
      margin-right:6px;
      flex-shrink:0;
    `;
    if(c===0) i.onclick=()=>{a.remove();window.__balatroWin=null};
    if(c===1) i.onclick=()=>{
      if(minimized){
        a.querySelector(".balatro-content").style.display="block";
        a.style.height=g.h+"px";
        minimized=false;
      } else {
        a.querySelector(".balatro-content").style.display="none";
        a.style.height="28px";
        minimized=true;
      }
    };
    if(c===2) i.onclick=()=>{
      if(fullscreen){
        a.style.top=g.y+"px";
        a.style.left=g.x+"px";
        a.style.width=g.w+"px";
        a.style.height=g.h+"px";
        fullscreen=false;
      } else {
        g={x:a.offsetLeft,y:a.offsetTop,w:a.offsetWidth,h:a.offsetHeight};
        a.style.top="0px";
        a.style.left="0px";
        a.style.width="100vw";
        a.style.height="100vh";
        fullscreen=true;
      }
    };
    d.appendChild(i);
  });

  const title=document.createElement("span");
  title.textContent="voxiles - Truffled";
  title.style.cssText="margin-left:6px;font-size:13px;font-weight:500;";
  d.appendChild(title);
  a.appendChild(d);

  const i=document.createElement("div");
  i.className="balatro-content";
  i.style.cssText="flex:1;position:relative;overflow:hidden;border-radius:0 0 10px 10px;background:#000;";
  i.innerHTML=`
    <iframe src="https://drakofc.org/iframe.html?url=/tools/vox.html" allowfullscreen
      style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"></iframe>
    <a href="https://drakofc.org" target="_blank">
      <img src="https://drakofc.org/png/logo.png" alt="Logo"
        style="position:absolute;bottom:10px;right:10px;width:120px;height:120px;cursor:pointer;z-index:9999;">
    </a>
  `;
  a.appendChild(i);
  document.body.appendChild(a);
  window.__balatroWin=a;

  let dragging=false, j, k;
  d.onmousedown=b=>{
    if(!fullscreen){
      dragging=true;
      j=b.clientX-a.offsetLeft;
      k=b.clientY-a.offsetTop;
    }
  };
  document.onmousemove=b=>{
    if(dragging){
      a.style.left=b.clientX-j+"px";
      a.style.top=b.clientY-k+"px";
    }
  };
  document.onmouseup=()=>dragging=false;
})();
