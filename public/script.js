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

    const blogModal = (info) => {
      const item = data.find((item) => item._id === info.id);
      console.log(item);

      const modal = document.getElementById("blogModal");
      modal.style.display = "block";
      const title = document.getElementById("blogTitle");
      const text = document.getElementById("blogText");
      title.textContent = item.title;
      text.textContent = item.blog;
      modal.append(title, text);
    };

    for (info of data) {
      const root = document.createElement("div");
      const title = document.createElement("h3");
      const snip = document.createElement("div");
      const hr = document.createElement("hr");
      root.className = "blog-item";
      title.className = "title m-3";
      snip.className = "snip";
      //   const blog = document.getElementById("blog-spot");
      title.textContent = info.title;
      snip.textContent = info.blog;
      const btn = document.createElement("a");
      btn.className = "btn btn-light m-3 read-more";

      btn.textContent = "Read More";
      btn.setAttribute("id", info._id);
      btn.addEventListener("click", (e) => blogModal(e.target));

      document.getElementById("blogs").append(root);
      root.append(title, hr, snip, btn);
    }
  } catch (err) {
    console.log(err);
  }
}

const close = document.getElementById("closeModal");
close.addEventListener("click", () => closeModal());

const closeModal = () => {
  const modal = document.getElementById("blogModal");
  modal.style.display = "none";
};
