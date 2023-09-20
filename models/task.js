const { v4: uuidv4 } = require('uuid');


class Task {

    id = '';
    desc = '';
    completeIn = null;

    constructor( desc ) {
        this.id = uuidv4();
        this.desc = desc;
        this.completeIn = null;
    }

}


module.exports = Task;



