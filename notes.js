const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {   
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title already exists'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length !== notesToKeep.length) {
        console.log(chalk.green('Removing ' + title + '...'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red(title + ' not found.'))
    }
    
}

const saveNotes = (notes) => {
    const noteJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', noteJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')    
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if (notes.length > 0) {
        console.log(chalk.underline('Your notes:'))
        notes.forEach( (note) => {
            console.log(chalk.bold.green('Title: ') + note.title)
            console.log(chalk.bold.green('  Body: ') + note.body)
        });
    } else {
        console.log(chalk.red.bold('ERROR: No notes found!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    
    if (note) {
        console.log(chalk.bold.green('Title: ') + note.title)
        console.log(chalk.bold.green('  Body: ') + note.body)
    } else {
        console.log(chalk.red.bold('Note not found!'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}