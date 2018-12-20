// Creates a person witch is a node with connected edges
class Person{
    //Object options {String name, String email, Edge edges}
    constructor(options){
        this.name = options.name;
        this.email = options.email;
        this.edges = options.edges;
    }

    getName(){
        return this.name;
    }

    getEmail(){
        return this.email;
    }

    getEdges(){
        return this.edges
    }

    setEdges(edges){
        this.edges = edges;
    }

    toString(){
        return this.email+"";
    }

}
module.exports =  Person;
