// Upscales CDO project, this will have to be dynamic depending on the projects aspect ratio
const urlEmbed = `${location.search.match(/(?<=url=)[^&]*/g)}/embed`
const embed = document.querySelector("#game");
embed.src = urlEmbed;
embed.height = urlEmbed.includes("gamelab") ? "400px": "450px";
const aspect = Math.min(window.innerWidth, window.innerHeight);
const scale = aspect / embed.height.match(/\d+/g)[0]; // divide this by the height if you want the joypad
embed.style["-webkit-transform"] = `scale(${scale})`;
embed.style["-webkit-transform-origin"] = `top center`;
