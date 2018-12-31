//import all of the css here
require('../stylesheets/index.css');
//import nescecary for general stuff
const graph = require('./../../utils/userGraph.js');

//grab html elements
const emails = [];
const ruleDivs = {};
let acitveEmailIndex = null ;
let activeEmailDiv = null ;
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
        temp.innerHTML = "<strong>"+ i+": "+email +"</strong>";
        temp.id = email+"_temp";
        e.div.appendChild(createEmailItem(email, i-1));

    }
    //show the updated ui??????
    e.div.className = "stepTwo";
    e.header.innerHTML = "Step 2: Add Rules";
    //choose the first item in the table so it defaults to somthing
    createCircuitButton.className = "";
    if(emails[0].email === null){return}
    emailClick(document.getElementById(emails[0].email+"_temp"), 0);


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
    if(!containsInEmail(emailInput.value)){//fix this later
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
    //change the old and new clicked new email div
    if(activeEmailDiv !== null ){
        activeEmailDiv.style = "";
        activeEmailDiv = e.srcElement;
        }
     else{
        activeEmailDiv = e;
     }   
    activeEmailDiv.style = "background: green;";
    acitveEmailIndex = emailIndex;
//grab the current
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
    //alert("clicked finallized");
    addPeopleGraph();
}

const addPeopleGraph = () =>{
    //create the array 
    const circuit = new graph();
    //create a base array
    const base = [];
    /*
    emails.forEach((d,i)=>{
        base.push(d.email);
    });
    console.log(base);
    //loop through the array and add them to the graph
    emails.forEach((element, index)=>{
        //cant have nodes pointing back on themselves
        element.exceptions.push(element.email);
        //create the oppoiste of the ecxceptions
        const exceptions = element.exceptions;
        const list = base.filter((d,i)=>{
            return !exceptions.includes(d);
        });

        // create the array that is the oppposie to
           console.log(element, list); 
        //add the person to the graph
        circuit.addPerson(
            list,
            element.email,
            element.email,
            );
    });
    */
    circuit.addPerson(
        ["Nick", "Megan", "Tyler", "Brain", "Christy"],
        "Lina",
        "Lina"
    );
    
    circuit.addPerson(
        ["Lina", "Megan", "Tyler", "Brain", "Christy", "Me"],
        "Nick",
        "Nick"
    );
    
    circuit.addPerson(
        ["Lina","Nick", "Tyler", "Christy", "Me"],
        "Megan",
        "Megan"
    );
    
    circuit.addPerson(
        ["Lina", "Nick", "Megan", "Brain", "Me"],
        "Tyler",
        "Tyler"
    );
    
    circuit.addPerson(
        ["Lina", "Nick", "Tyler", "Christy", "Me"],
        "Brain",
        "Brain"
    );
    
    circuit.addPerson(
        ["Lina", "Nick", "Megan", "Brain", "Me"],
        "Christy",
        "Christy"
    );
    
    circuit.addPerson(
        ["Nick", "Megan", "Tyler", "Brain", "Christy"],
        "Me",
        "Me"
    );
    


    let solved = null;
    console.log(solved = circuit.findPattern());
    if(solved === false){
        alert("No Problem Solved");
        return
    }
        //parse to put into an alert box
    let str = "";
    solved.list.forEach(d=>{
        str = str+"{"+d+"}";
    });
    alert(str);
}


    const containsInEmail =(name)=>{
        let bool = false;
        for(let i=0; i<emails.length; i++){
            if(name === emails[i].email){
                return true
            }
        }
        return false
    }