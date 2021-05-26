	// créer un noeud en json
	let noeud = 'personnes.json';
	let url = 'https://monprojet-275a2-default-rtdb.europe-west1.firebasedatabase.app/'+noeud;
	let tableau = [];
	let tab =[];
let modifIndice;
//let url = '../tanaka/public/api/personnes/';  
//-----------------------------------------------------------------------
// Affiche le tableau HTML
//-----------------------------------------------------------------------
function afficheTabHtml()
{

     // vider le tableau html
     document.getElementById('liste').innerHTML ='';
     for (let p of tab){
      let tr = document.createElement('tr'); //<tr></tr>
      let td1 = document.createElement('td'); //<td>John</td>
      td1.textContent = p.prenom;
      let td2 = document.createElement('td'); //<td>DOE</td>
      td2.textContent = p.nom;
      let td3 = document.createElement('td'); //<td><button>del</button></td>
      let td4 = document.createElement('td'); //<td><button>del</button></td>
      let btn = document.createElement('button');
      // data-toto
      btn.setAttribute('data-id',p.id);
      btn.setAttribute('class','btn btn-danger');
        
      btn.onclick = function()
      {
        // recupére l'id
        let indice = this.parentElement.parentElement.rowIndex -1;
        console.log(this.parentElement.parentElement);
        // demander a l api d effacer la personne
        tab.splice(indice,1);
        console.log(tab);
        // je met le selcteur sur la balise button
        this.parentElement.parentElement.remove();
      }
      let icon = document.createElement('i');
      icon.setAttribute('class','fa fa-trash');
      btn.appendChild(icon); // je met icon dans le btn

      let btn2 = document.createElement('button');
      btn2.setAttribute('class','btn btn-primary');
     
      btn2.onclick = function()
      {
        $('#modifierModal').modal('toggle');
        modifIndice = this.parentElement.parentElement.rowIndex -1;
       
        let tr =  this.parentElement.parentElement;
        let prenom =  tr.children[0].innerHTML; 
        let nom =  tr.children[1].innerHTML; 
        console.log(nom);
        console.log(prenom);
        // je vais initialiser le champs input de la modal
        document.getElementById('nom2').value = nom;
        document.getElementById('prenom2').value = prenom;
      }
      let icon2 = document.createElement('i');
      icon2.setAttribute('class','fa fa-edit');
      btn2.appendChild(icon2); // je met icon dans le btn

      td4.appendChild(btn2);
      td3.appendChild(btn); // je met le btn ds le td;
      tr.appendChild(td1); // je met <td> ds <tr> 
      tr.appendChild(td2);
      tr.appendChild(td4);
      tr.appendChild(td3);
      document.getElementById('liste').appendChild(tr);
     }

}
//-----------------------------------------------------------------------
// Ajoute une personne
//-----------------------------------------------------------------------
function ajouter(){
  // je recupère le nom et prenom
  let nom = document.getElementById('nom').value;
  let prenom = document.getElementById('prenom').value;
  // je vide les champs input
  document.getElementById('nom').value='';
  document.getElementById('prenom').value='';
  // je crée un objet JS
  let personne = {nom :nom, prenom :prenom};
  tab.push(personne);
  afficheTabHtml();
}
//-----------------------------------------------------------------------
// Enlever une personne
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// Modifier une personne
//-----------------------------------------------------------------------
function modifier()
{
   // je cache  la modal
   $('#modifierModal').modal('toggle');  

   

  //je récupère le nom et prenom
  //pour créer un objet 
  let nom = document.getElementById('nom2').value;
  let prenom = document.getElementById('prenom2').value;
  tab[modifIndice].nom =nom;
  tab[modifIndice].prenom =prenom;
   afficheTabHtml();
}
//-----------------------------------------------------------------------

afficheTabHtml();