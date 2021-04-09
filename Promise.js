let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType, url, async = true, data = null) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      console.log(
        "State changed Called at ready state :" +
          xhr.readyState +
          "Status: " +
          xhr.status
      );
      if (xhr.status.toString().match("^[2][0-9]{2}$")) {
        resolve(xhr.responseText);
      } else if (xhr.status.toString().match("^[4,5][0-9]{2}$")) {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
        console.log("xhr failed");
      }
    };
    xhr.open(methodType, url, async);
    if (data) {
      xhr.setRequestHeader("content-type", "applicaton/json");
      xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + "request sent to the server at:");
  });
}

const getURL = " http://localhost:3000/employee/1";
makePromiseCall("GET", getURL, true)
  .then((responseText) => {
    console.log("Get USer Data:" + responseText);
  })
  .catch((error) => console.log("GET error status:" + JSON.stringify(error)));

const deleteURL = " http://localhost:3000/employee/4";
makePromiseCall("DELETE", deleteURL, false)
  .then((responseText) => {
    console.log("User Deleted:" + responseText);
  })
  .catch((error) =>
    console.log("DELETE error status:" + JSON.stringify(error))
  );

const postURL = "http://localhost:3000/employee";
const emplData = { name: "Anju", department: "Sales" };
makePromiseCall("POST", postURL, true, emplData)
  .then((responseText) => {
    console.log("User ADDED:" + responseText);
  })
  .catch((error) => console.log("POST error status:" + JSON.stringify(error)));