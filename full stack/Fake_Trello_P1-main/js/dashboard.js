const container_dashboards = document.getElementById("dashboards");
const add_dash_btn = document.getElementById("add-dashboard");
add_dash_btn.addEventListener("click", createDash);

function createDash(){
    /*Divs*/
    const col_div = document.createElement("div");
    col_div.classList.add("col-4");
    col_div.classList.add("overflow-auto");
    const card_div = document.createElement("div");
    card_div.classList.add("card");
    card_div.setAttribute("style", "width: 18rem;");
    const card_body = document.createElement("div");
    card_body.classList.add("card-body");

    /*Image*/
    const dash_img = document.createElement("img");
    dash_img.classList.add("card-img-top");
    dash_img.setAttribute("src", "../assets/media/images/javascript.png");
    dash_img.setAttribute("alt", "Card image cap");

    /*Title*/
    const title_val = document.getElementById("dash_name").value;    
    const title_txt = document.createTextNode(title_val);    
    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.appendChild(title_txt);

    /*Description*/
    const desc_val = document.getElementById("dash_description").value;
    const desc_txt = document.createTextNode(desc_val);
    const p_desc = document.createElement("p");
    p_desc.classList.add("card-text");
    p_desc.appendChild(desc_txt);    

    /*Access Button*/
    const acc_button = document.createElement("a");           
    acc_button.classList.add("btn");
    acc_button.classList.add("btn-primary");        
    acc_button.setAttribute("href", "dashboard.html");
    const acc_button_txt = document.createTextNode("Acceder");
    acc_button.appendChild(acc_button_txt);

    /*Delete Button*/
    const del_button = document.createElement("btn");  
    del_button.setAttribute("type", "button");
    del_button.classList.add("btn");    
    del_button.classList.add("btn-danger");
    del_button.classList.add("btn-delete");        
    del_button.setAttribute("data-bs-toggle", "modal");
    del_button.setAttribute("data-bs-target", "#DeleteDash");    
    del_button.setAttribute("onclick", "deleteDash(this)");
    const del_button_txt = document.createTextNode("Eliminar");
    del_button.appendChild(del_button_txt);

    card_body.appendChild(h5);
    card_body.appendChild(p_desc);
    card_body.appendChild(acc_button);
    card_body.appendChild(del_button);

    card_div.appendChild(dash_img);
    card_div.appendChild(card_body);
    col_div.appendChild(card_div);

    console.log(col_div);
    container_dashboards.appendChild(col_div);
    clearLabels();
}

function clearLabels(){
    document.getElementById("dash_name").value="";
    document.getElementById("dash_description").value="";
}


function deleteDash(element){  
    console.log(element);
    document.getElementById("DeleteBtn").addEventListener("click", function() { element.closest(".col-4").remove()});
    console.log(element.closest(".col-4"));
}
