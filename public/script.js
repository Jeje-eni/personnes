	// créer un noeud en json
	let noeud = 'personnes.json';
	let url = 'https://monprojet-275a2-default-rtdb.europe-west1.firebasedatabase.app/'+noeud;
	let tableau = [];
	//-----------------------------------------------------
	fetch(url)
	.then( response => response.json())
	.then (tab => 
		{
			if (tab != undefined)
			{
				tableau = tab;
				afficherHTML();
			}			
		});

	//-----------------------------------------------------
	//  ajouter
	//-----------------------------------------------------
	function ajouter()
	{
		
		let nom = document.getElementById('nom').value;
		let prenom = document.getElementById('prenom').value;
		document.getElementById('nom').value = ''; // vider input
		document.getElementById('prenom').value = '';
		let personne = {};
		personne.nom = nom;
		personne.prenom = prenom;
		tableau.push(personne);
		afficherHTML();
		ajouterFire();	
	}
	//-----------------------------------------------------
	//  afficher tableau HTML
	//-----------------------------------------------------
	function afficherHTML()
	{
		// je vide le tableau 
		document.getElementById('liste').innerHTML= '';
		// parcours le tableau js pour ajouter <tr><td>...
		for(let personne of tableau){
			
			let tr = document.createElement('tr');//<tr></tr>
			let td1 = document.createElement('td'); //<td></td>
			let td2 = document.createElement('td'); //<td></td>
			td1.textContent= personne.prenom ;//<td>John</td>
			td2.textContent= personne.nom ;//<td>DOE</td>
			// mettre td1 ds la balise tr
			tr.appendChild(td1);
			tr.appendChild(td2);
			document.getElementById('liste').appendChild(tr); // <tbody><tr> ...
		}
	}
	//-----------------------------------------------------
	//  Ajouter dans firebase real time data base
	//-----------------------------------------------------
	function ajouterFire()
	{
		
		// https://gestion-equipe.firebaseio.com/fruits.json
		let param = {}
		param.method = 'PUT';
		param.header = {'Content-Type': 'application/json' };
		param.body = JSON.stringify(tableau); // je serialize le tab eb chaine de car
		fetch(url,param)
		.then( response => response.json())
		.then (info => 
			{
				console.log(info);			
			});
	}