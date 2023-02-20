const argv = require('yargs');
const yargs = require('yargs')
const notesUtils = require('./notes');

// Customise yargs version
yargs.version('0.1.0');

// Declaring add, remove, read and list commands below
// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: { //Setup title parameter for add command
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: { //Setup body parameter for add command
            describe: 'Note contents',
            demandOption: true,
            type: 'string'
        }
    },
    handler: addNote = (argv) => {
        notesUtils.addNote(argv.title, argv.body)
    }
});

// Declare remove command
yargs.command({
    command: 'remove',
    describe: 'Remove an already existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: removeNote = (argv) => {
        notesUtils.removeNote(argv.title);
    }
});

// Declare read command
yargs.command({
    command: 'read',
    describe: 'Read a specific note you have written',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtils.readNote(argv.title)
    }
});

// Declare list command
yargs.command({
    command: 'list',
    describe: 'List all the notes you have created',
    handler() {
        notesUtils.listNotes()
    }
});

yargs.parse();
//console.log(yargs.argv)
