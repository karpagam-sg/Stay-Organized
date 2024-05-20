"use strict"

function validateFrom(event) {
    var form = document.querySelectorAll('.needs-validation')[0]
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    form.classList.add('was-validated')
  }

function LoginUser(e)
{   
    validateFrom(e);
    e.preventDefault();
    
    const username=document.getElementById("username").value;
    //const password=document.getElementById("password").value;
    if(username !="")
{
    const apiUrl = 'http://localhost:8083/api/users/'+username;
    fetch(apiUrl)
    .then(response => {
      if(response.status==200)
      {
     const myPromise=response.json().then(data=> data.id);

     myPromise.then(
      // Success callback function
      (result) => {
        const id=result;
        console.log("id",id);
        alert("user login successfully done");
        window.location.href="index.html?name="+username+"&id="+id;
      
      })

    //   (error) => {
    //     document.getElementById("username").setCustomValidity("Please enter a valid UserName");
    //     return false;
    //   }
    // );
      }
      else
      {
        console.log("hi",response.status);
        document.getElementById("username").setCustomValidity("Please enter a valid UserName");
        return false;
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
else
{
  document.getElementById("username").setCustomValidity("Please enter a valid UserName");
  return false;
}
}