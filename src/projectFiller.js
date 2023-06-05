const ids = [`VhGNlw8KwnvMEm1cISPV7w-aJ6Yc6XtyhvTv4WFSNMw`, `MQ4Ln5Sq41OkK_Up_ubo97c1nxFCx1USbIxqvGHyixM`, `6P2snCSXWkjFqMsE6qOynkMH5es2oEy8L6uXqCYtcC8`, `54j7mD6Gdq_17Fcia6ouIweuialttb3xUjK4pwcp-4c`, `Mp6ZS3h45ZdJIkPLYD3fx0VrlxpJuVDKuWDupMMv2RY`, `wJ3E55ftc7i_duhOp31uSZinQICeHx21CtWq6PVJvi8`, `TDDH_CHLG1sYHI-Ih_LrGQ837zU-PL3uhuR9CAtT4W4`, `vJRBRj0Yk_JffKkKpco-9i76NRFuv-10hXPaUtmfaFc`, `a3MyP9h24BjgeCGwrpoL2sC9TcIoA-J-fIITBOnuWIY`, `iZjuDMMMXnhhbFmGVxdng5p0VQg6HzWZMw3MuhOURl8`, `u4_bi8oMA13seaHIfpDd-d5lSdY5uTieMCPj61CP4fI`, `UtLZVcZnm63ZMOD8ptr3vHWOcEgY-Q6rF-Mei_18qVk`, `5395oJsn6I1FuXArGI_nVslx55b9JClHO8iA8bVomn8`, `0IlNcGueKV8EP6cQbVoUAhOKIWLAS_oqHp6S4niGYFA`, `KU324flf8ldPBoj7naLwRwu7Ic6eNXi9tKI2CAxID7g`, `MEj7I3C5SBHIbNsnDrqmpU2HIH3gRWdlzMEkEhb_Pu8`, `59euJLwAANk66a99-w2VHZSBeuo7pBSDe66HkWVM68o`, `UVgyRh9fl6pwjGV9ddv9v03bYjdzgViuprP4M22KeeY`, `Q3laBaq47f43JOBLZ8qzHlnfYk1eXvBZnaJ0TX5WS2Q`, `agOxyboI0lhvRgi0RQAgcFpUeAU-YyDVW23WcFiIC7Q`, `cPWV-7dGu5ljo_J6X6v0fFCCsQEHdTI8-oU1tha0ORA`, `P_exOkM4kAtJ7giCa2wA2uq4rLoNk75TaXhOY7KQvNY`]
const API = "https://fetch-proxy.jacobbutler6.repl.co/json?url=https://studio.code.org/v3/channels/"
const projectTable = document.querySelector("#projectList");
projectTable.innerHtml = "";
    // Loop through the projects array and create table rows with thumbnails
    (function orderedFetch(index) {
      let source = ids[index];
      fetch(API + source)
      .then(response => {
        if(response.status < 206) {
          return(response.json())
        } 
      })
      .then(project => {
      if(project == undefined) {return}
      let date = new Date(project.updatedAt);
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      projectTable.innerHTML += `
      <tr>
       <th>
        <a href=${location.pathname}project?url=https://studio.code.org${project.level}/${source}>
         <img class=project-thumbnail src=https://studio.code.org${project.thumbnailUrl} alt=${project.name}_Thumbnail></img>
        </a>
       </th>
       <th>
        <a href=https://studio.code.org${project.level}/${source}>
         <h2> ${project.name} </h2>
        </a>
       </th>
       <th>
        <p> ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} <p>
       </th>
      `
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        if(index < ids.length-1) {
          orderedFetch(index + 1)
        }
      })
    })(0)


function filterProjects(e){
    let filter = e.srcElement.innerText.toLowerCase().replace(/\s/g, "") || e.srcElement.parentElement.innerText.toLowerCase().replace(/\s/g, "");
    let pjs = Array.from(document.querySelector("#projectList").children);
    let pjdata = Array();
    let filteredProjects = Array();

    if(filter == "name"){

        pjs.forEach(d => pjdata.push(d.children[1].innerText.toLowerCase()));
        pjdata.sort();
        
        pjdata.forEach(p=>{
            let project = pjs.filter(d =>{return p == d.children[1].innerText.toLowerCase()});
            filteredProjects.push(project[0].outerHTML);
        })

    }

    if(filter == "lastupdated"){

        //pjs.sort(function(a, b){return b-a});
        pjs.forEach(d => pjdata.push((new Date(d.children[2].innerText.toLowerCase())).getTime()));
        pjdata.sort(function(a, b){return b-a});
        
        pjdata.forEach(p=>{
            let project = pjs.filter(d =>{return p == (new Date(d.children[2].innerText.toLowerCase())).getTime()});
            filteredProjects.push(project[0].outerHTML);
        })
        
    }

        
    filteredProjects = filteredProjects.join("");
    document.querySelector("#projectList").innerHTML = filteredProjects;


    document.querySelectorAll(".filterable").forEach(d=>{
        if(filter === d.innerText.toLowerCase().replace(/\s/g, ""))d.children[0].classList.remove("right"), d.children[0].classList.add("down")
        else d.children[0].classList.remove("down"), d.children[0].classList.add("right")
    })
    
}


document.querySelectorAll(".filterable").forEach(d=>{
    d.onclick = filterProjects;
})

