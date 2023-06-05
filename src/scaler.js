// Upscales CDO project, this will have to be dynamic depending on the projects aspect ratio
const urlEmbed = `${location.search.match(/(?<=url=)[^&]*/g)}/embed`
const embed = document.querySelector("#game");
embed.src = urlEmbed;
embed.style.height = urlEmbed.includes("gamelab") ? "400px": "450px";
const aspect = Math.min(window.innerWidth, window.innerHeight);
const scale = aspect / embed.style.height.match(/\d+/g)[0] - 0.05; // divide this by the height if you want the joypad
embed.style["transform"] = `scale(${scale})`;
embed.style["transform-origin"] = `top center`;
