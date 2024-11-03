const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search");

const getUser = async (username) => {
    try {
        const response = await fetch(APIURL + username);
        if (response.status === 404) {
            main.innerHTML = `<div class="card"><h2>User not found</h2></div>`;
            return;
        }
        
        const data = await response.json();
        const card = `
            <div class="card">
                <div>
                    <img class="avatar" src="${data.avatar_url}" alt="${data.name}">
                </div>
                <div class="user-info">
                    <h2>${data.name}</h2>
                    <p>${data.bio}</p>

                    <ul class="info">
                        <li>${data.followers}<strong>Followers</strong></li>
                        <li>${data.following}<strong>Following</strong></li>
                        <li>${data.public_repos}<strong>Repos</strong></li>
                    </ul>

                    <div id="repos"></div>
                </div>
            </div>
        `;
        main.innerHTML = card;
        getRepos(username);
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

// init call
// getUser("navjeetrajput14");

const getRepos = async (username) => {
    const repos = document.querySelector("#repos");
    try {
        const response = await fetch(APIURL + username + "/repos");
        const data = await response.json();
        data.forEach((item) => {
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerText = item.name;
            elem.target = "_blank";
            repos.appendChild(elem);
        });
    } catch (error) {
        console.error("Error fetching repositories:", error);
    }
};

const formSubmit = () => {
    if (searchBox.value !== "") {
        getUser(searchBox.value);
        searchBox.value = "";
    }
    return false;
};

searchBox.addEventListener("focusout", function () {
    formSubmit();
});
