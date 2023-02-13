const container = document.querySelector("#genre-selects-container")
const originalSelect = document.querySelector("#genre-select")
const addButton = document.querySelector("#add-button");

//this code allows us to add multiple genres!
addButton.addEventListener("click", () => {
    // if cloneNode(), it will be an empty list
    const anotherSelect = originalSelect.cloneNode(true);
    container.appendChild(anotherSelect)
})