// const axios = require("axios");

// async function dataCall() {
//   await axios
//     .get("/api/blog")
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

dataCall();

async function dataCall() {
  try {
    const res = await fetch("/api/blog");
    const data = await res.json();
    console.log(data);

    for (info of data) {
      const root = document.createElement("div");
      //   const blog = document.getElementById("blog-spot");
      root.textContent = info.author + info.title + info.blog;

      document.body.append(root);
    }
  } catch (err) {
    console.log(err);
  }
}
