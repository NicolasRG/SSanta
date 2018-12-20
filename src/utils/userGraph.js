const Person = require('../graph/person.js');
const Edges = require('../graph/edges.js');
const Graph = require('../graph/graph.js');
const Traversal = require('../graph/graphUtil.js');

/**
 * This classs handles the interaction between the graph and meant to be used in the hihest layer
 */

class userGraph{

    constructor(){
        this.graph = new Graph();
            }
/**
 * returns an array of the eddges for the hamiltinian circuit  
 */
    findPattern(){        
        let left = this.graph.getSortedList()
        //loop through the all starting possible nodes until a path is found
        for (let i=0; i<this.graph.getLength(); i++){
            let temp = this.graph.getPerson(left.shift().person);
            let succeded = [];
            let bool = Traversal(this.graph, succeded, temp);
            console.log(bool); 
            if(bool){
                return ({list:bool})
            }else{
            }
        }
        
        return ({});
    }
/**
 * 
 * @param {Edges} edges 
 * @param {String} email 
 * @param {String} name 
 */
    addPerson(edges, email, name){ // edges: array of other email attached to it, email:unique id , name: persons name 
        if(Array.isArray(edges)){
            
           let tempedges = new Edges();

            edges.forEach((d)=>{
                tempedges.pushList(d);
            });
             this.graph.addPerson( new Person({
                email: email,
                name: name,
                edges: tempedges
                }));
        }
        
    }

    addEdgesToPerson(person, edge){
        const node = this.graph.getPerson(person);
    }

    toString(){
        let arr = [];
        test.loop((element)=>{
            (arr.push(element.getEdges()));
        })
        return arr;
    }

    contains(person){
        return this.graph.contains(person);
    }


}
module.exports = userGraph; 
