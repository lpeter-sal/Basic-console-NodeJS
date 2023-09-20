const Task = require('./task')


class Tasks {

    _list = {};


    get listArr() {

        const list = [];
        Object.keys(this._list).forEach( key => {
           const task = this._list[key];
           list.push( task );
        });

        return list;

    }

    constructor() {
        this._list = {};
    }

    deleteTask( id = '') {
        if ( this._list[id] ) {
            delete this._list[id];
        }
    }

    uploadTasksToArray( tasks = [] ){

        tasks.forEach( task => {
            this._list[task.id] = task;
        })


    }

    newTask( desc = '') {

        const task = new Task(desc);
        this._list[task.id] = task;

    }

    completeList() {
        console.log();
        this.listArr.forEach( (task, i) => {
            const idx = `${i + 1}`.green;
            const {desc, completeIn} = task;
            const status = ( completeIn )
                                ? 'Complete'.green
                                : 'Pending'.red
            console.log(`${ idx } ${desc} :: ${ status }`)

        });
    }

    listCompleteToDos( completes = true) {
        console.log();
        let index = 0;
        this.listArr.forEach( task => {

            const {desc, completeIn} = task;
            const status = ( completeIn )
                                ? 'Complete'.green
                                : 'Pending'.red
            if (completes) {
                if(completeIn) {
                    index += 1;
                    console.log(`${ (index + '.').green } ${desc} :: ${ completeIn.green }`)
                }
            } else {
                if(!completeIn) {
                    index += 1;
                    console.log(`${ (index + '.').green } ${desc} :: ${ status }`)
                }
            }
        });
        
    }

    toggleComplete(ids = []){
        ids.forEach( id => {

            const task = this._list[id];
            if(!task.completeIn) {
                task.completeIn = new Date().toISOString();
            }
        });

        this.listArr.forEach( task => {
            if(!ids.includes(task.id)){
                this._list[task.id].completeIn = null;
            }
        });



    } 

}


module.exports = Tasks;

