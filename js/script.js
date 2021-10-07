// ------------------------------ Global variables
const overviewDiv = document.querySelector(".overview");
const reposList = document.querySelector(".repo-list");

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

getRepos();
getUserInfo();