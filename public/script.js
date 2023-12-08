document.addEventListener("DOMContentLoaded", () => {
  alert("hi");
  const button = document.getElementById("executeButton");
  const uploadBtn = document.getElementById("uploadbtn");
  const outputContainer = document.getElementById("outputContainer");

  // button.addEventListener("click", () => {
  //   alert("hi");
  //   const command = prompt("Enter command:", "ls");
  //   if (command !== null) {
  //     runCommand(command);
  //   }
  // });
  // custom command run

  button.addEventListener("click", () => {
    alert("hi");
    const command = "python helloworld.py";
    if (command !== null) {
      runCommand(command);
    }
  });

  uploadBtn.addEventListener("click", () => {
    alert("Upload Image");
  });

  function runCommand(command) {
    fetch(`/runcmd?command=${encodeURIComponent(command)}`)
      .then((response) => response.text())
      .then((data) => {
        outputContainer.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error:", error);
        outputContainer.innerHTML = `<pre>Error: ${error.message}</pre>`;
      });
  }
});

// document
// .getElementById("executeButton")
// .addEventListener("click", function () {
//   // Make an AJAX request to trigger the Python script execution
//   alert("python");
//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", "/run_script", true);
//   xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//   xhr.send();

//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       console.log(xhr.responseText);
//     } else {
//       console.error("Error:", xhr.statusText);
//     }
//   };
// });
