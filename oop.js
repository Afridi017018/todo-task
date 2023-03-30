class ToDo {
    constructor(name) {
        this.name = name;
        this.id = Date.now();
    }
}


class List {
    constructor() {
        this.all = JSON.parse(localStorage.getItem("ok")) || [];
    }

    add(todo) {
        this.all.push(todo);

        // console.log(todo,"and"," ",this.all)
        // console.log(this.todos)
        this.saveToLocal();
    }

    deleteData(id) {

        this.all = this.all.filter((element) => {
            return element.id !== id
        })

        this.saveToLocal();

    }

    saveToLocal() {
        localStorage.setItem("ok", JSON.stringify(this.all));
        this.display();

    }

    display() {
        const list = document.getElementById("list");
        list.innerHTML = "";
        this.all.forEach((element) => {
            const li = document.createElement("li");
            li.innerHTML = `
          
            ${element.name}
            <button class="edit" data-id="${element.id}">Edit</button>
            <button class="delete" data-id="${element.id}">Delete</button>
          `;
            list.appendChild(li);
        });
    }
}

let FinalToDo = new List();

document.getElementById("add").addEventListener("click", () => {
    const input = document.getElementById("input");

    // console.log(input.value)

    if (input.value) {
        let info = new ToDo(input.value);
        FinalToDo.add(info);
    }
});


document.getElementById("list").addEventListener("click", (event) => {
    let target = event.target;
    // console.log(target.classList.contains("delete"));
    if (target.classList.contains("delete")) {
        const id = parseInt(target.getAttribute("data-id"))
        // console.log(id)
        FinalToDo.deleteData(id)
    }

    else if (target.classList.contains("edit")) {
        const id = parseInt(target.getAttribute("data-id"));
        const edit = FinalToDo.all.filter((element) => element.id === id)[0]
        // console.log(edit)
        const name = prompt();
        if (name) {
            // console.log(name)
            edit.name = name;
            FinalToDo.saveToLocal();
        }
    }
})


FinalToDo.display();




// let test = new List()
// let tmp = new ToDo("Afridi")
// test.add(tmp);

// pest.add(test);

// console.log(test)




// let obj =[{
//     name: "shahiddd",
//     age: 244
// },
// {
//     name: "aaassassa",
//     age: 30
// }
// ]


// let save=function() {
//     localStorage.setItem("todoss", JSON.stringify(obj));
//     this.display();
//   }


//   save();

//   console.log(JSON.parse(localStorage.getItem("todoss")))
