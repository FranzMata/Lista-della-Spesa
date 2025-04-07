const addItemButton = document.getElementById('addItemButton');
const itemInput = document.getElementById('itemInput');
const shoppingList = document.getElementById('shoppingList');

// Carica la lista dalla memoria
let shoppingItems = JSON.parse(localStorage.getItem('shoppingItems')) || [];

// Funzione per renderizzare la lista
function renderList() {
    shoppingList.innerHTML = '';
    shoppingItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', item.completed);

        const span = document.createElement('span');
        span.textContent = item.name;
        span.addEventListener('click', () => toggleItem(index));

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove');
        removeButton.textContent = 'Rimuovi';
        removeButton.addEventListener('click', () => removeItem(index));

        li.appendChild(span);
        li.appendChild(removeButton);
        shoppingList.appendChild(li);
    });
}

// Funzione per aggiungere un articolo
function addItem() {
    const itemName = itemInput.value.trim();
    if (itemName) {
        shoppingItems.push({ name: itemName, completed: false });
        localStorage.setItem('shoppingItems', JSON.stringify(shoppingItems));
        itemInput.value = '';
        renderList();
}

// Funzione per alternare lo stato (completato/non completato)
function toggleItem(index) {
    shoppingItems[index].completed = !shoppingItems[index].completed;
    localStorage.setItem('shoppingItems', JSON.stringify(shoppingItems));
    renderList();
}

// Funzione per rimuovere un articolo
function removeItem(index) {
    shoppingItems.splice(index, 1);
    localStorage.setItem('shoppingItems', JSON.stringify(shoppingItems));
    renderList();
}

// Event listener per il bottone Aggiungi
addItemButton.addEventListener('click', addItem);

// Renderizza la lista all'avvio
renderList();
