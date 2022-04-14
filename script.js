let info, 
    xhr = new XMLHttpRequest(),
    current = 0,
    gobalA = [],
    change = document.getElementsByClassName("change"),
    sub = document.getElementsByClassName("sub"),
    digia = [],
    r = document.createElement('div'),
    gobalQ = 0,
    getID = (id) => document.getElementById(id),
    getTN = (e,n) => {if(n != null){return n[0].getElementsByTagName(e)}else{return info.getElementsByTagName(e);}}
    title = (str) => str.charAt(0).toUpperCase() + str.substring(1),
    create = (n) => document.createElement(n),
    top = getID('top');

function setup(num) {
    let label = document.createElement("Label"),
        con = info.getElementsByTagName("con")[num],
        mdiv = document.createElement("div");
    let localA = con.getElementsByTagName("A").length,
        localn = num + 1;
    mdiv.id = "Q" + localn;
    label.innerHTML = localn + "." + con.getElementsByTagName("Q")[0].innerHTML;
    document.getElementById("container").append(mdiv);
    gobalA.push(con.getElementsByTagName("ans")[0].innerHTML);
    mdiv.append(label);
    //Loop to create the answer buttons
    for (var x = 1; x != localA + 1; x++) {
        let btn = document.createElement("button"),
        div = document.createElement("div");
        label = document.createElement("Label");
        label.innerHTML = String.fromCharCode(x + 64) + ")";
        btn.style = "color: white";
        btn.id = "Q" + localn + "A" + x;
        btn.className = "btn ans";
        btn.textContent = con.getElementsByTagName("A")[x - 1].innerHTML;
        div.append(label);
        div.append(btn);
        mdiv.append(div);
    }
    getID("main").append(mdiv);
}
let defor = (b) => {
    for (e of digia) {
        if (e.includes("Q" + b[1])) {
            return digia.indexOf(e);
        }
    }
}

function btnEff(e) {
    let btn = e.target.id;
    if (digia.some((item) => item.includes("Q" + btn[1])) == false) {
        digia.push(btn);
    }
    else {
        digia[digia.indexOf("Q" + btn[1]) == -1 ? defor(btn) : digia.indexOf("Q" + btn[1])] = btn;
    }
    for (var x = 1; x != getID(btn).parentNode.parentNode.childElementCount; x++) {
        if (getID("Q" + btn[1] + "A" + x).id == btn) {
            getID(btn).style = "color: navy; background:lightgreen";
            continue;
        }
        getID("Q" + btn[1] + "A" + x).style = "color: white; background:gray";
    }
}
function displayXBtn(){
  blance();
  let cdiv = current / 5 >= 1? Math.round(current / 5) : Math.floor(current / 5), s = document.getElementsByTagName("section")[0].childElementCount;
  getID("d"+cdiv).style = "display: block";
  for(x = 0; x < s;x++){
    if(x != cdiv){
      getID("d"+x).style = "display: none";
    }
  }
  displayQues();
}

function setXBtn(){
  if(gobalQ / 5 > 1){
    let xpre = create("button"), xnxt = create("button"), n = document.getElementsByClassName("next")[0]
    xpre.innerHTML = "<<";
    xpre.className = "change";
    xnxt.innerHTML = ">>";
    xnxt.className = "change";
    xpre.addEventListener("click", function(){current-=5; displayXBtn();}, false);
    xnxt.addEventListener("click", function(){current+=5; displayXBtn();}, false);
    getID("bottom").insertBefore(xpre,getID("QS"));
    getID("bottom").insertBefore(xnxt,n);
  }  
}

function displayQues() {
    blance();
    getID("Q" + (current + 1)).style = "display: block";
    if (current == gobalQ - 1) {
        sub[0].style.display = "inline";
    } else {
        sub[0].style.display = "none";
    }
    for (var x = 0; x != gobalQ; x++) {
        if (x == current) {
            continue;
        }
        getID("Q" + (x + 1)).style = "display: none";
    }
}

function blance() {
    current = current < 0 ? 0 : current >= gobalQ ? gobalQ - 1 : current;
}

function setChange(e) {
    if (e.target.className.includes("pre")) {
        console.log("[Before] => " + current + " [After] => " + (current - 1));
        current--;
        displayQues();
        displayXBtn();
    } else if (e.target.className.includes("next")) {
        console.log("[Before] => " + current + " [After] => " + (current + 1));
        current++;
        displayQues();
        displayXBtn();
    }
}

function over(btn) {
    current = btn.target.textContent;
    for (let e of document.getElementsByClassName("ex")) {
        if (current == btn.target.textContent) {
            e.style = "color: white";
        } else {
            e.style = "color: lightgreen";
        }
    }
    current--;
    displayQues();
    displayXBtn();
}

function setExtra() {
    let bottom = getID("QS"), gd;
    for(x = 0; x != gobalQ;x++){
      if(x == 0||x % 5 == 0){
        let d = create("div");
        d.id = "d" + Math.round(x/5);
        gd = d;
      }
      var btn = document.createElement("button");
      btn.textContent = x + 1;
      btn.className = "btn ex";
      gd.append(btn);
      bottom.append(gd);
    }  
}

function result() {
    while (r.firstChild) {
        r.removeChild(r.firstChild);
    }
    total = document.createElement('label'), t = 0;
    for (index = 0; index != gobalQ; index++)
    {
        q = document.createElement('label'), ra = document.createElement('label'), rd = document.createElement('div');
        q.innerHTML = (index + 1) + ". You Answered " + String.fromCharCode(64 + ~~digia[index][3]) + " Result: ";
        ra.innerHTML = digia[index][3] == gobalA[index] ? 'correct' : 'incorrect';
        ra.className = ra.innerHTML == 'correct' ? 'c' : 'i';
        if (ra.className == 'c') {
            t++;
        }
        q.append(ra);
        rd.append(q);
        r.append(rd);
    }
    t /= gobalQ;
    total.textContent = "Total Result: " + (t * 100).toFixed(2) + "%";
    r.append(total);
    getID("container").append(r);
}
function setExtraInfo(){
  let xinfo = getTN("info"),
    admin = getTN("name",xinfo),
    email = getTN("email",xinfo),
    type = getTN("type"),
    n = document.createElement("label"),
    e = document.createElement("label");
  n.innerHTML = "Created by: "+ admin[0].innerHTML;
  e.innerHTML = "Email: " + email[0].innerHTML;
  getID("xi").append(e);
  getID("xi").append(create("br"));
  getID("xi").append(n);
}
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        document.title = title(localStorage.getItem("CQ" + (localStorage.length - 1)).substring(5)) + " Fourm";
        info = xhr.responseXML;
        gobalQ = info.getElementsByTagName("con").length;
        for (x = 0; x != gobalQ; x++) {
            setup(x);
        }
        for (let e of document.getElementsByClassName("ans")) {
            e.addEventListener('click', btnEff, false);
        }
        displayQues();
        setExtra();
        displayXBtn();
        setXBtn();
        for (let e of document.getElementsByClassName("ex")) {
            e.addEventListener('click', over, false);
        }
        setExtraInfo();
    }
}
r.id = 'result';
xhr.open('GET', localStorage.getItem("CQ" + (localStorage.length - 1)) + ".xml", true);
xhr.send('');
info = null;