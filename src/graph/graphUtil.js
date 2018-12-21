const Person = require('./person.js');
const Edges = require('./edges.js');
const Graph = require('./graph.js');

//loop through all the possible edges at the node
//returns true if the path is found/false if not found 
function graphTraversal(graph, succeded, index,){//the graph, list : list of succeded edges, index: the node at which 
    //check to see if there is a possible move left
    const next = possibleOption(index, succeded, graph.getLength());
    if(next.length < 1){
        return null;//not an option
    }
    //test the varaious options
    for(let i =0; i<next.length ;i++){
        
        const temp = next[i][1];
        succeded.push(next[i]);
        
       
        //test to see if its the end here
        if(succeded.length === graph.getLength()){
            //console.log(succeded, "at first local check");
            return succeded //we're done
        }
     
        const result = graphTraversal(graph, succeded, graph.getPerson(temp));

        if(result !== null){
            //console.log(result, "at second local check at ", temp);
                return result
        }else{
            //console.log(next[i], "did not work", succeded)
            succeded = succeded.slice(0,-1); //this breaks it :/
            //console.log(next[i], "did not work", succeded)
        }

    }
    //if it got this point return false
    console.log(index + " has no possible locations to go to")
    return null

}
/*
    params : Person: person object, succede: array of edges that already have been filled
    returns : array of an array of node to node edges : if its a possible option
*/
function possibleOption(person, succeded, glength){
    console.log(person);
    const options = person.getEdges().getList();
    const nodeEmail = person.getEmail();
    const possible = [];
    for(let i = 0; i < options.length; i++){
        //console.log(options[i]);
        
        let index = false;

        for(let j = 0; j < succeded.length; j++){ //loop through succeded to see if i is in it
            if(succeded[j][0] == undefined){
                console.log("undefined")
            }else if((succeded.length) === (glength-1)){//if its the last one
                if(succeded[j][1] ===  options[i]){
                    index = true;
                }
            }
            else if((succeded[j][0] ===  options[i]) ) {
                //can be considered safe if its the last node that needs to be placed
                index = true;
                break;
            }

        }
        if(!index){
            possible.push([nodeEmail, options[i]])
        }
    }
    //console.log(possible);//,"succeded:" ,succeded," options: " , options);
    return possible;

}

module.exports = graphTraversal;