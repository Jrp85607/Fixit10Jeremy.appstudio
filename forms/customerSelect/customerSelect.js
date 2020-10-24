/*
Requirements
Used a new form named customerSelect.
Used a Select query and AJAX call to get all the customers from the database. 
Displayed all the customers in a textArea or Dropdown so user can pick one. 
Used a sql Select  query to get all of the customers whose state matches the 
  state of the customer chosen by the user. 
Used a textArea to show the user the matching customers, one per line, using a 
  template literals
*/
let req = ""
let query = ""
let results = ""
let pw = "JeremyBIA123"  // put your database password here
let userName = "jrp85607"
let allCustomers = []

customerSelect.onshow=function(){
    txtResponse.style.height = "140px"
    // get the data to populate the dropdown with names from database
    let query = "SELECT DISTINCT name FROM customer2;"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)

    if (req.status == 200) { //transit worked.
            allCustomers = JSON.parse(req.responseText)
            
            // names now in results array - load names into the dropdown
            drpCustomers.clear()
            for (i = 0; i <= allCustomers.length - 1; i++)
                drpCustomers.addItem(allCustomers[i])
    } else {
        // transit error
        NSB.MsgBox(`Error: ${req.status}`);
    }  
}


drpCustomers.onclick=function(s){
   if(typeof(s) == "object") {
      return
    } else {
    drpCustomers.value = s // show user selection in drpCustomers
    
    query = `SELECT state FROM customer2 WHERE name = '${s}';`
    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)
    
    if (req.status == 200) {
      customerState = JSON.parse(req.responseText)
      console.log(customerState)
    } else 
      console.log("error")
    
    query = `SELECT name FROM customer2 WHERE state = '${customerState[0]}'`
    // get the other customers who have the same state
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)
    
    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      customerWithTheSameState = JSON.parse(req.responseText)
      console.log(customerWithTheSameState)
    } else
      console.log("error")
    
    let customerMessage = ""
    for (i = 0; i <= customerWithTheSameState.length - 1; i++)
      customerMessage = customerMessage + customerWithTheSameState[i] + "\n"
    txtResponse.value = customerMessage
  }
}




 /*   
    let state = drpState.value
    console.log(state)
    query = 'SELECT name FROM customer2 WHERE state = "' + "FL" + '";'
        //alert(query)
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)
    
     if (req.status == 200) { //transit worked.
            if (req.responseText == 500) {   // means the update succeeded
                txtResponse.textContent = `Success`
                NSB.MsgBox(`You have successfully changed the pet name!`)
                // reset controls to original state
                inptUpdate.value = ""
                selToChange.value = ""
            } else
                NSB.MsgBox(`There was a problem changing the pet name.`)
        } else 
            // transit error
            NSB.MsgBox(`Error: ${req.status}`);
}

*/

/*
    let newName = inptUpdate.value
    let oldName = selToChange.value
    
    let found = false
    for (i = 0; i <= allStates.length - 1; i++) {
        // console.log(`FOUND IS false and name is ${allPetNames[i]}`)
        if (oldName == allStates[i]) {
            found = true
            break
        }
     }   
    if (found == false) 
       NSB.MsgBox("That pet name is not in the database.")
    else if (found == true) {
        query = 'SELECT name FROM customer2 WHERE state = "' + s + '";'
        //alert(query)
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)

        if (req.status == 200) { //transit worked.
            if (req.responseText == 500) {   // means the update succeeded
                NSB.MsgBox(`You have successfully changed the pet name!`)
                // reset controls to original state
                inptUpdate.value = ""
                selToChange.value = ""
            } else
                NSB.MsgBox(`There was a problem changing the pet name.`)
        } else 
            // transit error
            NSB.MsgBox(`Error: ${req.status}`);
    } // found is true 
*/





/*
activitySelectTypePets.onshow=function(){
      // set height property of textarea control 
    // - special code
    txtTypeNames_contents.style.height = "100px"
}


btnSubmitType.onclick=function(){
  let check = inptPetType.value
  
  query = "SELECT * FROM pets WHERE petType LIKE " + '"%' + check + '%"'
    // Below change from my netID to yours (twice: user and database)    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jrp85607&pass=" + pw + "&database=jrp85607&query=" + query)

    if (req.status == 200) { //transit trip worked.
        // Reminder
        // > req1.responseText is a JSON object with the results of the query in it.
        // > convert it to a format that you can work with
        // > parse it from a JSON object (JS Object Notaton) into an array that holds
        //   each row as an array in it. So a big array that holds small arrays, each 
        //   of which is a row from the query results returned. 
        
        results = JSON.parse(req.responseText)
        // see if results are correct
        console.log(results)
        
    if (results.length == 0)    // no results were returned by the query
        lblMessage2.textContent = "There are no pets in the database."
    else {        // query results were returned
        // this is what the results look like: 
        // [[47,"Paul","dog"],[23,"Marty","dog"],[34,"Jack","horse"]]  
        //    0                 1                    2
        // The first row,index 0 in the big array is an array: 
        //     [47,"Paul","dog"]
        //       0    1      2
        // so to get name of first pet:  arrayName[0][1]


        // Take a closer look:
        console.log(`the parsed JSON is ${results}`)
        console.log(`the first row/item in the big array is a small array: ${results[0]}`)
        console.log(`to get to Paul, need results[0][1]: ${results[0][1]}`)


        // Now output the names of all the dogs into the textArea control:
        let message = ""
        for (i = 0; i < results.length; i++)
            message = message + results[i][1] + "\n"
        txtTypeNames.value = message
     } // end else

  } else   // the transit didn't work - bad wifi? server off?
        //transit error - Handle that with an error message.
        lblMessage2.textContent = "Error code: " + req.status
}
*/