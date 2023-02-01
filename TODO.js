var taskInput=document.getElementById("new-task");//ajouter une nouvelle tache.
var addButton=document.getElementsByTagName("button")[0];//premier bouton
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul de #taches-incomplete
var completedTasksHolder=document.getElementById("completed-tasks");//taches-terminees


//nouvel element de la liste des taches
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");

	//entrer (case a cocher)
	var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	//input (text)
	var editInput=document.createElement("input");//text
	//button.edit
	var editButton=document.createElement("button");//edit button

	//button.delete
	var deleteButton=document.createElement("button");//delete button

	label.innerText=taskString;

	//chaque element doit etre ajouter
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";



	//et ajouter.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	console.log("Add Task...");
	//Crer un nouvel element de liste avec le texte de #new-task:
	var listItem=createNewTaskElement(taskInput.value);

	//ajouter un element de liste a un support de tache
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";

}

//modifier une tache existente.

var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		//si la classe parent est.editmode
		if(containsClass){

		//passe en .editmode
		//label devient la valeur d'entree.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
}




//supprimer la tache.
var deleteTask=function(){
		console.log("Delete Task...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		//supprime l'element de la liste parent ul.
		ul.removeChild(listItem);

}


//Marquer la tache comme terminer
var taskCompleted=function(){
		console.log("Complete Task...");
	
	//Ajouter l'element de la liste des taches au #completed-task
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
		console.log("Incomplete Task...");
//Marquer la tache comme incomplete.
	//Quand la case est decrochee
		//Ajoute l'element de la liste des taches aux #competed-task.
		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}

//la colle pour maintenir le tout ensemble.


//definissez le gestionnaire de clic sur la fonction addTask.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
//selectionner les enfants de ListItems 
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");


			//lier editTask au button d'edition.
			editButton.onclick=editTask;
			//lier deleteTask au button de suppression.
			deleteButton.onclick=deleteTask;
			//lier la tache terminer a checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}

//parcourez les elements de la liste ul d'un TaskHolder incomplet
	//pour chaque element de la liste
	for (var i=0; i<incompleteTaskHolder.children.length;i++){

		//lier les elements de la liste children(tache terminer)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}




//cycle sur les elements de liste ul TasksHolder termines
	for (var i=0; i<completedTasksHolder.children.length;i++){
	//lier les evenements aux elements de la liste(taches Incompletes)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}




// les problemes d'utilisation n'apparaissent que lorsqu'ils sont  devant un  bourdonnement.

//empeche la creation de taches vides .

//modifier la modification pour enregistrer lorsque vous etes  en mode edtion.
	
