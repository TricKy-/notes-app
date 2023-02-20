const fs = require('fs')
const getNotes = () => {
    return 'Your notes...';
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added successfully')
    } else {
        console.log('Note title already used, please specify a unique title')
    }
};

// Stores changes to the notes in the notes.json file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}
// Loads notes stored in the notes.json file and stores them in an array
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    // Filter and return notes excluding the one selected for deletion
    const savedNotes = notes.filter((note) => note.title != title);
    // Check to confirm that a note is excluded from the array (and therefore not going to be saved)
    if (savedNotes.length === notes.length - 1) {
        notes.push({
            title: title,
            body: savedNotes.body
        })
        saveNotes(savedNotes)
        console.log('Note "' + title + '" successfully removed');
    } else {
        console.log('Failed to delete note');
    };

};

const listNotes = () => {
    const notes = loadNotes();
    console.log('Your notes: ');

    notes.forEach((note) => {
        console.log(note.title)
    })

}

const readNote = (title) => {
    const notes = loadNotes();
    const checkNotes = notes.find((note) => note.title === title)

    if (checkNotes) {
        console.log('Reading note: ' + checkNotes.title)
        console.log(checkNotes.body);
    } else {
        console.log('Note not found');
    }
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};