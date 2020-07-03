const textarea = document.getElementById("message");
// textarea.style.height = "300px";
textarea.addEventListener("input", autoResize, false);

function autoResize() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

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
      snip.className = "snip textarea";
      //   const blog = document.getElementById("blog-spot");
      title.textContent = info.title;
      snip.textContent = info.desc;
      const btn = document.createElement("a");
      btn.className = "btn btn-light m-1 read-more";

      btn.textContent = "Read More";
      btn.setAttribute("id", info._id);
      btn.addEventListener("click", (e) => blogModal(e.target));

      document.getElementById("blogs").append(root);
      root.append(title, hr, snip, btn);

      if (window.location.href.indexOf("blogpage") !== -1) {
        // const edit = document.createElement("a");
        // edit.className = "btn btn-light m-1 edit-btn";
        // edit.textContent = "Edit";
        // edit.href = `api/blog/edit/${info._id}`;

        const deleteForm = document.createElement("form");
        const deleteBtn = document.createElement("button");
        deleteForm.action = `api/${info._id}?_method=DELETE`;
        deleteForm.method = "POST";
        deleteForm.className = "d-inline";
        deleteBtn.className = "btn btn-danger m-1 delete-btn d-inline";
        deleteBtn.textContent = "Delete";
        deleteBtn.type = "submit";
        deleteForm.append(deleteBtn);
        root.append(deleteForm);
      }
    }
  } catch (err) {
    console.log("datacall err", err);
  }
}

const close = document.getElementById("closeModal");
close.addEventListener("click", () => closeModal());

const closeModal = () => {
  const modal = document.getElementById("blogModal");
  modal.style.display = "none";
};
