const jokeElement = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

jokeBtn.addEventListener("click", generateJoke);

// function generateJoke() {
//   //fetch joke
//   const configs = {
//     headers: {
//       Accept: "application/json",
//     },
//   };
//   fetch("https://icanhazdadjoke.com", configs)
//     .then((response) => response.json())
//     .then((data) => {
//       jokeElement.innerHTML = data.joke;
//     });
// }
// async way to do it
async function generateJoke() {
  //fetch joke
  const configs = {
    headers: {
      Accept: "application/json",
    },
  };
  const response = await fetch("https://icanhazdadjoke.com", configs);

  const data = await response.json();

  jokeElement.innerHTML = data.joke;
}
