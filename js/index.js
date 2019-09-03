let submitBtn = document.getElementById("submit");
let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let alertContainer = document.getElementById("alertContainer");
let urls = [];


if(localStorage.getItem("Bookmarks") != null)
    {
        urls = JSON.parse(localStorage.getItem("Bookmarks"));
        showUrl();
    }




submitBtn.addEventListener("click",function(){
     if (validateForm() == true) {
    addUrl();    
    showUrl();
    clearInputs();  
     }
});

function validateForm() {
  let errors = "";
  let nameRegx = /^[A-Z][a-zA-Z]{2,20}$/;
  let urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  if (nameRegx.test(siteName.value) == false) {
    alertContainer.style.display = "block";
    errors += "<p>bookmark name must start with upper case and name length cannot exceed 20 characters</p>";
    alertContainer.innerHTML = errors;
  }
  if (urlRegex.test(siteUrl.value) == false) {
    alertContainer.style.display = "block";
    errors += "<p>enter a valid url</p>";
    alertContainer.innerHTML = errors;
  }

  if (errors.length > 0) {
    return false;
  } else {
    alertContainer.style.display = "none";
    return true;
  }
}

function clearInputs(){
    siteName.value="";
    siteUrl.value="";
}
function addUrl(){
    let newUrl = {
        name: siteName.value,
        url:siteUrl.value
    };
    urls.push(newUrl);
    localStorage.setItem("Bookmarks",JSON.stringify(urls));
}

function showUrl(){
    let urlContainer = document.getElementById("urlContainer");
    urlContainer.innerHTML = "";
    for (let i = 0; i< urls.length;i++){
        let newUrlDiv = "<div><h2>"+ urls[i].name +"</h2><a class='btn btn-primary' target='_blank' href='"+urls[i].url+"'>visit</a> <button class='btn btn-danger btndelete' onclick='deleteBookmark("+i+")'>Delete</button></div>";
        urlContainer.innerHTML+=newUrlDiv;
    }
    
}


function deleteBookmark(id){
    urls.splice(id,1);
    localStorage.setItem("Bookmarks",JSON.stringify(urls) )
    showUrl();
}
