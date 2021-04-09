let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let makeAJAXCall = (methodType, url, callback, async = true, data) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    console.log(
      methodType +
        " State changed Called at ready state :" +
        xhr.readyState +
        " Status: " +
        xhr.status
    );
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 201) {
        callback(xhr.responseText);
      } else if (xhr.status >= 400) {
        console.log("handle 400 client error 500 server error");
      }
    }
  };
  xhr.open(methodType, url, async);
  if (data) {
    console.log(JSON.stringify(data));
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
  } else xhr.send();
  console.log(methodType + "Request sent to the server at:");
}

const getURL = " http://localhost:3000/employee";
let getUserDetails = (data) => {
  console.log("Get User Data:" + data);
}
makeAJAXCall("GET", getURL, getUserDetails, true);

const deleteURL = "http://localhost:3000/employee/4";
function userDeleted(data) {
  console.log("USer deleted" + data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://localhost:3000/employee";
const emplData = { name: "Anju", department: "Sales" };
function userAdded(data) {
  console.log("User Added" + data);
}
makeAJAXCall("POST", postURL, userAdded, false, emplData);