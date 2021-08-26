let userList;

if(localStorage.getItem("userList") === null) {
    let x = [
        {username: "admin", password: "admin"},
        {username: "vineetks", password: "vineetks"},
        {username: "rahul", password: "rahulPass"},
        {username: "shayam", password: "shayamPass"},
        {username: "abhinav", password: "abhinavPass"}
    ];
    localStorage.setItem("userList", JSON.stringify(x));
    userList = JSON.parse(localStorage.getItem("userList"));
}
else {
    userList = JSON.parse(localStorage.getItem("userList"));
}

let userDetails = JSON.parse(localStorage.getItem("userDetails"));

/**
 * Login
 */
 function Login() {
    let uname = document.getElementById('users').value;
    let pass = document.getElementById('pass').value;
    let lang = document.getElementById('lang').value;
    const errorLogin = document.querySelector(".authlogin");
    let i = 0;
    for(i = 0; i < userList.length; i++) {
        if(userList[i].username == uname && userList[i].password == pass) {
            let j = 0;
            for(j = 0; j < userDetails.length; j++) {
                if(userDetails[j].username == uname && userDetails[j].language == lang) {
                    const url = 'profile.html?uname=' + encodeURIComponent(uname);
                    location.href = url;
                    if(localStorage.getItem("loggedInUser") === null) {
                        let x = [];
                        x.push(userList[i]);
                        localStorage.setItem("loggedInUser", JSON.stringify(x));
                    }
                    else {
                        let loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
                        let cnt = 0;
                        for(let k = 0; k < loggedIn.length; k++) {
                            if(loggedIn[k].username == uname) {
                                cnt = 1;
                                break;
                            }
                        }
                        if(cnt == 0) {
                            loggedIn.push(userList[i]);
                            localStorage.setItem("loggedInUser", JSON.stringify(loggedIn));
                        }
                    }
                    break;
                }
            }
            if(j == userDetails.length) {
                errorLogin.style = "block";
                errorLogin.classList.add("failed");
                errorLogin.textContent = "Error! Language not matched.";
            }
            break;
        }
    }

    if(i == userList.length) {
        errorLogin.style = "block";
        errorLogin.classList.add("failed");
        errorLogin.textContent = "Error! Incorrect username or password or language.";
    }
}