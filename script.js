const mot = $('#mot');
const mauvaisesLettres = $('#mauvaises-lettres');
const btnRejouer = $('#btn-rejouer');
const messageFinal = $('#message-final-container');
const notification = $('#notification-container');
const message = $('#message');
const themesTable = $('.all-themes');
const bonhommeParts = $('.bonhomme-part');

const themesJSON = [ecoleJSON, paysagesClimatJSON, calculMesuresJSON, alimentsJSON, gestesMouvementsJSON];
const themes = themesJSON.map(JSON.parse);

// remplir la table des themes
themesTable.html(`
    ${themes.map(oneTheme => `<tr><td class="oneTheme">${oneTheme.intitule}</td></tr>`)}
    `);

//const ecoleTheme = JSON.parse(ecoleJSON);
//console.log(themes);
//console.log(ecoleJSON);
//console.log(ecoleTheme.theme);
//const mots = ['ordinateur', 'programmation', 'javascript', 'html', 'universite'];
//let motSelectionne = mots[Math.floor(Math.random() * mots.length)];
//let selection = ecoleTheme.theme[Math.floor(Math.random() * ecoleTheme.theme.length)];
//let motSelectionne = selection.mot;
//let description = selection.description;

const tabBonneLettres = [];
const tabMauvaisesLettres = [];

var selection;
var themeSelectione;
var motSelectionne;
var description;

function addClickOnTd() {
    jQuery.each($('.oneTheme'), (index, maClasse) => {
        $(maClasse).on('click', function() {
            
            tabBonneLettres.splice(0);
            tabMauvaisesLettres.splice(0);
            
            themeSelectione = themes[index];
            selection = themeSelectione.theme[Math.floor(Math.random() * themeSelectione.theme.length)];
            motSelectionne = selection.mot;
            description = selection.description;
            console.log(motSelectionne);
            
            updateMauvaisesLettres();
            
            afficherMot();
            
        })
    });
}



// fonction pour afficher le motSelectionne:
function afficherMot() {
    mot.html(
        `${motSelectionne
            .split('')
            .map(
                lettre => `<span class="lettre">${tabBonneLettres.includes(lettre) ? lettre : ''}</span>`
            ).join('')}`
    );
    //console.log(mot.text());
    $('#description').text(description)
    if(mot.text() === motSelectionne){
        message.text("Bravo ! Vous avez gagné !");
        messageFinal.css({"display":"flex"});
        $(window).off('keydown');
    }
}

// update mauvaises lettres:
function updateMauvaisesLettres() {
    // affichage des mauvaises lettres
    if(tabMauvaisesLettres.length != 0){
        $('.mauvaises-lettres-container p').text("Mauvaises lettres");
    } else{
        $('.mauvaises-lettres-container p').text("");
    }
    mauvaisesLettres.html(`
        ${tabMauvaisesLettres.map(lettre => `<span>${lettre}</span>`)}
    `);
    // affichage du bonhomme
    jQuery.each(bonhommeParts, (index, part) => {
        const nbrErrors = tabMauvaisesLettres.length;
        if(index < nbrErrors){
            part.style.display = 'block';
        } else {
            part.style.display= 'none';
        }
    })
    // tester game over
    if(tabMauvaisesLettres.length === bonhommeParts.length){
        message.text("Vous avez perdu !");
        messageFinal.css({"display":"flex"});
        $(window).off('keydown');
    }
}

// afficher la notification:
function afficherNotification() {
    notification.addClass("afficher");
    setTimeout(()=>{
        notification.removeClass("afficher");
    }, 1500);
}

// eventListener
function activateKeys() {
    $(window).keydown(e => {
        if(typeof motSelectionne !== "undefined"){
            // les keyCode des lettres varient entre 65=>a et 90=>z. keyCod = 65 et key = a.
            if(e.keyCode >= 65 && e.keyCode <= 90){
                const lettre = e.key;
                if(motSelectionne.includes(lettre)){
                    if(!tabBonneLettres.includes(lettre)){
                        tabBonneLettres.push(lettre);
                        afficherMot();
                    } else {
                        afficherNotification();
                    }
                } else {
                    if(!tabMauvaisesLettres.includes(lettre)){
                        tabMauvaisesLettres.push(lettre);
                        updateMauvaisesLettres();
                    } else {
                        afficherNotification();
                    }
                }
            }
        }
    });
}

btnRejouer.click(e => {
    tabBonneLettres.splice(0);
    tabMauvaisesLettres.splice(0);

    selection = themeSelectione.theme[Math.floor(Math.random() * themeSelectione.theme.length)];
    motSelectionne = selection.mot;
    description = selection.description;

    $(window).on('keydown', activateKeys());
    updateMauvaisesLettres();
    afficherMot();
    messageFinal.css({"display":"none"});
})

function startGame() {
    addClickOnTd();
    activateKeys();
}

startGame();
