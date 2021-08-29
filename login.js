let userList;
let userDetails;
if(localStorage.getItem("userList") === null) {
    let x = [
        {username: "admin", password: "admin", language: "English"},
        {username: "vineetks", password: "vineetks", language: "English"},
        {username: "salman", password: "salmankhan", language: "Hindi"},
        {username: "aamir", password: "aamirkhan", language: "Hindi"},
        {username: "shahrukh", password: "shahrukh", language: "English"},
        {username: "amitabh", password: "bachchan", language: "Hindi"}
    ];
    localStorage.setItem("userList", JSON.stringify(x));
    userList = JSON.parse(localStorage.getItem("userList"));
}
else {
    userList = JSON.parse(localStorage.getItem("userList"));
}

if(localStorage.getItem("userDetails") === null) {
    let x = [];
    x.push(
        {
            firstname: "Admin",
            lastname: "",
            username: "admin",
            phone: "6524789562",
            address: "Masjid Banda, Hyderabad",
            language: "English",
            profile: "admin.webp",
            email: "admin@beehyv.com",
            password: "admin"
        },
        {
            firstname: "Vineet",
            lastname: "KS",
            username: "vineetks",
            phone: "6524789562",
            address: "Masjid Banda, Hyderabad",
            language: "English",
            profile: "vineet.jpg",
            email: "vineetks@beehyv.com",
            password: "vineetks"
        },
        {
            firstname: "Salman",
            lastname: "Khan",
            username: "salman",
            phone: "6524789562",
            address: "Galaxy Apartment, Bandra",
            language: "Hindi",
            profile: "Salman.jpg",
            email: "being.human@socialworker.net",
            password: "salmankhan"
        },
        {
            firstname: "Aamir",
            lastname: "Khan",
            username: "aamir",
            phone: "6524789562",
            address: "Freeda Apartments, Bandra West",
            language: "Hindi",
            profile: "Aamir.jpg",
            email: "maloomnhi@gmail.com",
            password: "aamirkhan"
        },
        {
            firstname: "Shah Rukh",
            lastname: "Khan",
            username: "shahrukh",
            phone: "2226058704",
            address: "Mannat, Bandra",
            language: "English",
            profile: "Shahrukh.jpg",
            email: "srkfans@redchillies.com",
            password: "shahrukh"
        },
        {
            firstname: "Amitabh",
            lastname: "Bachchan",
            username: "amitabh",
            phone: 6524789562,
            address: "Jalsa, Juhu",
            language: "Hindi",
            profile: "Amitabh.jpg",
            email: "snrbachchan@gmail.com",
            password: "bachchan"
        }
    );
    localStorage.setItem("userDetails", JSON.stringify(x));
    userDetails = JSON.parse(localStorage.getItem("userDetails"));
}
else {
    userDetails = JSON.parse(localStorage.getItem("userDetails"));
}

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
                        x.push({
                            username: userList[i].username,
                            password: userList[i].password
                        });
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
                            loggedIn.push({
                                username: userList[i].username,
                                password: userList[i].password
                            });
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
        errorLogin.textContent = "Error! Incorrect username or password.";
    }
}