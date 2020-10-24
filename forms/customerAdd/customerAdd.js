/*
Scenario: You will create a program that adds a customer to the display control and the 
database. Then the revised list of customer names are displayed. 

Requirements
Created a new form named customerAdd. 
Used a textArea or Dropdown to display the customer names
Hard-coded the customer to add (just to save time). The name is :
Jesse Antiques, 1113 F St, Omaha, NE, 68178
When user clicks a button, the new customer is added to the control and the database.
Tell the user their new customer was added to the database. 
Used a textArea to display the remaining customers. 

Note: make sure you don't add the employee ID since this is an auto-increment field 
(so the DB creates the number for you automatically).
*/

req = ""
query = ""
results = ""
pw = "JeremyBIA123"  // put your database password here
userName = "jrp85607"
allCustomers = []

customerAdd.onshow=function(){
    txtAddFinal.style.height = "140px"
    // get the data to populate the dropdown with names from database
    let query = "SELECT name FROM customer2;"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)

    if (req.status == 200) { //transit worked.
            allCustomers = JSON.parse(req.responseText)
            
            // names now in results array - load names into the dropdown
            drpAdd.clear()
            for (i = 0; i <= allCustomers.length - 1; i++)
                drpAdd.addItem(allCustomers[i])
    } else {
        // transit error
        NSB.MsgBox(`Error: ${req.status}`);
    }  
}



btnAddCustomer.onclick=function(){
  if(typeof(s) == "object") {
  return
  } else {
    //Create query to add customer to database
     query = `INSERT INTO customer2 (name, street, city, state, zipcode) VALUES ('Jesse Antiques', '1113 F St', 'Omaha', 'NE', '68178');`
    // insert new customer
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)
    
    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      addedCustomers = JSON.parse(req.responseText)
      console.log(addedCustomers)
    } else
      console.log("error")
    
    //Assign result of added customer
    lblAdded.text = `The new customer, Jesse Antiques, was added to the database!`
    
    
    //QUERY REMAINING CUSTOMERS
    query = `SELECT name FROM customer2;`
    // get the remaining customers
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)
    
    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      remainingCustomers2 = JSON.parse(req.responseText)
      console.log(remainingCustomers2)
    } else
      console.log("error")
    
    let customerList2 = ""
    for (i = 0; i <= remainingCustomers2.length - 1; i++)
      customerList2 = customerList2 + remainingCustomers2[i] + "\n"
    txtAddFinal.value = customerList2
  }
}


