var startTestBtn = document.getElementById('startTest')
function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
        return true;
    }else{
        return false;
    }
}
startTestBtn.onclick = function (event) {
    let email = document.getElementById('email');
    let firstname = document.getElementById('fname');
    if (!ValidateEmail(email.value)) {
        alert("invalid email address ")
        return;
    }
    if(firstname.value.length==0){
        return ;
    }
    var urlvalue = "./interface/index.html?" + email.value;

    chrome.windows.create(
        {
            url: urlvalue,
            type: "popup",
            height: 320,
            width: 350,
        }
    )
}