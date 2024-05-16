"use strict"

window.onload=init;

function init()
{
    const userlist = document.getElementById("userlList");
    userlist.onchange = onUsersSelectionChanged;
   
    getusers();

}

function getusers()
{
    // Specify the API endpoint for user data
    const apiUrl = 'http://localhost:8083/api/users';
    let li="";
    const userlist = document.getElementById("userlList");
    let theOption1 = new Option("Select a User", ""); 
    userlist.appendChild(theOption1);
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        for(let i=0; i<data.length; i++) {
            let theOption = new Option(data[i].name, data[i].id); 
  
            // append the option as a child of (inside) the 
            // select element
            userlist.appendChild(theOption);
           
        }
    
        
        })
    
      .catch(error => {
        console.error('Error:', error);
      });
}


function onUsersSelectionChanged() 
 {
    // find the value of the option selected
    const userlist = document.getElementById("userlList");
    let li="";
    let selectedValue = userlist.value;
    if(selectedValue !="")
    {
        document.getElementById("tasktable").style.display = "table";
    const apiUrl = 'http://localhost:8083/api/todos/byuser/'+selectedValue;
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      for(let i=0; i<data.length; i++) {
        li += `<tr>
        <td>${data[i].category}</td>
        <td>${data[i].description} </td>`
      //  <td>${data[i].priority}</td>`

        if(data[i].priority=="Low")
     {
        li+=`<td><span class="low">${data[i].priority}</span></td>`;
     }
     else if(data[i].priority=="Medium")
     {
        li+=`<td><span class="medium">${data[i].priority}</span></td>`;
     }
       else if(data[i].priority=="High")  
       {
        li+=`<td><span class="high">${data[i].priority}</span></td>`;
       }
      
      

     if(data.completed==true)
     {
        li+=`<td><i class="bi bi-check-lg bi-green"></i></td></tr>`;
     }
     else
     {
        li+=`<td><i class="bi bi-x-lg bi-red"></i></td></tr>`
     }
         
      }
      document.getElementById("displaytask").innerHTML = li;
      
      })
  
    .catch(error => {
      console.error('Error:', error);
    });
}
else{
    alert("please select the user");
}
 }