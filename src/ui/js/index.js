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
        console.log(i);
        const temp = row.cells[0];
        temp.addEventListener("click", emailClick);
        temp.className = "";
        //temp.innerHTML = "<strong>wave good bye</strong>";
    }
    //show the updated ui??????
    e.div.className = "stepTwo";
    e.header.innerHTML = "Step 2: Add Rules";
    e.s
    

}

const emailClick = (e)=>{
    console.log(e);
}


console.log("start");
const stepOneDiv = document.getElementById("stepOneDiv");
const emailButton = document.getElementById('emailButton');
const emailInput  = document.getElementById('emailInput');
const emailTable = document.getElementById("emailTable");
const stepTwoButton = document.getElementById("addNodesToDivTransistion");
const stepTwoDiv = document.getElementById("emailRuleTable");
const pageHeader = document.getElementById("pageHeader");


//add emails to temp array 
emailButton.addEventListener("click", ({...e})=>{
    console.log(emailInput.value);
    //If the email is unique add it, if not let the user now
    if(!emails.includes(emailInput.value)){
        emails.push(emailInput.value);
        const row = emailTable.insertRow(-1);
        row.className = "emailTableItem";
        const cell = row.insertCell(0);
        cell.innerHTML = emailInput.value;
        console.log(emails);
    }else{
        alert("This email is already in the list");
    }
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

