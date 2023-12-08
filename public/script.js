document.addEventListener("DOMContentLoaded", () => {
  alert("hi");
  const button = document.getElementById("runCommandBtn");
  const outputContainer = document.getElementById("outputContainer");

  document
    .getElementById("executeButton")
    .addEventListener("click", function () {
      // Make an AJAX request to trigger the Python script execution
      alert("python");
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/run_script", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send();

      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          console.error("Error:", xhr.statusText);
        }
      };
    });

  button.addEventListener("click", () => {
    alert("hi");
    const command = prompt("Enter command:", "ls");
    if (command !== null) {
      runCommand(command);
    }
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
