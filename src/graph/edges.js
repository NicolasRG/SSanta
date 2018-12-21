class Edges{

    constructor(){
        this.list = [];
    }

    getList(){
        return this.list;
    }

    pushList(person){
        this.list.push(person);
    }

    toString(){
        return this.list ;
    }

}

module.exports =  Edges;