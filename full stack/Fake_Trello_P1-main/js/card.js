const todo_pannel = document.getElementById("todo-pannel");
const add_button = document.getElementById("add-card");
const upd_button = document.getElementById("update-card");

add_button.addEventListener("click", createCard);

const id_div = "drag"
var i = 0;

//modal_button.addEventListener("click", createCard);

function createCard(){    
    /*Divs*/
    const card_div = document.createElement("div");    
    var res = id_div.concat(String(i));
    card_div.setAttribute("id", res);
    
    card_div.classList.add("card");
    card_div.classList.add("mb-3");
    card_div.setAttribute("draggable", "true");
    card_div.setAttribute("ondragstart", "drag(event)");
    const row_div = document.createElement("div");
    row_div.classList.add("row");
    row_div.classList.add("g-0");
    const col_div = document.createElement("div");
    col_div.classList.add("col-md-12");    
    const card_body = document.createElement("div");
    card_body.classList.add("card-body");    
    
    /*Title*/
    const title_val = document.getElementById("title").value;
    const title_txt = document.createTextNode(title_val);
    const h5 = document.createElement("h5");    
    h5.classList.add("card-title");
    h5.appendChild(title_txt);

    /*Description*/
    const desc_val = document.getElementById("description").value;
    const desc_txt = document.createTextNode(desc_val);
    const p_desc = document.createElement("p");    
    p_desc.classList.add("card-text");
    p_desc.classList.add("card-description");
    p_desc.appendChild(desc_txt);
    const br = document.createElement("br");
    p_desc.appendChild(br);

    /*Deadline*/
    const deadline_val = document.getElementById("deadline").value;    
    const p_date = document.createElement("p");
    if (deadline_val !== ""){
        const deadline_format = formatDateYtoD(deadline_val);
        const deadline_txt = document.createTextNode(deadline_format);
        const s_date = document.createElement("small");        
        s_date.classList.add("card-deadline");
        s_date.classList.add("text-muted");
        s_date.appendChild(deadline_txt);        
        p_date.classList.add("card-text");       
        p_date.appendChild(s_date);
    }    
    
    /*Update Button*/
    const upd_button = document.createElement("btn");
    upd_button.setAttribute("id", "btn"+String(i));
    upd_button.setAttribute("type", "button");
    upd_button.classList.add("btn");
    upd_button.classList.add("btn-primary");
    upd_button.setAttribute("data-bs-toggle", "modal");
    upd_button.setAttribute("data-bs-target", "#AddUpdCard");
    upd_button.setAttribute("onclick", "modalUpdateCard(this)");
    const upd_button_txt = document.createTextNode("Modificar");
    upd_button.appendChild(upd_button_txt);

    /*Delete Button*/
    const del_button = document.createElement("btn");   
    del_button.setAttribute("type", "button"); 
    del_button.classList.add("btn");
    del_button.classList.add("btn-danger");
    del_button.classList.add("btn-delete");
    del_button.setAttribute("data-bs-toggle", "modal");
    del_button.setAttribute("data-bs-target", "#DeleteCard");
    del_button.setAttribute("onclick", "deleteCard(this)");
    const del_button_txt = document.createTextNode("Eliminar");
    del_button.appendChild(del_button_txt);

    card_body.appendChild(h5);    
    card_body.appendChild(p_desc);
    card_body.appendChild(p_date);
    card_body.appendChild(upd_button);
    card_body.appendChild(del_button);

    col_div.appendChild(card_body);
    row_div.appendChild(col_div);
    card_div.appendChild(row_div);
    
    todo_pannel.appendChild(card_div); 
    console.log(card_div);
    clearLabels();
    i += 1;   
}

/*Function that converts yyyy-mm-dd to dd/mm/yyyy*/
function formatDateYtoD(input) {
    var datePart = input.match(/\d+/g),
    year = datePart[0]
    month = datePart[1], day = datePart[2];
  
    return day+'/'+month+'/'+year;
}

function formatDateDtoY(input) {
    var datePart = input.match(/\d+/g),
    year = datePart[2]
    month = datePart[1], day = datePart[0];
  
    return year+'-'+month+'-'+day;
}

function clearLabels(){
    document.getElementById("title").value="";
    document.getElementById("description").value="";
    document.getElementById("deadline").value="";
}

const delete_btns = document.querySelectorAll(".btn-delete");

function modalAddCard(){    
    clearLabels();
    changeModalTitle(document.getElementById("modalTitle"), "Agregar");            
    add_button.style.display="block";
    upd_button.style.display="none";
}

function modalUpdateCard(element){    
    changeModalTitle(document.getElementById("modalTitle"), "Modificar");     
    /*Obtain card values*/
    const card_body = element.parentElement; 
    console.log(card_body);
    const title = card_body.children[0];     
    const description = card_body.children[1];
    const deadline = card_body.children[2];    

    /*Change add btn to update btn*/
    add_button.style.display="none";
    upd_button.style.display="block";
    upd_button.setAttribute("onclick", "updateCard(document.getElementById('" + element.id +"'))");

    /*Fill the form with the card values*/
    document.getElementById("title").value=getTextContent(title);
    document.getElementById("description").value=getTextContent(description);
    document.getElementById("deadline").value=formatDateDtoY(getTextContent(deadline));            
}

function updateCard(element){    
    const card_body = element.parentElement;     
    const title = card_body.children[0];     
    const description = card_body.children[1];
    const deadline = card_body.children[2]; 

    deleteChilds(title);
    deleteChilds(description);
    deleteChilds(deadline);
    title.appendChild(document.createTextNode(document.getElementById("title").value));        
    description.appendChild(document.createTextNode(document.getElementById("description").value));        
    deadline.appendChild(document.createTextNode(formatDateYtoD(document.getElementById("deadline").value)));
}

function changeModalTitle(element, action){
    deleteChilds(element);
    element.appendChild(document.createTextNode(action + " tarjeta"));
}

function deleteChilds(element){
    while(element.firstChild){
        element.removeChild(element.lastChild);
    }
}

function getTextContent(element){
    return element.textContent;
}

function deleteCard(element){
    document.getElementById("DeleteBtn").addEventListener("click", function() { element.closest(".card").remove()});        
}
