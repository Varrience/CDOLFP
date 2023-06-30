// Upscales CDO project, this will have to be dynamic depending on the projects aspect ratio
const urlEmbed = `${location.search.match(/(?<=url=)[^&]*/g)}/embed`
const embed = document.querySelector("#game");
const aspect = Math.min(window.innerWidth, window.innerHeight);
const id = urlEmbed.match(/.{43}(?=\/embed)/g)[0];
let channel = null;
fetch(`https://fetch-proxy.jacobbutler6.repl.co/json?url=https://studio.code.org/v3/channels/${id}`)
.then(response => {
  if (response.status < 206) {
    return response.json()
  }
})
.then(json => {
  channel = json;
  document.title = channel.name
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
  const scale = aspect / (embed.style.height.match(/\d+/g)[0] - (embed.style.clipPath.match(/\d+/)[0] || 0)) - 0.05; // divide this by the height if you want the joypad
  embed.style["transform"] = `translate(-60%, -21%) scale(${scale})`;
} else {
  embed.style["height"] = "400px"
  const scale = aspect / embed.style.height.match(/\d+/g)[0] - 0.05; // divide this by the height if you want the joypad
  embed.style["transform"] = `scale(${scale})`;
}
embed.style["transform-origin"] = `top center`;
