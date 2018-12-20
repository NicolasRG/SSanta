//import all of the css here
require('../stylesheets/index.css');
//import nescecary for general stuff
const graph = require('./../../utils/userGraph.js');
//grab html elements
const emails = [];
const ruleDivs = {};
let acitveEmailIndex ;
const stepOneDiv = document.getElementById("stepOneDiv");
const emailButton = document.getElementById('emailButton');
const emailInput  = document.getElementById('emailInput');
const emailTable = document.getElementById("emailTable");
const stepTwoButton = document.getElementById("addNodesToDivTransistion");
const stepTwoDiv = document.getElementById("emailRuleTable");
const pageHeader = document.getElementById("pageHeader");
const createCircuitButton = document.getElementById("createCircuitButton");

//
console.log("start");
//attach helper button events


//add string listener 
emailInput.addEventListener("keyup", (e)=>{emailEnter(e)});

//add emails to temp array 
emailButton.addEventListener("click", ({...e})=>{
    addTempEmail();
});

createCircuitButton.addEventListener("click", (e)=>{createCircuitButtonEvent()});

//once all the email have been inserted add exclusions
stepTwoButton.addEventListener("click",  ({...e})=>{
    //stepOneDiv.className = "Hidden";
    stepOneDiv.parentNode.removeChild(stepOneDiv);
    stepTwoButton.parentNode.removeChild(stepTwoButton);
    //initiate the next step that would editting the table to allow 
    //adding excluesions
    tableToStepTwo({table:emailTable, div: stepTwoDiv, header:pageHeader});
});


//settup helper functions
const tableToStepTwo = ({...e})=>{
    console.log(e);
    //edit the table as needed
    for(let i =1, row; row = e.table.rows[i]; i++){
        console.log(i, emails[i-1]);
        const temp = row.cells[0];
        const email = emails[i-1].email;
        temp.addEventListener("click", (e)=>{emailClick(e,i-1)});
        temp.className = "email_item";
        temp.innerHTML = "<strong>"+ email +"</strong>";
        temp.id = email+"_temp";
        e.div.appendChild(createEmailItem(email, i-1));

    }
    //show the updated ui??????
    e.div.className = "stepTwo";
    e.header.innerHTML = "Step 2: Add Rules";
    //choose the first item in the table so it defaults to somthing
    emailClick(null, 0);
    createCircuitButton.className = "";

}


const createEmailItem = (params, index) =>{ 
    const div = document.createElement('div');
    div.className = "email_item"; 
    div.innerHTML = "<strong>"+params+"</strong>";
    div.id = params+"_rule";
    div.active = true;
    div.addEventListener("click", (e)=>{
        //style the box to indicate some on/off
        console.log(params);
        switchEmailItem(div, index);
    })
    ruleDivs[params] = div; 
    return div;
}

//
const switchEmailItem = (div, index)=>{
    if(emails[index].email === emails[acitveEmailIndex].email){
        console.log("cannt change your own edge");
    }
    else if(div.active === true){
        div.active = false; 
        div.style = "opacity: .5;";


       

        emails[acitveEmailIndex].exceptions.push(emails[index].email);
        console.log(emails[acitveEmailIndex]);
        
    }else{
        div.active = true;
        div.style = "opacity: 1;";

        const tempindex =   emails[acitveEmailIndex].exceptions.indexOf(emails[index].email);
        emails[acitveEmailIndex].exceptions.splice(tempindex, 1);
        console.log(emails[acitveEmailIndex]);
    }
}



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
        emails.push({email:emailInput.value, 
                     exceptions : [] });
        const row = emailTable.insertRow(-1);
        row.className = "emailTableItem";
        const cell = row.insertCell(0);
        cell.innerHTML = emails.length+": "+emailInput.value;
        console.log(emails);
        emailInput.value = "";
    }else{
        alert("This email is already in the list");
    }
}

//Step 2 changes active user connectinone being made
const emailClick = (e, emailIndex)=>{
    console.log(emails[emailIndex],  "here");
    acitveEmailIndex = emailIndex;
//grab the current
    const email =  emails[emailIndex];
    updateEmailRuleTale();
    
}

/*
updates the email rule table on active node switch
*/
const updateEmailRuleTale = ()=>{
    //just a place holder
    console.log("update Email Rule Table", acitveEmailIndex);
    const excpetions = emails[acitveEmailIndex].exceptions;

    Object.keys(ruleDivs).forEach(element => {
        //console.log(ruleDivs[element], element);
        const div = ruleDivs[element];
        if(element == emails[acitveEmailIndex].email){//cannot choose it self
            div.style = 'opacity: 0.5; background: grey;';
            div.active = false;
        }
        else if(excpetions.indexOf(element) === -1){
            div.style = 'opacity: 1.0';
            div.active = true;
        }else{
            div.style = 'opacity: 0.5';
            div.active = false;
        }
    });
  
}

const createCircuitButtonEvent = ()=>{
    console.log(emails);
    alert("clicked finallized");

}