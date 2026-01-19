const ids = [
    `VhGNlw8KwnvMEm1cISPV7w-aJ6Yc6XtyhvTv4WFSNMw`,
    `MQ4Ln5Sq41OkK_Up_ubo97c1nxFCx1USbIxqvGHyixM`,
    `6P2snCSXWkjFqMsE6qOynkMH5es2oEy8L6uXqCYtcC8`,
    `54j7mD6Gdq_17Fcia6ouIweuialttb3xUjK4pwcp-4c`,
    `Mp6ZS3h45ZdJIkPLYD3fx0VrlxpJuVDKuWDupMMv2RY`,
    `wJ3E55ftc7i_duhOp31uSZinQICeHx21CtWq6PVJvi8`,
    `TDDH_CHLG1sYHI-Ih_LrGQ837zU-PL3uhuR9CAtT4W4`,
    `vJRBRj0Yk_JffKkKpco-9i76NRFuv-10hXPaUtmfaFc`,
    `a3MyP9h24BjgeCGwrpoL2sC9TcIoA-J-fIITBOnuWIY`,
    `iZjuDMMMXnhhbFmGVxdng5p0VQg6HzWZMw3MuhOURl8`,
    `u4_bi8oMA13seaHIfpDd-d5lSdY5uTieMCPj61CP4fI`,
    `UtLZVcZnm63ZMOD8ptr3vHWOcEgY-Q6rF-Mei_18qVk`,
    `0IlNcGueKV8EP6cQbVoUAhOKIWLAS_oqHp6S4niGYFA`,
    `KU324flf8ldPBoj7naLwRwu7Ic6eNXi9tKI2CAxID7g`,
    `MEj7I3C5SBHIbNsnDrqmpU2HIH3gRWdlzMEkEhb_Pu8`,
    `59euJLwAANk66a99-w2VHZSBeuo7pBSDe66HkWVM68o`,
    `UVgyRh9fl6pwjGV9ddv9v03bYjdzgViuprP4M22KeeY`,
    `agOxyboI0lhvRgi0RQAgcFpUeAU-YyDVW23WcFiIC7Q`,
    `cPWV-7dGu5ljo_J6X6v0fFCCsQEHdTI8-oU1tha0ORA`,
    `P_exOkM4kAtJ7giCa2wA2uq4rLoNk75TaXhOY7KQvNY`,
    `axwG3PiHBAOq1ne2ytF9Zkl5VuNqpDVxPBJgSPujmYM`,
    `jcnauDhxPtwN31YOmiXGtUWadh0RrKps3fi1kCPKIY4`,
    `ROKrzErkp444ceUNbtT3iHDDXzVJtMgBYosadhFMCxk`,
    `lMEITUQiXDo-s-8NyAFzBZDvNus2mR5-Lp6DxVSk2s4`,
    `PVzi4q2LMRENQo6G6GwJ46-QEUk72G4UUM8oiMqXR10`,
    `8Sld_bl_SqUde1vn6L8unnI_nR3f1n9FMSozRSP5E1U`,
    `-12stlWibSqHNS-AvosTWEWfUne7NtGi-XDVhopEaF8`,
    `ptFtPgbgqr1Nt26OUw_6xKKfoj1ZDi1dldX6mitdmgo`,
    `FjhGvZq3FY998oaaqhNHLM6eA-TB1exvmgK_vqaQnRs`,
    `9qSC9xbVThu0_OV0F-jLovRbmdrW-w7cXYlMlcU8rvg`,
    `PVlZe3fCZuXzxH6L4vWECCBbuaa3PrV5_AfyzyH_QA0`,
    `8xGsdXOe8Bj2d-CDK8hhjLBs3Mxd8TmBBDK06j-p6cM`,
    `Sll9mkVT1rH8ekMyNSMSnND0xUnlk1S31tPGuRPR0Rw`,
    `QzAC_bzXKcosc2MpMhxRqSGNwBt9SyYhWgQD07AfUjE`,
    `tP20-RgPtLaRGfAZWD5v9v4LrT5kANuJohlBXs4B7yE`,
    `8LRX6XuJgHoMee42iEoPSZyRkMRRuhoBaYTKcZ5j8gg`,
    `ENAOsSrwXxYELVRdf3b2-1tZ2fKAWOjMtJRWiPGI5mo`,
    `R-X-H4kMagfDZ47RLmfIjjov5d9WZsprljmACjTO1_s`,
    `PS06tbx8mcL9oGsEKAEXB1zhxEa0HaoFOvk6V1qOudg`,
    `IExrDST9FiewhwPTHog3pO-qK7KPSop1JuiwBFRU_Co`,
    `9wYVFlsoUmmbYTKcyKmIal-JlvecSCV0gSoJTWwE-ls`,
    `RVjgGEiVszek_N5U1m5qtfcr-XZD52wzm0s8EJt1Xgo`,
    `4qW3uxm0TXKbY3ZA4RlYCXIpkrM_t5iMtDAji44GcOI`
]
const API = "https://corsproxy.io/?url=https://studio.code.org/v3/channels/"; //https://fetch-proxy.jacobbutler6.repl.co/json?url=
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
         <img class=project-thumbnail src=https://studio.code.org${project.thumbnailUrl} alt=${project.name}_Thumbnail loading=lazy></img>
        </a>
       </th>
       <th>
        <a href=https://studio.code.org${project.level}/${source}>
         <h2> ${project.name} </h2>
        </a>
       </th>
       <th>
        <h3> ${project.projectType} </h3>
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


function filterProjects(e) {
    let filter = e.srcElement.innerText.toLowerCase().replace(/\s/g, "") || e.srcElement.parentElement.innerText.toLowerCase().replace(/\s/g, "");
    let pjs = Array.from(document.querySelector("#projectList").children);
    let pjdata = Array();
    let filteredProjects = Array();

    if (filter === "name") {

        pjs.forEach(d => pjdata.push(d.children[1].innerText.toLowerCase()));
        pjdata.sort();

        pjdata.forEach(p => {
            let project = pjs.filter(d => { return p == d.children[1].innerText.toLowerCase() });
            filteredProjects.push(project[0].outerHTML);
        })

    }

    if (filter === "type") {
        pjs.forEach(d => {
            pjdata.push({ element: d, type: d.children[2].innerText.toLowerCase() });
        })
        pjdata.sort(function (a, b) { return b.type < a.type });
        pjdata.forEach(p => {
            filteredProjects.push(p.element.outerHTML);
        })
    }

    if (filter === "lastupdated") {
        //pjs.sort(function(a, b){return b-a});
        pjs.forEach(e => {
            pjdata.push({ element: e, date: (new Date(e.children[3].innerText.toLowerCase())).getTime() })
        })
        pjdata.sort(function (a, b) { return b.date - a.date })
        pjdata.forEach(d => {
            filteredProjects.push(d.element.outerHTML)
        })
    }
    filteredProjects = filteredProjects.join("");
    document.querySelector("#projectList").innerHTML = filteredProjects;

    document.querySelectorAll(".filterable").forEach(d => {
        if (filter === d.innerText.toLowerCase().replace(/\s/g, "")) d.children[0].classList.remove("right"), d.children[0].classList.add("down")
        else d.children[0].classList.remove("down"), d.children[0].classList.add("right")
    })

}

function searchAll() {
    let searchBy = document.querySelector("#searchby").selectedIndex;
    let search = new RegExp(document.querySelector("#search").value, "gi");
    let projects = Array.from(document.querySelector("#projectList").children)
    projects.forEach(p => {
        let column = p.children;
        let content = column[searchBy].innerText;
        if (search.test(content) || searchBy < 1) {
            p.style.display = "table-row";
        } else {
            p.style.display = "none";
        }
    })
}

document.querySelectorAll(".filterable").forEach(d=>{
    d.onclick = filterProjects;
})
document.querySelector("#search").onchange = searchAll;
document.querySelector("#searchby").onchange = searchAll;
