const mot = $('#mot');
const mauvaisesLettres = $('#mauvaises-lettres');
const btnRejouer = $('#btn-rejouer');
const messageFinal = $('#message-final-container');
const notification = $('#notification-container');
const message = $('#message');

const bonhommeParts = $('.bonhomme-part');


const mots = ['ordinateur', 'programmation', 'javascript', 'html', 'universite'];

let motSelectionne = mots[Math.floor(Math.random() * mots.length)];

console.log(motSelectionne);

const tabBonneLettres = [];
const tabMauvaisesLettres = [];

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
    if(mot.text() === motSelectionne){
        message.text("Bravo ! Vous avez gagné !");
        messageFinal.css({"display":"flex"});
    }
}

// update mauvaises lettres:
function updateMauvaisesLettres() {
    // affichage des mauvaises lettres
    if(tabMauvaisesLettres.length > 0)
        $('.mauvaises-lettres-container p').text("Mauvaises lettres");
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
$(window).keydown(e => {
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
});

btnRejouer.click(e => {
    tabBonneLettres.splice(0);
    tabMauvaisesLettres.splice(0);
    motSelectionne = mots[Math.floor(Math.random() * mots.length)];
    updateMauvaisesLettres();
    afficherMot();
    messageFinal.css({"display":"none"});
})

afficherMot();