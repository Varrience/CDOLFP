// Upscales CDO project, this will have to be dynamic depending on the projects aspect ratio
const urlEmbed = `${location.search.match(/(?<=url=)[^&]*/g)}/embed`
const embed = document.querySelector("#game");
embed.src = urlEmbed;
if(urlEmbed.includes("applab")) {
  embed.style["position"] = "fixed";
  embed.style["left"] = "50%"
  embed.style["width"] = "356px"
  embed.style["height"] = "515px"
  embed.style["transform"] += "translate(-50%, -25%);"
  embed.style["clip-path"] = "inset(68px 0px 0px 36px)"
} else {
  embed.style["height"] = "400px"
}
const aspect = Math.min(window.innerWidth, window.innerHeight);
const scale = aspect / embed.style.height.match(/\d+/g)[0] - 0.05; // divide this by the height if you want the joypad
embed.style["transform"] += `scale(${scale})`;
embed.style["transform-origin"] = `top center`;
