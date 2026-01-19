const sourceAPI = `https://corsproxy.io/?url=`; //`https://fetch-proxy.jacobbutler6.repl.co/`;
const hostAPI = `https://studio.code.org/v3/`;
// To main page
document.querySelector("#back").onclick = function() {
  location.href = "/CDOLFP"
}
// Show source code
document.querySelector("#sources").onclick = function() {
  let host = `https://studio.code.org/v3/sources/${id}/main.json`
  fetch(sourceAPI + host).then(response => {
    if(response.status < 206) {
      return response.json();
    }
  }).then(data => {
    document.querySelector("#content").innerHTML = `<code>${JSON.stringify(data)}</code>`
  })
}
// Show any assets used outside of animations
document.querySelector("#assets").onclick = function() {
  let host = `${hostAPI}assets/${id}`
  fetch(sourceAPI + host).then(response => {
    if(response.status < 206) {
      return response.json();
    }
  }).then(data => {
    let content = "";
    for(let media of data) {
      content += `<p> ${media.filename} </p>`
      if(media.category === "image") {
        content += `<img src=${host}/${media.filename} style="max-width: 100%"></img>`
      } else {
        content += `
        <audio controls>
        <source src=${host}/${media.filename}></source>
        </audio>`
      }
    }
    document.querySelector("#content").innerHTML = content || "<p> No Assets </p>";
  })
}
// Show all animations in a project
document.querySelector("#animations").onclick = function() {
  let host = `${hostAPI}animations/${id}`
  fetch(sourceAPI + host).then(response => {
    if(response.status < 206) {
      return response.json();
    }
  }).then(data => {
    let content = "";
    for(let image of data) {
      if(image.filename !== undefined) {
        content += `<img src=${host}/${image.filename} style="max-width: 100%"></image>`;
      }
    }
    document.querySelector("#content").innerHTML = content || "<p> No Animations </p>";
  })
}
// Show relevant info if it was published as a library
document.querySelector("#libraries").onclick = function() {
 let host = `${hostAPI}libraries/${id}`;
 fetch(sourceAPI + host).then(response => {
    if(response.status < 206) {
      return response.json();
    }
  }).then(data => {
    document.querySelector("#content").innerHTML = `<code>${JSON.stringify(data)}</code>`
  })
}
// Clear output in content frame
document.querySelector("#clear").onclick = function() {
  document.querySelector("#content").innerHTML = "";
}
// Reload the game frame
document.querySelector("#reload").onclick = function() {
    document.querySelector("#game").src = urlEmbed;
}
// View the origin project
document.querySelector("#origin").onclick = function() {
    window.location.href = urlEmbed.match(/.*(?=embed)/)[0];
}
// Remix the project on the site (requires an account for this to work)
document.querySelector("#fork").onclick = function() {
    window.location.href = urlEmbed.match(/.*(?=embed)/)[0] + "/remix";
}
// Exports the project on the main page so you don't have to own an account to host it
document.querySelector("#export").onclick = function () {
  let type = urlEmbed.includes("applab") ? "applab": "gamelab";
  window.location.href = `https://cdo-expo.jacobbutler6.repl.co/${type}/${id}`;
  // return new Promise(resolve, reject) {
  //   let type = urlEmbed.includes("applab") ? "applab": "gamelab";
  //   fetch(`https://cdo-expo.jacobbutler6.repl.co/${type}/${id}`)
  //     .then(response => {
  //       if(response.status < 206) {return response.blob()}
  //     })
  //     .then(data => {
  //       resolve(data);
  //     })
  //     .catch(err => {
  //       reject(err);
  //     })
  // }
}
