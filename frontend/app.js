let form = document.getElementById('contact-form');
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');
let noteInput = document.getElementById('note');
let tableBody = document.getElementById('table-body');
let searchInput = document.getElementById('search');

let editIndex = null;

function getContacts() {
  let contacts = localStorage.getItem('contacts');
  return contacts ? JSON.parse(contacts) : [];
}

function saveContacts(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function renderTable() {
  let contacts = getContacts();
  let filter = searchInput.value.toLowerCase();
  tableBody.innerHTML = '';
  contacts.forEach((contact, index) => {
    if (contact.name.toLowerCase().includes(filter) || 
        contact.email.toLowerCase().includes(filter) || 
        contact.phone.includes(filter) || 
        contact.note.toLowerCase().includes(filter)) {
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td>${contact.note}</td>
        <td>
          <button class="edit" onclick="editContact(${index})">Edit</button>
          <button class="delete" onclick="deleteContact(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    }
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  let contacts = getContacts();
  let contact = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    note: noteInput.value.trim()
  };

  if (editIndex === null) {
    contacts.push(contact);
  } else {
    contacts[editIndex] = contact;
    editIndex = null;
    form.querySelector('button').textContent = 'Add';
  }

  saveContacts(contacts);
  renderTable();
  form.reset();
});

function editContact(index) {
  let contacts = getContacts();
  nameInput.value = contacts[index].name;
  emailInput.value = contacts[index].email;
  phoneInput.value = contacts[index].phone;
  noteInput.value = contacts[index].note;
  editIndex = index;
  form.querySelector('button').textContent = 'Update';
}

function deleteContact(index) {
  let contacts = getContacts();
  contacts.splice(index, 1);
  saveContacts(contacts);
  renderTable();
}

searchInput.addEventListener('input', renderTable);

renderTable();
