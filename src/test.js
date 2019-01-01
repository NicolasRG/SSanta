const graph = require('./utils/userGraph.js');

const circuit = new graph();

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

circuit.findPattern();
