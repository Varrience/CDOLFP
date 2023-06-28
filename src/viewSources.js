const sourceAPI = `https://fetch-proxy.jacobbutler6.repl.co/`;
const hostAPI = `https://studio.code.org/v3/`;
// Show any assets used outside of animations
document.querySelector("#assets").onclick = function() {
  let host = `${hostAPI}/assets/${id}`
  fetch(`${sourceAPI}json?url=${host}`).then(response => {
    if(response.status < 206) {
      return response.json();
    }
  }).then(data => {
    let content = "";
    for(let media of data) {
      content += `<p> ${media.filename} </p>`
      if(media.category === "image") {
        content += `<img src=${sourceAPI}media?url=${host}/${media.filename}></img>`
      } else {
        content += `
        <audio controls>
        <source src=${sourceAPI}media?url=${host}/${media.filename}></source>
        </audio>`
      }
    }
    document.querySelector("#content").innerHTML = content;
  })
}
// Show all animations in a project
document.querySelector("#animations").onclick = function() {
  let host = `${hostAPI}animations/${id}`
  fetch(`${sourceAPI}json?url=${host}`).then(response => {
    if(response.status < 206) {
      return response.json();
    }
  }).then(data => {
    let content = "";
    for(let image of data) {
      if(image.filename !== undefined) {
        content += `<img src=${sourceAPI}media?url=${host}/${image.filename}></image>`;
      }
    }
    document.querySelector("#content").innerHTML = content;
  })
}
// Show relevant info if it was published as a library
document.querySelector("#libraries").onclick = function() {
 let host = `${hostAPI}libraries/${id}`;
 fetch(`${sourceAPI}json?url=${host}`).then(response => {
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
