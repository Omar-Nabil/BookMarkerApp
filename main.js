var siteName = document.getElementById("name");
var siteUrl = document.getElementById("url");
var mainBtn = document.getElementById("mainBtn");
var search = document.getElementById("search");
var tbody = document.getElementById("tbody");

var sites = [] ;

if(localStorage.getItem("data") == null) {
    sites = [];
} 
else {
    sites = JSON.parse(localStorage.getItem("data"));
    display(sites);
}


var div = document.getElementById("errorName");
var div2 = document.getElementById("errorURL");

mainBtn.addEventListener('click',() => {
    if(siteName.value === "") {
        div.innerHTML = "Name Is Required";
        div.classList.add("w-100","text-danger", "mt-2");
    }
    else if(siteUrl.value === "") {
        div2.innerHTML = "URL Is Required";
        div2.classList.add("w-100","text-danger", "mt-2");
    }
    else {
        div.innerHTML = "";
        div2.innerHTML = "";
        if(mainBtn.innerHTML == "Add Bookmark")
            addURL();
        else {
            editURL();
        }
        console.log(3);
        clear();
    }
})

function addURL() {
    var site = {
        name : siteName.value,
        url : siteUrl.value
    }
    sites.push(site);
    display(sites);
    localStorage.setItem("data", JSON.stringify(sites));
}

var site;

function editURL() {
    site.name = siteName.value;
    site.url = siteUrl.value;
    localStorage.setItem("data", JSON.stringify(sites));
    display(sites);
    mainBtn.innerHTML = "Add Bookmark";
}

function editSite(index) {
    siteName.value = sites[index].name;
    siteUrl.value = sites[index].url;
    mainBtn.innerHTML = "Edit Bookmark";
    site = sites[index];
}

function display(arr) {
    var d = '';
    for(let i=0; i<arr.length; i++) {
        d += `
            <tr>
                <td>${arr[i].name}</td>
                <td><p class="small text-truncate" style="max-width: 300px">${arr[i].url}</p></td>
                <td>
                    <button class="btn btn-outline-dark" id="view" onclick="viewSite(${i})"><i class="fa-regular fa-eye fa-lg"></i></button>
                    <button class="btn btn-outline-warning mx-2" id="edit" onclick="editSite(${i})"><i class="fa-solid fa-pen-to-square fa-lg"></i></button>
                    <button class="btn btn-outline-danger" id="delete" onclick="deleteSite(${i})"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    }
    tbody.innerHTML = d;
}

function deleteSite(index) {
    sites.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(sites));
    display(sites);
}

function clear() {
    siteName.value = "";
    siteUrl.value = "";
}

function viewSite(i) {
    window.open(sites[i].url, "_blank");
}

search.addEventListener('keyup', () => {
    var x = [];
    for(let i=0; i<sites.length; i++) {
        if(sites[i].name.toLowerCase().includes(search.value.toLowerCase())) 
            x.push(sites[i]);
    }
    display(x);
})