/*
Scenario:You are creating a program that the user can use to update a chosen customer. 
The list of customers is displayed so the user can decide which to pick.
Note: We'll assume the user can only update the name field. Once the update is made, 
show the new current customer names that includes the update.

Requirements
Created a new form named customerUpdate. 
Used a Dropdown to display the customer names
Used dropdown choice to customer whose name user wants to change. 
Used and input control, have the user enter the new customer name.
When user clicks a button, the program processes the new customer name from the user.
The new name replaces the old name in the customer record.
The change is reflected in the display and the database.
Used a textArea to display the remaining customers. 
*/

req = ""
query = ""
results = ""
pw = "JeremyBIA123"  // put your database password here
userName = "jrp85607"
allCustomers = []

customerUpdate.onshow=function(){
    txtResponse.style.height = "140px"
    // get the data to populate the dropdown with names from database
    let query = "SELECT name FROM customer2;"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)

    if (req.status == 200) { //transit worked.
            allCustomers = JSON.parse(req.responseText)
            
            // names now in results array - load names into the dropdown
            drpUpdate.clear()
            for (i = 0; i <= allCustomers.length - 1; i++)
                drpUpdate.addItem(allCustomers[i])
    } else {
        // transit error
        NSB.MsgBox(`Error: ${req.status}`);
    }  
}

drpUpdate.onclick=function(s){
    if(typeof(s) == "object") {
      return
    } else {
      //begin the journey
    drpUpdate.value = s // show user selection in drpCustomers
    
    originalName = drpUpdate.value
  }
}

btnUpdate.onclick=function(){
  newName = inptUpdate.value
  //create query to check if name exists
  query = `UPDATE customer2 SET name = '${newName}' WHERE name = '${originalName}';`
  
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)
  
  if (req.status == 200) {
    customerName = JSON.parse(req.responseText)
  } else 
    console.log("error")
    
    
  //QUERY REMAINING CUSTOMERS
  query = `SELECT name FROM customer2;`
  // get the remaining customers
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)
  
  if (req.status == 200) { //transit worked.
    //save the sate of the customer 
    remainingCustomers3 = JSON.parse(req.responseText)
    console.log(remainingCustomers3)
  } else
    console.log("error")
  
  let customerList3 = ""
  for (i = 0; i <= remainingCustomers3.length - 1; i++)
    customerList3 = customerList3 + remainingCustomers3[i] + "\n"
  txtUpdate.value = customerList3 
}
