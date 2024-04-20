function getProjects(){
    const urlGitHub = 'https://api.github.com/users/VicenteNeto21/repos'
    var loadingElement = document.getElementById('loading')

    fetch(urlGitHub,{
        method: 'GET',
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            showProjects(response)
            loadingElement.style.display = 'none'
        })
        .catch((e) => {
            console.log(`Error -> ${e}`)
        })
}

function showProjects(data) {
    var listElement = document.getElementById('project-list');
    for (let i = 0; i < data.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");

        let projectLink = document.createElement("a");
        projectLink.href = data[i]['html_url'];
        projectLink.target = '_blank';

        let projectName = document.createElement("h3");
        projectName.textContent = data[i]['name'];
        projectLink.appendChild(projectName);

        let projectDescription = document.createElement("p");
        projectDescription.textContent = data[i]['description'];
        

        projectLink.appendChild(projectName);
        card.appendChild(projectLink);
        card.appendChild(projectDescription);

        listElement.appendChild(card);
    }
}

getProjects();


