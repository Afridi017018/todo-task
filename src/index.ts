function add(name: string): void {
    let obj = {
      name: name,
      id: Date.now(),
    };
  
    save([...getData(), obj]);
  }
  
  function save(allData: object[]): void {
    localStorage.setItem("funts", JSON.stringify(allData));
    display();
  }
  
  function getData(): object[] {
    
    let allData: object[] = JSON.parse(localStorage.getItem("funts")as string) || [];
    return allData;
  }

  function deleteData(id: number): void {
    const del = getData().filter((element: any) => element.id !== id);
    save(del);
  }
  
  function display(): void {
    const list = document.getElementById("list")!;
    list.innerHTML = "";
  
    getData().forEach((element: any) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${element.name}
        <button class="edit" data-id=${element.id}> Edit </button>
        <button class="delete" data-id="${element.id}"> Delete </button>
      `;
      list.appendChild(li);
    });
  }

  
  
  document.getElementById("add")!.addEventListener("click", () => {
  
    const input = document.getElementById("input")as HTMLInputElement;
  
    if (input.value) {
      add(input.value);
    }
  });
  
  document.getElementById("list")!.addEventListener("click", (event) => {
    let target: any = event.target;
  
    if (target.classList.contains("edit")) {
      let id:number = parseInt(target.getAttribute("data-id"));
      const all:object[] = getData();
      const edit = all.find((element:any) => element.id === id)!;
      
      const newName = prompt();
      
      edit.name = newName;
      save(all);
    } else if (target.classList.contains("delete")) {
      const id = parseInt(target.getAttribute("data-id"));
      deleteData(id);
    }
  });
  
  display();



  




