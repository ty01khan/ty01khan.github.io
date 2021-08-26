let userDetails = JSON.parse(localStorage.getItem("userDetails"));
let userList = JSON.parse(localStorage.getItem("userList"));
let cntErr = 0;

/**
 * Signup page validation
 */  
function Signup() {
    checkFilled();
    checkUniqueUser();
    isValidNumber();
    checkEmployeeID();
    isValidAge();
    checkEmail();
    isSamePassword();
    signupValidation();
}

/**
 * function to check whether all the fields are filled or not
 */
function checkFilled() {
    const fname = document.querySelector("#firstname").value;
    const uname = document.querySelector("#uname").value;
    const phone = document.querySelector("#phone").value;
    const eID = document.querySelector("#eid").value;
    const addr = document.querySelector("#address").value;
    const dp = document.querySelector("#profilepic").value;
    const dob = document.querySelector("#dob").value;
    const email = document.querySelector("#email").value;
    const pass = document.querySelector("#pass").value;
    const cpass = document.querySelector("#cpass").value;
    const errorUname = document.querySelector(".filled");

    if(fname == "" || uname == "" ||
     phone == "" || eID == "" || addr == "" || 
     dp == "" || dob == "" || email == "" ||
     pass == "" || cpass == "") {
        cntErr++;
        errorUname.style = "block";
        errorUname.classList.add("not");
        errorUname.textContent = "Error! All fields should be filled.";
     }
}

/**
 * Checking for a unique username
 */
function checkUniqueUser() {
    const uname = document.querySelector("#uname");
    const errorUname = document.querySelector(".username");
    let chk = 0;
    for(const obj of userDetails) {
        if(obj.username == uname.value) {
            errorUname.style = "block";
            errorUname.classList.add("notunique");
            errorUname.textContent = "Error! Username already exists";
            cntErr++;
            chk = 1;
            break;
        }
    }
    if(chk == 0) {
        errorUname.style = "block";
        errorUname.classList.add("unique");
        errorUname.textContent = "Nice! Username is Unique";
    }
}

/**
 * function to ccheck entered phone number is of 10 digits or not
 */
function isValidNumber() {
    const phone = document.querySelector("#phone");
    const phoneErr = document.querySelector(".phone-error");
    if(phone.value.length != 10) {
        phoneErr.style.display = "block";
        phoneErr.classList.add("unmatched");
        phoneErr.textContent = "Error! Phone number should be of 10 digits";
        cntErr++;
    }else{
        phoneErr.style.display = "block";
        phoneErr.classList.add("matched");
        phoneErr.textContent = "Valid!";
    }
}

/**
 * function to check unique Employee ID
 */
function checkEmployeeID() {
    const empId = document.querySelector("#eid");
    const errorId = document.querySelector(".eid");
    let chk = 0;
    for(const obj of userDetails) {
        if(obj.eid == empId.value) {
            errorId.style = "block";
            errorId.classList.add("notunique");
            errorId.textContent = "Error! Employee ID already exists";
            cntErr++;
            chk = 1;
            break;
        }
    }
    if(chk == 0) {
        errorId.style = "block";
        errorId.classList.add("unique");
        errorId.textContent = "Nice! Employee ID is Unique";
    }
}

/**
 * function to check whether age is >= 20 years
 */
function isValidAge() {
    const dob = document.querySelector("#dob");
    const age = new Date().getFullYear() - new Date(dob.value).getFullYear();
    const invalidAge = document.querySelector(".invalid-age");
    if(age < 20) {
        invalidAge.style.display = "block";
        invalidAge.classList.add("unmatched");
        invalidAge.textContent = "Error! Age should atleast 20 years";
        cntErr++;
    }else{
        invalidAge.style.display = "block";
        invalidAge.classList.add("matched");
        invalidAge.textContent = "Valid!";
    }
}

/**
 * function checking whether entered email is unique or not
 */
 function checkEmail() {
    const emailid = document.querySelector("#email");
    const errorEmail = document.querySelector(".email");
    let chk = 0;
    for(const obj of userDetails) {
        if(obj.email == emailid.value) {
            errorEmail.style = "block";
            errorEmail.classList.add("notunique");
            errorEmail.textContent = "Error! Email ID already exists";
            cntErr++;
            chk = 1;
            break;
        }
    }
    if(chk == 0) {
        errorEmail.style = "block";
        errorEmail.classList.add("unique");
        errorEmail.textContent = "Nice! Email ID is Unique";
    }
}

/**
 * function checking whether password and confirm password fir=elds are same or not
 */
function isSamePassword() {
    const pswrd_1 = document.querySelector("#pass");
    const pswrd_2 = document.querySelector("#cpass");
    const errorText = document.querySelector(".error-text");
    const btn = document.querySelector("button");
    if(pswrd_1.value != pswrd_2.value){
        errorText.style.display = "block";
        errorText.classList.add("unmatched");
        errorText.textContent = "Error! Password Not Matched";
        cntErr++;
    }else{
        errorText.style.display = "block";
        errorText.classList.add("matched");
        errorText.textContent = "Nice! Password Matched";
    }
}

/**
 * Signup page validation code
 */
function signupValidation() {
    const fname = document.querySelector("#firstname").value;
    const lname = document.querySelector("#lastname").value;
    const uname = document.querySelector("#uname").value;
    const Phone = document.querySelector("#phone").value;
    let eId = document.querySelector("#eid").value;
    let addr = document.querySelector("#address").value;
    var gen="Male";
    if(document.getElementById('female').checked){
        gen = "Female";
    }else if(document.getElementById('other').checked){
        gen = "Other";
    }
    const lang = document.querySelector("#lang").value;
    let path = document.getElementById("profilepic").value;
    if(path.substr(0, 12) == "C:\\fakepath\\") {
        path = path.substr(12);
    }
    const DOB = document.querySelector("#dob").value;
    const Email = document.querySelector("#email").value;
    const pass = document.querySelector("#pass").value;
    if(cntErr == 0) {
        alert("Your account is successfully created!");
        userDetails.push({
            firstname: fname,
            lastname: lname,
            username: uname,
            phone: Phone,
            eid: eId,
            address: addr,
            gender: gen,
            language: lang,
            profile: path,
            dob: DOB,
            email: Email,
            password: pass
        });
        
        userList.push({
            username: uname,
            password: pass,
            language: lang
        });

        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        localStorage.setItem("userList", JSON.stringify(userList));

        if(localStorage.getItem("loggedInUser") === null) {
            let x = [];
            x.push({
                username: uname,
                password: pass
            });
            localStorage.setItem("loggedInUser", JSON.stringify(x));
        }
        else {
            let loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
            let cnt = 0;
            for(let i = 0; i < loggedIn.length; i++) {
                if(loggedIn[i].username == uname) {
                    cnt = 1;
                    break;
                }
            }
            if(cnt == 0) {
                loggedIn.push({username: uname, password: pass});
                localStorage.setItem("loggedInUser", JSON.stringify(loggedIn));
            }
        }

        var url = 'profile.html?uname=' + encodeURIComponent(uname);
        location.href = url;
    }
    else {
        alert("Signup failed!");
        location.href = "#";
        cntErr = 0;
    }
}
