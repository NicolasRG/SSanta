const Person  = require('./person.js');
const Edges = require('./edges.js');
/*
Graph is a contatiner that create manages persons and thier edges in a map
*/
class Graph{

    constructor(){
        this.map = new Map();
    }

    addPerson(person){
        this.map.set(person.getEmail(), person);
    }

    getPerson(email){
        return this.map.get(email);
    }

    getLength(){
        return this.map.size;
    }

    //iterates through the entire map and runs some callback on it
    loop(callback){
        this.map.forEach(element=>{
            callback(element);
        })
    }

    //gets a sorted array of person emails by the length of thier edges
    getSortedList(){
        const lengths = []
        this.loop((d,i)=>{
            lengths.push({person:d.email, length: d.getEdges().getList().length});
        })
        lengths.sort((a,b)=>{
            return a.length - b.length;
        })

        return lengths;
    }

    contains(person){
        if(this.map.get(person) == undefined){
            return false
        }else{
            return true
        }
    }

}

module.exports = Graph 

