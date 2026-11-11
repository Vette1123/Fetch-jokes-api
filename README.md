# Joke Generator

One button, one joke. Press it and it fetches a dad joke from
[icanhazdadjoke](https://icanhazdadjoke.com) and swaps the text in place.

**[Live demo →](https://vette1123.github.io/Fetch-jokes-api/)**

## Stack

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies.
It is an `index.html`, a `main.css` and about thirty lines in `main.js`, deployed
to GitHub Pages.

## The point of it

The interesting part is the request.

`icanhazdadjoke` returns **HTML by default** and only returns JSON if you ask
for it:

```js
async function generateJoke() {
  const configs = {
    headers: {
      Accept: 'application/json',
    },
  }

  const response = await fetch('https://icanhazdadjoke.com', configs)
  const data = await response.json()

  jokeElement.innerHTML = data.joke
}
```

Drop that `Accept` header and you get a page of markup where you expected an
object. The status is `200 OK` and nothing in the response explains why
`response.json()` threw. A URL is not an API: the headers are part of the
contract.

## Both versions are kept

`main.js` still carries the original `.then` chain, commented out, directly
above the `async/await` rewrite that replaced it. Reading them next to each
other shows what `await` removes, so I left it in.

## Known limitations

- **No error handling.** There is no `try/catch` and no `response.ok` check. If
  the request fails, the promise rejects into nothing and the button silently
  does nothing, which looks the same as a broken page to the user.
  Wrapping the call and writing the failure into the same element the joke
  would have filled takes two lines.
- **No loading state.** A slow response leaves the previous joke on screen with
  no indication that a new one is coming.
- **`innerHTML` for a string that could contain markup.** `textContent` is the
  better choice here. The API is trusted, but the habit is not.

## Running locally

```bash
git clone https://github.com/Vette1123/Fetch-jokes-api.git
cd Fetch-jokes-api
# open index.html in a browser — no build, no server needed
```

The API needs no key and allows cross-origin requests.

---

Built by [Mohamed Gado](https://mohamedgado.com)
