
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const deleteAll = document.querySelector('.delete-all');
const search = document.querySelector('.search input');




let completed = 0;
let undone = 0;
let total_tasks = 0

//create to-do li
const generateTemplate = todo =>{
   const html = `
   <li class="list-group-item">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
            <i  class="far fa-circle circle"></i>
          
    </li>
   `
   
   list.innerHTML +=  html
   total_tasks+=1
   document.querySelector('.total-tasks').innerHTML=total_tasks;
   

   document.querySelectorAll('.circle').forEach(function(element){
    element.addEventListener('click', function(){
        if(this.className === 'far fa-circle circle'){
            this.className = 'far fa-check-circle circle'
            element.parentNode.style.textDecoration = "line-through";
            completed++;
            undone = total_tasks - completed
            document.querySelector('.completed').innerHTML=completed;
            document.querySelector('.undone').innerHTML=undone;
        
           
        }
        else{
           this.className = 'far fa-circle circle'
           element.parentNode.style.textDecoration = "none";
           completed--;
           undone = total_tasks - completed
           document.querySelector('.completed').innerHTML=completed;
           document.querySelector('.undone').innerHTML=undone;
           
        }
    })
   })
     
   
};

//get value from input and add it to li template
addForm.addEventListener('submit' , e => {
  
    e.preventDefault();
    const todo = addForm.add.value.trim();
    generateTemplate(todo)
    addForm.add.value = ''

}
);

//delete to-do item
list.addEventListener('click' , e => {

    if(e.target.classList.contains('delete')){
       e.target.parentElement.remove()
       total_tasks--;
       completed--;
       undone = total_tasks - completed
       document.querySelector('.total-tasks').innerHTML=total_tasks;
       document.querySelector('.completed').innerHTML=completed;
       document.querySelector('.undone').innerHTML=undone;
    }
 

});

//deleting all to-do's
deleteAll.addEventListener('click' , e =>{
    if(e.target.classList.contains('delete-all')){
        list.innerHTML =  ''  
        document.querySelector('.total-tasks').innerHTML=0;
        document.querySelector('.completed').innerHTML=0;
        document.querySelector('.undone').innerHTML=0;
        
     }
})

//filter todo's
const filterTodos = (term) =>{

 Array.from(list.children)
 .filter( (todo) => !todo.textContent.toLowerCase().includes(term))
 .forEach( (todo) => todo.classList.add('filtered'));


 Array.from(list.children)
 .filter( (todo) => todo.textContent.toLowerCase().includes(term))
 .forEach( (todo) => todo.classList.remove('filtered'));

};


//keyup event
search.addEventListener('keyup', () =>{
 const term = search.value.trim().toLowerCase();
 filterTodos(term)
});














