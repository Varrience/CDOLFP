// Upscales CDO project, this will have to be dynamic depending on the projects aspect ratio
const sourceAPI = `https://fetch-proxy.jacobbutler6.repl.co/`;
const urlEmbed = `${location.search.match(/(?<=url=)[^&]*/g)}/embed`
const embed = document.querySelector("#game");
const aspect = Math.min(window.innerWidth, window.innerHeight);
const id = urlEmbed.match(/.{43}(?=\/embed)/g)[0];
let scale = 1;
fetch(`https://fetch-proxy.jacobbutler6.repl.co/json?url=https://studio.code.org/v3/channels/${id}`)
.then(response => {
  if (response.status < 206) {
    return response.json()
  }
})
.then(json => {
  document.title = json.name
})
.catch(err => {
  console.log(err)
})
embed.src = urlEmbed;
if (urlEmbed.includes("applab")) {
  embed.style["position"] = "fixed";
  embed.style["top"] = "0px"
  embed.style["left"] = "50%"
  embed.style["width"] = "356px"
  embed.style["height"] = "515px"
  embed.style["clip-path"] = "inset(68px 0px 0px 36px)"
  scale = aspect / (embed.style.height.match(/\d+/g)[0] - (embed.style.clipPath.match(/\d+/)[0] || 0)) - 0.05; // divide this by the height if you want the joypad
  embed.style["transform"] = `translate(-60%, -21%) scale(${scale})`;
} else {
  embed.style["height"] = "400px"
  scale = aspect / embed.style.height.match(/\d+/g)[0] - 0.05; // divide this by the height if you want the joypad
  embed.style["transform"] = `scale(${scale})`;
}
embed.style["transform-origin"] = `top center`;
// To main page
document.querySelector("#back").onclick = function() {
  location.href = "/CDOLFP"
}

// Show source code

// Show any assets used outside of animations
document.querySelector("#assets").onclick = function() {
  let host = `https://studio.code.org/v3/assets/${id}`
  fetch(`${sourceAPI}json?url=${host}`).then(response => {
    if(response.status < 206) {
      return response.json();
    }
  }).then(data => {
    let content = "";
    for(let media of data) {
      if(media.category === "image") {
        content += `<img src=${sourceAPI}media?url=${host}/${media.filename}></img>`
      } else {
        content += `<audio controls>
        <source src=${sourceAPI}media?url=${host}/${media.filename}></source>
        </audio>`
      }
    }
    document.querySelector("#content").innerHTML = content;
  })
}
// Show all animations in a project
document.querySelector("#animations").onclick = function() {
  let host = `https://studio.code.org/v3/animations/${id}`
  fetch(`${sourceAPI}json?url=${host}`).then(response => {
    if(response.status < 206) {
      return response.json();
    }
  }).then(data => {
    let content = "";
    for(let image of data) {
      if(image.filename !== undefined) {
        content += `<img src=${sourceAPI}/media?url=${host}/${image.filename}></image>`;
      }
    }
    document.querySelector("#content").innerHTML = content;
  })
}
// Show relevant info if it was published as a library
