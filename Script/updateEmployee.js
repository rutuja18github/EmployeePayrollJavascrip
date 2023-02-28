editEmployee = (id) => {
    console.log(id);
   localStorage.setItem('empID',id);
 }

 $(document).ready(function(){
    console.log("get called"+localStorage.getItem('empID'));
    $.ajax({
        url: "http://localhost:3000/employee/" + localStorage.getItem('empID'),
        type: "GET",
        dataType: "json",
        
        success: function(data){
            document.getElementById('name').value = data.name;   
            
            if(document.getElementById('profile1').value == data.profile){
                document.getElementById('profile1').checked = true;
            }else if(document.getElementById('profile2').value == data.profile){
                document.getElementById('profile2').checked = true;
            }else if(document.getElementById('profile3').value == data.profile){
                document.getElementById('profile3').checked = true;
            }else if(document.getElementById('profile4').value == data.profile){
                document.getElementById('profile4').checked = true;
            }

            if(document.getElementById('Male').value == data.gender){
                document.getElementById('Male').checked = true;
            }else if(document.getElementById('Female').value == data.gender){
                document.getElementById('Female').checked = true;
            }
            
            console.log(data.department);
            var dept = data.department.split(",");
            console.log(dept[0]);
            var empdpt = dept[0];
            
            if(document.getElementById('hr').value == empdpt){
                document.getElementById('hr').checked = true;
                empdpt = dept[1];
            }
            if(document.getElementById('sales').value == empdpt){
                document.getElementById('sales').checked = true;
                empdpt = dept[1];
            }
            if(document.getElementById('finance').value == empdpt){
                document.getElementById('finance').checked = true;
                empdpt = dept[1];
            }
            if(document.getElementById('engineering').value == empdpt){
                document.getElementById('eningeering').checked = true;
                empdpt = dept[1];
            }
            if(document.getElementById('others').value == empdpt){
                document.getElementById('others').checked = true;
                empdpt = dept[1];
            }

            document.getElementById('salary').value = data.salary;      
            
            var datearray = data.startdate.split(" ");
            console.log(datearray)
            document.getElementById('day').value =  datearray[0]; 
            document.getElementById('month').value = datearray[1];
            document.getElementById('year').value = datearray[2];  

            document.getElementById('notes').value = data.note;  
        } 
    });
});


function imageselect() {
    var image1 = document.getElementById('profile1').checked;
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

const empdepartment = () => {
    let departmentArr = new Array();

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

function updateEmp() {
    console.log("Method Called");
    var genderVal = document.getElementsByName("gender")[0].checked ? 'Male' : 'Female';
    console.log(genderVal);

    let callObject = {
        "name": document.getElementById('name').value,
        "profile": imageselect(),
        "gender": genderVal,
        "department": empdepartment,
        "salary": document.getElementById('salary').selectedOptions[0].text,
        "startdate": document.getElementById('day').value + " " + document.getElementById('month').value + " " + document.getElementById('year').value,
        "note": document.getElementById('notes').value
    }
    console.log("reqOject", callObject);

      $(document).ready(function(){
          $.ajax({
          url: "http://localhost:3000/employee/"+ localStorage.getItem('empID'),
          type: "PUT",
          data: callObject,
          dataType: "json",
          success: function (data) {
              console.log(data);
          },
          error: function (error) {
              console.log(`Error ${error}`);
          }
      });
    })
}
