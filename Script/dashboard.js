$(document).ready(function(){
    var innerHtml = " ";
    $.ajax({
        url: "http://localhost:3000/employee",
        type: "GET",
        dataType: "json",
        
        success: function(data){
            console.log(data[0]);
            
            let empArray = data;
            console.log(empArray);
            console.log(empArray[0].name);
            $.each(empArray , function(index,value){
                console.log(`${value.department}`);
                innerHtml += 
                `<tr>
                    <td><img class="profile" src="${value.profile}"></td>
                    <td>${value.name}</td>
                    <td>${value.gender}</td>
                    <td>${value.department}</td>
                    <td>${value.salary}</td>
                    <td>${value.startdate}</td>
                    <td>
                    <a class="add-buttom edit"  > 
                        <img src="../assets/edit.svg" alt="Edit"></a>
                    <buttom class="add-buttom delete" onclick = "deleteEmployee(${value.id})">
                    <img style="height: 20px;width: 20px;" src="../assets/delete.png" alt="Delete"></buttom>
                    </td>
                </tr>`
            });
            $('#table-display').append(innerHtml)
        } 
    })
})


deleteEmployee = (id)=> {
    console.log(" employee information",id);
    $.ajax({
        type: 'delete',
        url: "http://localhost:3000/employee/"+id,
        //data: JSON.stringify(obj),
        contentType: "application/json",

        success: function (data){
            console.log(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
};



