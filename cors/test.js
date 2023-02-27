function test() {
  fetch("http://localhost:7000/tests")
    .then((res) => res.json)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

let btn = document.querySelector("button");
btn.addEventListener("click", test);
