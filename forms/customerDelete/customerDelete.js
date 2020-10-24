/*
Scenario: You are creating a program that shows the user all the customers in the database. 
Then the user can select one and the program will delete it in the display as well as in 
the database.  The the remaining customers will be re-displayed. 

Note: Check to make sure the customer being deleted is actually in the database before 
you try to delete it. 

Requirements
Used a modified copy of the Select form from above. How to do this: 
> Export the customerSelect form (under File > Export Form), and import it back into the same 
project (under Project > Import Existing Form). The form will have a .frm file extension. 
> Rename the new form customerDelete
> Rename any controls to be what you want. 
> Remember, you cannot use the first line of event listeners that were on an imported form 
because appStudio only registers a new event handler when it is initially created by 
right-clicking on the control. So the imported one, having been already created, is not registered with the new form and has to be re-created so it will be registered.
    - copy the code in the event  handler you want to redo
     - delete the entire event handler code.  
     - create a new event listener by right-clicking on the control and picking an event. 
     - paste the code you copied into the new event handler
     - change the names of local variables and controls inside the event handler to match any names that you changed. 
Used a textArea  or Dropdown that shows all the customer names, one per line.
User can pick a customer from the list.  
Used a sql Delete  query to delete the customer chosen by the user from the display control. 
Used an AJAX call to the database to delete the matching customer. 
Checked if customer name exists in database before deleting it.
Used a textArea to show the user the remaining customer names, using a template literal. 
*/

req = ""
query = ""
results = ""
pw = "JeremyBIA123"  // put your database password here
userName = "jrp85607"
allCustomers = []

customerDelete.onshow=function(){
    txtResponse.style.height = "140px"
    // get the data to populate the dropdown with names from database
    let query = "SELECT DISTINCT name FROM customer2;"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)

    if (req.status == 200) { //transit worked.
            allCustomers = JSON.parse(req.responseText)
            
            // names now in results array - load names into the dropdown
            drpNames.clear()
            for (i = 0; i <= allCustomers.length - 1; i++)
                drpNames.addItem(allCustomers[i])
    } else {
        // transit error
        NSB.MsgBox(`Error: ${req.status}`);
    }  
}


drpNames.onclick=function(s){
    if(typeof(s) == "object") {
      return
    } else {
      //begin the journey
    drpNames.value = s // show user selection in drpCustomers
    
    //create query to check if name exists
    query = `SELECT name FROM customer2 WHERE name = '${s}';`
    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)
    
    if (req.status == 200) {
      customerName = JSON.parse(req.responseText)
    /*  if () {
        console.log(`The customer called ${customerName}`)
      else {
       
       }*/
    } else 
      console.log("error")
    
    //DELETE CUSTOMER
    query = `DELETE FROM customer2 WHERE name = '${customerName[0]}';`
    // get the other customers who have the same state
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)
    
    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      deletedCustomer = JSON.parse(req.responseText)
      console.log(deletedCustomer)
    } else
      console.log("error")
    
    
    //QUERY REMAINING CUSTOMERS
    query = `SELECT name FROM customer2;`
    // get the remaining customers
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)
    
    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      remainingCustomers = JSON.parse(req.responseText)
      console.log(remainingCustomers)
    } else
      console.log("error")
    
    let customerList = ""
    for (i = 0; i <= remainingCustomers.length - 1; i++)
      customerList = customerList + remainingCustomers[i] + "\n"
    txtResults.value = customerList
  }
}

