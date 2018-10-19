
function inputParsing() {
    input = document.getElementById("keywords").value;
    localStorage.setItem("array", input);
}


function outputParsing() {
    document.write(
        "<h2>Query Results</h2><table id='results' style='width:100%' align='right'><tr><th>Word</th><th>Count</th> </tr>");
    var string = localStorage.getItem("array");
    arr = string.match(/\S+/g)

    var OutputList = {};

    for (var i = 0, j = arr.length; i < j; i++){
       arr[i] = arr[i].toLowerCase();
       OutputList[arr[i]] = (OutputList[arr[i]] || 0) + 1;
    }

    for (var obj in OutputList) {
        document.write("<tr><td>" + obj + "</td> <td>" + OutputList[obj] + "</td></tr><tr>");
    }
	document.write("</table>");

	xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://0.0.0.0:80/submit", false);
	xhttp.onreadystatechange = function () {
    	if(xhttp.readyState === 4 && xhttp.status === 200) {
    		response = JSON.parse(xhttp.response);
        document.write(
            "<br><br><h2>Popular Keywords</h2><table id='history' style='width:100%' align='right'><tr><th>Word</th><th>Count</th> </tr>");
        for (var obj in response) {
            document.write("<tr><td>" + response[obj][0] + "</td> <td>" + response[obj][1] + "</td></tr><tr>");
        }
        document.write("</table>");

        localStorage.clear();
  		}
	};
    xhttp.send(JSON.stringify(OutputList));

}

function outputServer() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://0.0.0.0:80/history", false);
	xhttp.onreadystatechange = function () {
    	if(xhttp.readyState === 4 && xhttp.status === 200) {
    		response = JSON.parse(xhttp.response);
            document.write(
                "<br><br><h2>Popular Keywords</h2><table id='history' style='width:100%' align='right'><tr><th>Word</th><th>Count</th> </tr>");
            for (var obj in response) {
                document.write("<tr><td>" + response[obj][0] + "</td> <td>" + response[obj][1] + "</td></tr><tr>");
            }
            document.write("</table>");
  		}
	};
    xhttp.send(null);

}

function login() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://0.0.0.0:80/login");
	xhttp.onreadystatechange = function () {
		window.location = xhttp.response;
	}
    xhttp.send(null);
}

function logout() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://0.0.0.0:80/logout");
	xhttp.onreadystatechange = function () {
        userInfo = (xhttp.response);
        window.location.replace("http://localhost:8080/");
        document.getElementById("ID").textContent=userInfo;
	}
    xhttp.send(null);
}

function currentUser() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://0.0.0.0:80/CurrentUser");
	xhttp.onreadystatechange = function () {
        userInfo = (xhttp.response);
        document.getElementById("ID").textContent=userInfo;
	}
    xhttp.send(null);
    
}

