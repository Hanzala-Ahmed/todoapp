const firebaseConfig = {
  apiKey: "AIzaSyDFevKc7TKS0b01E580h_yRti_KKGxMJI8",
  authDomain: "todoapphan.firebaseapp.com",
  projectId: "todoapphan",
  storageBucket: "todoapphan.appspot.com",
  messagingSenderId: "654700344967",
  appId: "1:654700344967:web:00ac0ac81310ba405fea22",
  measurementId: "G-9979PCT3P6",
};
const app = firebase.initializeApp(firebaseConfig);
// console.log(app);xxx
var database = app.database();

function darkModeOn() {
  var body = document.getElementById("body");
  var div2 = document.getElementById("div2");
  var onBtn = document.createElement("i");
  var offBtn = document.getElementById("offBtn");
  onBtn.className = "fas fa-toggle-on darkmodeBtn";
  onBtn.id = "onBtn";
  onBtn.setAttribute("onClick", "darkModeOff()");
  offBtn.style.display = "none";
  div2.appendChild(onBtn);
  body.style.backgroundColor = "#353935";
}

function darkModeOff() {
  onBtn.remove();
  offBtn.style.display = null;
  div2.appendChild(offBtn);
  body.style.backgroundColor = "white";
}

function addNote() {
  var takeNoteMain = document.getElementById("takeNoteMain");
  var inputTakeNote = document.getElementById("inputTakeNote");
  var onClickTakeNote = document.createElement("div");
  var inputTitle = document.createElement("input");
  var inputTitleTxt = document.createElement("input");
  var btnDiv = document.createElement("div");
  var btnDiv1 = document.createElement("div");
  var btnDiv2 = document.createElement("div");
  var btnClrBlue = document.createElement("div");
  var btnClrRed = document.createElement("div");
  var btnClrYellow = document.createElement("div");
  var btnClrOrange = document.createElement("div");
  var btnClrLightblue = document.createElement("div");
  var btnClrPurple = document.createElement("div");
  var closeBtn = document.createElement("p");
  var createBtn = document.createElement("p");
  closeBtn.innerHTML = "Close";
  createBtn.innerHTML = "Create";
  onClickTakeNote.className = "onClickTakeNote";
  btnDiv1.id = "btnDiv1";
  btnDiv2.id = "btnDiv2";
  btnClrBlue.id = "btnClrBlue";
  btnClrRed.id = "btnClrRed";
  btnClrYellow.id = "btnClrYellow";
  btnClrOrange.id = "btnClrOrange";
  btnClrLightblue.id = "btnClrLightblue";
  btnClrPurple.id = "btnClrPurple";
  btnDiv.id = "btnDiv";
  inputTitle.className = "title";
  inputTitle.id = "titleInput";
  inputTitleTxt.className = "titleTxt";
  inputTitleTxt.id = "titleTxtInput";
  btnClrBlue.setAttribute("onclick", "btnClrBlue()");
  btnClrRed.setAttribute("onclick", "btnClrRed()");
  btnClrYellow.setAttribute("onclick", "btnClrYellow()");
  btnClrOrange.setAttribute("onclick", "btnClrOrange()");
  btnClrLightblue.setAttribute("onclick", "btnClrLightblue()");
  btnClrPurple.setAttribute("onclick", "btnClrPurple()");
  closeBtn.setAttribute("onclick", "closeBtn(this)");
  createBtn.setAttribute("onclick", "createBtnNote()");
  inputTitle.placeholder = "Title";
  inputTitleTxt.placeholder = "Take a note...";
  inputTakeNote.style.display = "none";
  takeNoteMain.appendChild(onClickTakeNote);
  onClickTakeNote.appendChild(inputTitle);
  onClickTakeNote.appendChild(inputTitleTxt);
  onClickTakeNote.appendChild(btnDiv);
  btnDiv.appendChild(btnDiv1);
  btnDiv.appendChild(btnDiv2);
  btnDiv1.appendChild(btnClrBlue);
  btnDiv1.appendChild(btnClrRed);
  btnDiv1.appendChild(btnClrYellow);
  btnDiv1.appendChild(btnClrOrange);
  btnDiv1.appendChild(btnClrLightblue);
  btnDiv1.appendChild(btnClrPurple);
  btnDiv2.appendChild(createBtn);
  btnDiv2.appendChild(closeBtn);
}

function btnClrBlue() {
  document.getElementById("btnDiv").style.backgroundColor = "#89CFF0";
  document.getElementById("titleTxtInput").style.backgroundColor = "#89CFF0";
}

function btnClrRed() {
  document.getElementById("btnDiv").style.backgroundColor = "#DF2800";
  document.getElementById("titleTxtInput").style.backgroundColor = "#DF2800";
}

function btnClrYellow() {
  document.getElementById("btnDiv").style.backgroundColor = "#ffef00";
  document.getElementById("titleTxtInput").style.backgroundColor = "#ffef00";
}

function btnClrOrange() {
  document.getElementById("btnDiv").style.backgroundColor = "#F1A40A";
  document.getElementById("titleTxtInput").style.backgroundColor = "#F1A40A";
}

function btnClrLightblue() {
  document.getElementById("btnDiv").style.backgroundColor = "#00ced1";
  document.getElementById("titleTxtInput").style.backgroundColor = "#00ced1";
}

function btnClrPurple() {
  document.getElementById("btnDiv").style.backgroundColor = "#9932cc";
  document.getElementById("titleTxtInput").style.backgroundColor = "#9932cc";
}

function closeBtn(a) {
  a.parentNode.parentNode.parentNode.remove();
  inputTakeNote.style.display = null;
}

function createBtnNote() {
  var titleInput = document.getElementById("titleInput");
  var titleInputValue = document.createTextNode(titleInput.value);
  var titleTxtInput = document.getElementById("titleTxtInput");
  var titleTxtInputValue = document.createTextNode(titleTxtInput.value);
    if(titleInput.value==""){
      alert("Please Input Title")
    return
  }
    if(titleTxtInput.value==""){
      alert("Please Input Text")
    return
  }
  var notesdivText = titleTxtInput.value;
  var notesdivTitle = titleInput.value;
  titleInput.value = "";
  titleTxtInput.value = "";
  var key = database.ref("/").push().key;
  
  let todoObj = {
    key: key,
    title:notesdivTitle,
    text: notesdivText,
  };
  database.ref("todonote").child(key).set(todoObj);
}


var notesData = []

database.ref("todonote").on("child_added" , function (data){
  let cardData= data.val();

  if(Object.keys(cardData).length>0){
    let card={
      key:cardData.key,
      title: cardData.title,
      text: cardData.text
    }
    createCards(card)
  }
})


const fun = async () => {
  database.ref("todonote").on("child_added" , function (data){
    notesData.push({key: data.val().key, todo: data.val().todo})
  })
}

fun().then(()=>{
  console.log("async", notesData);
})

function createCards(card){
  console.log("ttttf")
  var notesdiv = document.createElement("div");
  var title1 = document.createElement("div");
  var titleTxt = document.createElement("div");
  var dltBtn = document.createElement("div");
  var i = document.createElement("i");
  var titleInputValue = document.createTextNode(card.title);
  var titleTxtInputValue = document.createTextNode(card.text);
  notesdiv.className = "notesdiv col-lg-3 col-md-5 col-sm-12 ";
  notesdiv.className += card.key;
  title1.className = "title1";
  title1.id = "title1";
  titleTxt.className = "titleTxt1";
  titleTxt.id = "titleTxt1";
  notesdiv.id = "notesdiv";
  dltBtn.className = "dltBtn";
  i.className = "fas fa-trash";
  i.setAttribute("onclick", "event.stopPropagation();deleteBtn(this)");
  notesdiv.setAttribute("onClick", "editDiv(this)");
  createdNotesMain.appendChild(notesdiv);
  notesdiv.appendChild(title1);
  title1.appendChild(titleInputValue);
  titleTxt.appendChild(titleTxtInputValue);
  notesdiv.appendChild(titleTxt);
  notesdiv.appendChild(dltBtn);
  dltBtn.appendChild(i);
}


function deleteBtn(a) {
  let parentNode= a.parentNode.parentNode
  let key=parentNode.classList[4]
  database.ref("todonote").child(key).remove().then(()=>{
    window.location.reload()
  });
}

function editDiv(temp) {
  var textBgClr = temp.getAttribute("style");
  var titleText = temp.children[0].innerHTML;
  var titleText2 = temp.children[1].innerHTML;
  var body = document.getElementById("body");
  var editDivMain = document.createElement("div");
  var main = document.getElementById("main");
  main.className = "blur";
  var createdNotesMain = document.getElementById("createdNotesMain");
  createdNotesMain.style.display = "none";
  var header = document.getElementById("header");
  header.className = "blur header";
  var editDivMain1 = document.createElement("div");
  var editDivTitle = document.createElement("input");
  editDivTitle.value = titleText;
  var editDivTitleTxt = document.createElement("input");
  editDivTitleTxt.value = titleText2;
  var editDivDoneDiv = document.createElement("div");
  var editTxt = document.createElement("P");
  var editData = document.createElement("P");
  editData.innerHTML = "edit";
  editDivMain.id = "editDivMain";
  editTxt.innerHTML = "close";
  editDivMain.className = "container-fluid";
  editDivTitle.className = "editDivTitle";
  editDivTitle.id = "titleInputEdit";
  editDivTitleTxt.className = "editDivTitleTxt";
  editDivTitleTxt.id = "txtInputEdit";
  editDivDoneDiv.className = "editDivDoneDiv";
  editTxt.className = "editTxt";
  editData.className = "editData";
  editDivTitleTxt.setAttribute("style", textBgClr);
  editDivDoneDiv.setAttribute("style", textBgClr);
  editDivMain1.className = "editDivMain1 container";
  editTxt.addEventListener("click", function () {
    closeModal();
  });
  editData.addEventListener("click", function () {
    editCard(temp.classList[4]);
  });
  console.log("editData", temp.classList[4])
  body.appendChild(editDivMain);
  editDivMain.appendChild(editDivMain1);
  editDivMain1.appendChild(editDivTitle);
  editDivMain1.appendChild(editDivTitleTxt);
  editDivMain1.appendChild(editDivDoneDiv);
  editDivDoneDiv.appendChild(editData);
  editDivDoneDiv.appendChild(editTxt);
}

function editCard(id){
  var titleInputEdit1 = document.getElementById("titleInputEdit");
  var txtInputEdit1 = document.getElementById("txtInputEdit");
  let title  = titleInputEdit1.value;
  let text= txtInputEdit1.value;
  let todoObj = {
    key: id,
    title,
    text
  }
  database.ref("todonote").child(id).update(todoObj).then(()=>{
    window.location.reload()
  });
}

let text;

function closeModal() {
  var mainBlur = document.getElementById("main");
  mainBlur.classList.remove("blur");
  var headerBlur = document.getElementById("header");
  headerBlur.classList.remove("blur");
  var createdNotesMainDisplay = document.getElementById("createdNotesMain");
  createdNotesMainDisplay.style.display = null;
  var editDivMainHide = document.getElementById("editDivMain");
  editDivMainHide.remove();
  var titleInputEdit = text;
}
