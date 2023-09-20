require('colors');

const { saveDB, readDB } = require('./helpers/saveFile');

const { inquirerMenu, 
        pause, 
        readInput,
        listDeleteTasks,
        confirm,
        showChecklist } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');


const main = async() => {

    let opt = '';
    const tasks = new Tasks();

    const tasksDB = readDB();

    if (tasksDB) {
        tasks.uploadTasksToArray(tasksDB);
    }

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await readInput('Description: ');
                tasks.newTask(desc);
            break;
        
            case '2':
                tasks.completeList()
            break;

            case '3':
                tasks.listCompleteToDos(true);
            break;

            case '4':
                tasks.listCompleteToDos(false);
            break;

            case '5':
               const ids = await showChecklist(tasks.listArr);
               tasks.toggleComplete(ids);
            break;

            case '6':
                const id = await listDeleteTasks( tasks.listArr );
                if(id !== '0'){
                    const ok = await confirm('Are you sure?');
                    if (ok){
                        tasks.deleteTask(id);
                        console.log('Deleted Task ')
                    }
                }
            break;
        }

        saveDB( tasks.listArr );




        await pause();
        
    } while (opt !== '0');

}



main();
