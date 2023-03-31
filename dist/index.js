"use strict";
function add(name) {
    let obj = {
        name: name,
        id: Date.now(),
    };
    save([...getData(), obj]);
}
function save(allData) {
    localStorage.setItem("funts", JSON.stringify(allData));
    display();
}
function getData() {
    let allData = JSON.parse(localStorage.getItem("funts")) || [];
    return allData;
}
function deleteData(id) {
    const del = getData().filter((element) => element.id !== id);
    save(del);
}
function display() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    getData().forEach((element) => {
        const li = document.createElement("li");
        li.innerHTML = `
        ${element.name}
        <button class="edit" data-id=${element.id}> Edit </button>
        <button class="delete" data-id="${element.id}"> Delete </button>
      `;
        list.appendChild(li);
    });
}
document.getElementById("add").addEventListener("click", () => {
    const input = document.getElementById("input");
    if (input.value) {
        add(input.value);
    }
});
document.getElementById("list").addEventListener("click", (event) => {
    let target = event.target;
    if (target.classList.contains("edit")) {
        let id = parseInt(target.getAttribute("data-id"));
        const all = getData();
        const edit = all.find((element) => element.id === id);
        const newName = prompt();
        edit.name = newName;
        save(all);
    }
    else if (target.classList.contains("delete")) {
        const id = parseInt(target.getAttribute("data-id"));
        deleteData(id);
    }
});
display();
