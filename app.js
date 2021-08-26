// let userList;

// if(localStorage.getItem("userList") === null) {
//     let x = [
//         {username: "admin", password: "admin"},
//         {username: "vineetks", password: "vineetks"},
//         {username: "rahul", password: "rahulPass"},
//         {username: "shayam", password: "shayamPass"},
//         {username: "abhinav", password: "abhinavPass"}
//     ];
//     localStorage.setItem("userList", JSON.stringify(x));
//     userList = JSON.parse(localStorage.getItem("userList"));
// }
// else {
//     userList = JSON.parse(localStorage.getItem("userList"));
// }

let userDetails = JSON.parse(localStorage.getItem("userDetails"));

/**
 * Logout
 */
 function Signout() {
    var loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    loggedIn.splice(0, 1);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedIn));
    location.href = "loginpage.html";
}

/**
 * Loading profile page
 */
window.addEventListener('load', () => {
    document.getElementById("save").style.display="none";
    const params = (new URL(document.location)).searchParams;
    const uname = params.get('uname');

    for(let i = 0; i < userDetails.length; i++) {
        if(uname == userDetails[i].username) {
            document.getElementById('result-image').src = "image/" + userDetails[i].profile;
            document.getElementById('result-name').innerHTML = userDetails[i].firstname + " " + userDetails[i].lastname;
            document.getElementById('result-address').innerHTML = userDetails[i].address;
            document.getElementById('result-phone').innerHTML = userDetails[i].phone;
            document.getElementById('link-mail').href = userDetails[i].email;
            document.getElementById('result-email').innerHTML = userDetails[i].email;
            document.getElementById('link-site').href = "http://home.iitpkd.ac.in/~" + uname;
            document.getElementById('result-link').innerHTML = "http://home.iitpkd.ac.in/~" + uname;
            document.getElementById('result-lang').innerHTML = userDetails[i].language;
            document.getElementById('linkedin').href = "https://www.linkedin.com/in/" + uname + "/";
            break;
        }
    }
})

/**
 * Edit button
 */
function editDetails() {
    document.getElementById("edit").style.display="none";
    document.getElementById("save").style.display="block";

    let addr = document.getElementById("result-address");
    let phone = document.getElementById("result-phone");
    let email = document.getElementById("result-email");
    let link = document.getElementById("result-link");
    
    let addr_data = addr.innerHTML;
    let phone_no = phone.innerHTML;
    let email_id = email.innerHTML;
    let link_data = link.innerHTML;

    addr.innerHTML = "<input type='text' id='address-text' value='"+addr_data+"'>";
    phone.innerHTML = "<input type='tel' id='phone-text' value='"+phone_no+"'>";
    email.innerHTML = "<input type='email' id='email-text' value='"+email_id+"'>";
    link.innerHTML = "<input type='text' id='link-text' value='"+link_data+"'>";
}

/**
 * Save button
 */
function saveDetails() {
    let addr_val = document.getElementById("address-text").value;
    let phone_val = document.getElementById("phone-text").value;
    let email_val = document.getElementById("email-text").value;
    let link_val = document.getElementById("link-text").value;

    document.getElementById("result-address").innerHTML = addr_val;
    document.getElementById("result-phone").innerHTML = phone_val;
    document.getElementById("result-email").innerHTML = email_val;
    document.getElementById("result-link").innerHTML = link_val;
    document.getElementById("link-mail").href = email_val;
    document.getElementById("link-site").href = link_val;

    document.getElementById("edit").style.display="block";
    document.getElementById("save").style.display="none";
    alert("Your informations are updated.");

    const params = (new URL(document.location)).searchParams;
    const uname = params.get('uname');

    for(let i = 0; i < userDetails.length; i++) {
        if(userDetails[i].username == uname) {
            userDetails[i].address = addr_val;
            userDetails[i].phone = phone_val;
            userDetails[i].email = email_val;

            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            break;
        }
    }
}