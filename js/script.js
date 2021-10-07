// ------------------------------ Global variables
const overviewDiv = document.querySelector(".overview");
const reposList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");

const username = "k-packwood";


// ------------------------------- Functions
const getUserInfo = async function () {
    const repo = await fetch(`https://api.github.com/users/${username}`);
    const data = await repo.json();

    displayUserInfo(data);
};

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
                        <img alt="user avatar" src=${data.avatar_url} />
                    </figure>
                    <div>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Bio:</strong> ${data.bio}</p>
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
                    </div>`
    overviewDiv.append(div);
};

const getRepos = async function () {
    const repo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated,per_page?=100`);
    const data = await repo.json();

    displayReposData(data);
};

const displayReposData = async function (repos) {
    for (let repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;

        reposList.appendChild(li);
    }
};

const getRepoInfo = async function (repoName) {
    const repo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const data = await repo.json();

    const fetchLanguages = await fetch(data.languages_url);
    const languageData = await fetchLanguages.json();
    let languagesArray = [];

    for (let key in languageData){
        languagesArray.push(key);
    }

    displayRepoInfo(data, languagesArray);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoDataSection.innerHTML = "";

    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
                    <p>Description: ${repoInfo.description}</p>
                    <p>Default Branch: ${repoInfo.default_branch}</p>
                    <p>Languages: ${languages.join(", ")}</p>
                    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    
    repoDataSection.append(div);
    repoDataSection.classList.remove("hide");
};

getRepos();
getUserInfo();

// ----------------------------------- Event listeners
const repoList = reposList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});