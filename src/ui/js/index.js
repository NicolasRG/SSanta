//import all of the css here
require('../stylesheets/index.css');
//import nescecary for general stuff
const graph = require('./../../utils/userGraph.js');
const emails = [];
//settup helper functions
const tableToStepTwo = ({...e})=>{
    console.log(e);
    //edit the table as needed
    for(let i =1, row; row = e.table.rows[i]; i++){
        console.log(i, emails[i-1]);
        const temp = row.cells[0];
        temp.addEventListener("click", ()=>{emailClick(i-1)});
        temp.className = "email_item";
        temp.innerHTML = "<strong>"+ emails[i-1] +"</strong>";
        e.div.appendChild(createEmailItem(temp));

    }
    //show the updated ui??????
    e.div.className = "stepTwo";
    e.header.innerHTML = "Step 2: Add Rules";

}

const emailClick = (e)=>{
    console.log(emails[e]);
}

const createEmailItem = (div) =>{ 
    //const div = document.createElement('div');
    //div.className = "email_item"; 
    div.addEventListener("click", (e)=>{
        console.log(e);
        const style = div.style;
        div.style = "opacity: .5;";
    })
    return div;
}



console.log("start");
const stepOneDiv = document.getElementById("stepOneDiv");
const emailButton = document.getElementById('emailButton');
const emailInput  = document.getElementById('emailInput');
const emailTable = document.getElementById("emailTable");
const stepTwoButton = document.getElementById("addNodesToDivTransistion");
const stepTwoDiv = document.getElementById("emailRuleTable");
const pageHeader = document.getElementById("pageHeader");

//add string listener 
emailInput.addEventListener("keyup", (e)=>{emailEnter(e)});


//add emails to temp array 
emailButton.addEventListener("click", ({...e})=>{
    addTempEmail();
});

//once all the email have been inserted add exclusions
stepTwoButton.addEventListener("click",  ({...e})=>{
    //stepOneDiv.className = "Hidden";
    stepOneDiv.parentNode.removeChild(stepOneDiv);
    stepTwoButton.parentNode.removeChild(stepTwoButton);
    //initiate the next step that would editting the table to allow 
    //adding excluesions
    tableToStepTwo({table:emailTable, div: stepTwoDiv, header:pageHeader});
});

//listener in email input
const emailEnter = (e)=>{
    console.log(e);
    e=e||window.event;
  const  key = e.keyCode;
  if(key===13) //Enter
  {
    addTempEmail();
     return false; //return true to submit, false to do nothing
  }
}

//add email to array and also adds it to left hand list
const addTempEmail = (e)=>{
    console.log(emailInput.value);
    //If the email is unique add it, if not let the user now
    if(!emails.includes(emailInput.value)){
        emails.push(emailInput.value);
        const row = emailTable.insertRow(-1);
        row.className = "emailTableItem";
        const cell = row.insertCell(0);
        cell.innerHTML = emails.length+": "+emailInput.value;
        console.log(emails);
    }else{
        alert("This email is already in the list");
    }
}

