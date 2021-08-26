let cntErr = 0;
let userDetails;
let userList;
let loggedIn;

if(localStorage.getItem("userDetails") === null) {
    cntErr = 1;
}
else {
    userDetails = JSON.parse(localStorage.getItem("userDetails"));
    userList = JSON.parse(localStorage.getItem("userList"));
    loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
}

function ChangePassword() {
    isSamePassword();
    isUserExist();
}

function isSamePassword() {
    const pswrd_1 = document.querySelector("#npsw");
    const pswrd_2 = document.querySelector("#ncpsw");
    const errorText = document.querySelector(".error-text");
    if(pswrd_1.value != pswrd_2.value){
        errorText.style.display = "block";
        errorText.classList.add("unmatched");
        errorText.textContent = "Error! Password Not Matched";
        cntErr++;
    }else{
        errorText.style.display = "block";
        errorText.textContent = "Nice! Password Matched";

        location.href = "#";
        cntErr = 0;
    }
}

function isUserExist() {
    const uname = document.querySelector("#uname").value;
    const npsw = document.querySelector("#npsw").value;
    const errorUsername = document.querySelector(".username");
    const errorText = document.querySelector(".error-text");

    if(cntErr == 0) {
        let cnt = 0;
        for(let i = 0; i < userDetails.length; i++) {
            if(userDetails[i].username == uname) {
                if(userDetails[i].password == npsw) {
                    errorText.style.display = "block";
                    errorText.classList.add("unmatched");
                    errorText.textContent = "Error! Password is same as earlier";
                    cnt = 1;
                    location.href = "#";
                    cntErr = 0;
                    break;
                }
                alert("Password changed successfully.");
                userDetails[i].password = npsw;
                for(let j = 0; j < userList.length; j++) {
                    if(userList[j].username == uname) {
                        userList[j].password = npsw;
                        break;
                    }
                }
                for( let k = 0; k < loggedIn.length; k++) {
                    if(loggedIn[k].username == uname) {
                        loggedIn.splice(i, 1);
                        break;
                    }
                }
                cnt = 1;

                localStorage.setItem("userDetails", JSON.stringify(userDetails));
                localStorage.setItem("userList", JSON.stringify(userList));
                localStorage.setItem("loggedInUser", JSON.stringify(loggedIn));

                location.href = "loginpage.html";
                break;
            }
        }
        if(cnt == 0) {
            errorUsername.style.display = "block";
            errorUsername.classList.add("unmatched");
            errorUsername.textContent = "Error! Incorrect username";
    
            location.href = "#";
            cntErr = 0;
        }
    }
}