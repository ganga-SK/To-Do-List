var enterButton = document.getElementById("add-item");

var input = document.getElementById("userInput");

var ul = document.querySelector("ul");

var item = document.getElementsByTagName("li");

window.onload = loadListFromLocalStorage;

function inputLength(){
    return input.value.length;
}

function createListElement(value,done=false){
    
    var li = document.createElement("li");

    li.appendChild(document
        .createTextNode(value));
    if (done){
        li.classList.add("done");
    }


    input.value="";

    ul.appendChild(li);

    li.classList.add("list-element");

    saveListToLocalStorage();

    

    var dBtn = document.createElement("button");

    dBtn.appendChild(document.createTextNode("X"));

    

    li.appendChild(dBtn);

    dBtn.addEventListener("click",deleteListElement);

    

    

    function deleteListElement(){
        li.classList.add("delete");
        saveListToLocalStorage();
        
    }
    dBtn.classList.add("delete-button");



    li.addEventListener("click",strikeThrough);

    function strikeThrough(){
        li.classList.add("done");
    }

    saveListToLocalStorage();


}

function addListElement(){
    if (inputLength() > 0)
        createListElement(input.value);
}

function addListElementKeyPress(event){
    if (inputLength() > 0 && event.keyCode === 13){
        createListElement(input.value);
    }
}


function saveListToLocalStorage(){
    var items = [];
    for (var i = 0 ; i < ul.children.length ; i++){
        var li = ul.children[i];
        if(li.classList.contains("delete")) continue;
        var value = li.firstChild.textContent;
        var done = li.classList.contains("done");
        items.push({value: value, done: done});
    }
    localStorage.setItem("toDoList",JSON.stringify(items));
}

function loadListFromLocalStorage(){
    var items = JSON.parse(localStorage.getItem("toDoList"));
    if (items){
        for (var i =0; i < items.length ; i++){
            createListElement(items[i].value , items[i].done);
        }
    }
}

enterButton.addEventListener("click",addListElement);

input.addEventListener("keypress",addListElementKeyPress);