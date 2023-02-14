function imageselect() {
    console.log("image")
    var image1 = document.getElementById('profile1').checked;
    console.log(image1)
    var image2 = document.getElementById('profile2').checked;
    var image3 = document.getElementById('profile3').checked;
    var image4 = document.getElementById('profile4').checked;

    if (image1 == true) {
        var pic1 = document.getElementById('profile1').value;
        return pic1;
    }
    else if (image2 == true) {
        var pic2 = document.getElementById('profile2').value;
        return pic2;
    }
    else if (image3 == true) {
        var pic3 = document.getElementById('profile3').value;
        return pic3;
    }
    else if (image4 == true) {
        var pic4 = document.getElementById('profile4').value;
        return pic4;
    }
}

function empdepartment() {
    let departmentArr = [];

    var hrchecked = document.getElementById('hr').checked;
    var saleschecked = document.getElementById('sales').checked;
    var financechecked = document.getElementById('finance').checked;
    var engineerchecked = document.getElementById('engineering').checked;
    var otherschecked = document.getElementById('others').checked;

    if (hrchecked == true) {
        var hrcheck = document.getElementById('hr').value;
        departmentArr.push(hrcheck);
    }
    if (saleschecked == true) {
        var salescheck = document.getElementById('sales').value;
        departmentArr.push(salescheck);
    }
    if (financechecked == true) {
        var financecheck = document.getElementById('finance').value;
        departmentArr.push(financecheck);
    }
    if (engineerchecked == true) {
        var engineercheck = document.getElementById('engineering').value;
        departmentArr.push(engineercheck);
    }
    if (otherschecked == true) {
        var othercheck = document.getElementById('others').value;
        departmentArr.push(othercheck);
    }

    console.log(departmentArr);
    return departmentArr;
}

function save() {
    console.log("Method Called");
    var genderVal = document.getElementsByName("gender")[0].checked ? 'Male' : 'Female';
    console.log(genderVal);

    let callObject = {
        "name": document.getElementById('name').value,
        "profile": imageselect(),
        "gender": genderVal,
        "department": empdepartment(),
        "salary": document.getElementById('salary').selectedOptions[0].text,
        "startdate": document.getElementById('day').value + "/" + document.getElementById('month').value + "/" + document.getElementById('year').value,
        "note": document.getElementById('notes').value
    }
    console.log("reqOject", callObject);

    //   $(document).ready(function(){
    //       $.ajax({
    //       url: "http://localhost:3000/employee",
    //       type: "POST",
    //       data: callObject,
    //       success: function (data) {
    //           console.log(data);
    //       },
    //       error: function (error) {
    //           console.log(`Error ${error}`);
    //       }
    //   });
    // })

    /* POST request using fetch()*/
    fetch("http://localhost:3000/employee", {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify(callObject),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        // Converting to JSON
        .then(response => response.json())
        // Displaying results to console
        .then(json => console.log(json));
}
