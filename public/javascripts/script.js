const handleActionEdit = (elementId) => {
  const el = document.getElementById(elementId);
  const inputDesc = document.getElementById("inputDesc");
  const inputComp = document.getElementById("inputComp");
  const backDrop = document.querySelector(".modal-backdrop");

  inputDesc.value = el.children[0].innerText;
  inputComp.value = el.children[1].innerText;
  backDrop.style.display = "none";
  localStorage.setItem("modalId", elementId);
};

const handleSubmitAction = () => {
  const elementId = localStorage.getItem("modalId");
  const el = document.getElementById(elementId);
  const inputDesc = document.getElementById("inputDesc");
  const inputComp = document.getElementById("inputComp");

  // inputDesc.value = el.children[0].innerText;
  // inputComp.value = el.children[1].innerText;

  fetch(`https://note-app-qde3.onrender.com/update/${elementId}`, {
    method: "POST",
    
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      completed: inputComp.value.toLowerCase(),
    }),
  })
    .then((r) => r.json())
    .then((r) => {
      localStorage.removeItem("modalId");
      window.location = "/notes";
    })

    .catch((error) => console.log(error));
};
