import express from 'express';
import path from 'path';
import url from 'url';
import fs from 'fs';
import { Contact } from './contact.mjs';

const app = express();
app.set('view engine', 'hbs'); 


// ----7-----
export function decorate(contact) {
    if (!contact) {return "";}
    const contactInfo = `Email: ${contact.email}\nPhone: ${contact.phoneNumbers.join(', ')}`;
    return `<span class="contact-info" title="${contactInfo}">${contact.name}</span>`;
}

// Middleware for parsing application
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => { 

    // console.log(req.method);
    // console.log(req.path);
    // console.log(req.query);

    next();  
});


const basePath = path.dirname(url.fileURLToPath(import.meta.url));
const publicPath = path.resolve(basePath, "public");
app.use(express.static(publicPath));

let server = null;
let contacts = [];
// Read contacts from JSON file
const contactsFilePath = path.join(basePath, 'code-samples', 'phonebook.json');
fs.readFile(contactsFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Failed to read file:", err);
        return;
    }
    const contactsData = JSON.parse(data);
    contacts = contactsData.map(contact => new Contact(contact.name, contact.email, contact.phoneNumbers));
    // console.log(contacts);

    const port = 3000;
    server = app.listen(port, () => {
      console.log(`Server started; type CTRL+C to shut down`);
    });
});


app.get('/', (req, res) => res.redirect('/editor'));


// -----7------
function getModifiedText(originalText) {
    let modifiedText = originalText;
    contacts.forEach(contact => {
        if (!contact) {return;}
        const regex = new RegExp("\\b" + contact.name + "\\b", "gi"); 
        modifiedText = modifiedText.replace(regex, decorate(contact));
    });
    return modifiedText;
}



app.post('/editor', (req, res) => {
    console.log("This is req body:", req.body);
    const originalText = req.body.formText;
    const modifiedText = getModifiedText(originalText);
    res.render('editor', { originalText, modifiedText });
});



app.get('/editor', (req, res) => {
    res.render('editor');
});


// -----6-------
app.post('/phonebook', (req, res) => {
    console.log("This is req.body.name: ", req.body.name)
    const { name, email, phoneNumbers } = req.body;
    const newContact = new Contact(name, email, phoneNumbers.split(',').map(phone => phone.trim()));
    contacts.push(newContact);  
    res.redirect('/phonebook');  
});


app.get('/phonebook', (req, res) => {
    let filteredContacts = contacts;
    if (req.query.contact) {
        const searchTerm = req.query.contact.toLowerCase();
        filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm) ||
            contact.phoneNumbers.some(number => number.includes(searchTerm))
        );
    }

    // console.log(`Method: GET`);
    // console.log(`Path: /phonebook`);
    // console.log(req.query);

    res.render('phonebook', { contacts: filteredContacts });
});

export { app, server };