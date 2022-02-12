"use strict";

/*
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

/*
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */

oGameData.initGlobalObject = function() 
{
    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', ''); // använder denna spelplanen... 

    //oGameData.gameField = Array('', '', '', '', '', '', '', '', '');
    // Rutorna! ('0', '1', '2', '3', '4', '5', '6', '7', '8');
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'O', 'X', '', 'X', '', 'O', 'O', 'O');
    //oGameData.gameField = Array('X', 'X', 'O', 'O', 'X', 'X', 'O', 'O', 'O');
    //oGameData.gameField = Array('O', '', '', 'O', '', '', 'O', '', '');
    //oGameData.gameField = Array('O', '', '', '', 'O', '', '', '', 'O');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O');// == return 0;
    //oGameData.gameField = Array('O', 'X', '', 'O', 'X', 'O', 'O', 'O', 'X'); //return 3;
    //oGameData.gameField = Array('X', 'O', 'X', 'O', 'X', 'X', 'O', 'O', ''); //Ragequit ( Har testat och lägga ut sista spelpjäsen där X vinne Diagonalt får 1 läger vi O eller på plats 8 returnerar de 2om inget retunerar de3)


    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen. 
    oGameData.timerId = null;
}

let startGame = false;
// Skapar värden för variablerna oData
// Källa: F9 Workshop / Räknestuga 3 
let oData = 
{
    counter : 0,
    timerId : null,
    h1Ref : document.querySelector('#errorMsg')
};
// Detta är halva programmet, all info kommer upp när sidan laddar, den snartar upp sidan med all info.


window.addEventListener("load", function()
{
    //kallar på checkboxS functionen
    checkBoxS();
    let tableRef = document.querySelector("input[type='checkbox']");
    oGameData.initGlobalObject();
    //gömmer spelplanen
    document.querySelector('#gameArea').classList.add('d-none');
    // lägger en eventlistner på start knappen
    document.querySelector('#newGame').addEventListener('click', function( event )
    {
        console.log( event.target, event.currentTarget);
        // Validerar folmulär. 
        validatForm();
    });

    // Lägger till lyssnare för checkbox. 
    tableRef.addEventListener('click', function(e)
    {
        console.log('click');
        // om den inte är null. 
        if(oData.timerId !== null)
        {
            // om den e null  så är countern 0.
            // will execute the time every 1 sec.. 
            clearInterval(oData.timerId);
            oData.counter = 0;     
        }
        
        oData.timerId = setInterval( function()
        {
            //om du kryssar i checkboxen och tyrcker på sparta spel kommer de nedan exikveras
            if(startGame === true && document.querySelector("input[type='checkbox']").checked == true)
            {
                // if loopen som informerar hur långt tid de har gått.  
                console.log('timer');
                oData.counter++;
                oData.h1Ref.textContent = 'Nu har det gått ' + oData.counter + ' sekunder...';
            } 
            if(oData.counter === 5)
            {   //om timern blir 5sek kommer den byta spelare
                console.log('Du kommer in i if 5');
                //clearInterval(oData.timerId);
                oData.counter = 0;
                oData.h1Ref.textContent = 'Nu har 5 sekunder passerat';
                oGameData.switchPlayer();
            }
        }, 1000); // 1000 = one per second.   
    });
     
    //window.validatForm = function()
    function validatForm()
    {
        try 
        {  // detta är hela try saken för färg o nickname.. 
            let textRefs = document.querySelectorAll('input[type=text]');
            let currentTextRef = null;
            console.log(textRefs);
    // for loopen som säger att bokstävera får inte vara mindre än 5 
            for(let counter = 0; counter < textRefs.length; counter++) 
            {
                currentTextRef = textRefs.item(counter);
                // Om värdet < 5. Throw
                if(currentTextRef.value.length < 5) 
                {
                   //Fixad för labb 2 
                   // skriver ut felemedelandet i skärmen.. 
                   throw { elementRef : currentTextRef, errorMsg : 'Nickname måste innehålla fler 5 eller fler tecken.'}; 
                }

                // Jämför strängar med hjälp av localeCompare om värdet på strängarna är >= 5. 
                if(currentTextRef.value.length >= 5) 
                {
                    var str1 = nick1.value;
                    var str2 = nick2.value;
                    var n = str1.localeCompare(str2);
                    console.log(n);
                    
                    let nicks = nick1.value + ' ' + nick2.value;
                    console.log(nicks);

                    if(n === 0)
                    {
                        //Fixad för labb 2 
                        throw { elementRef : nicks, errorMsg : 'Nickname för spelare 1 och spelare 2 får inte vara lika'};
                    }                   
                }

                // Färger
                var playerOneColor = color1.value;
                var playerTwoColor = color2.value;


                //ANTAGANDE: Att svart eller vit kan endast vara #ffffff & #000000. 
                // Spelare 1
                // säger att  man ej kan välja svart eller vit 
                if(playerOneColor === '#ffffff' || playerOneColor === '#000000') 
                {
                    //Fixad för labb 2 
                   throw { elementRef : currentTextRef, errorMsg :'Spelare 1: Du kan inte välja svart eller vit'};
                }
                // Spelare 2
                if(playerTwoColor === '#ffffff' || playerTwoColor === '#000000') 
                {
                    throw { elementRef : currentTextRef, errorMsg :'Spelare 2: Du kan inte välja svart eller vit'};
                }
                // seplare 1 elr 2 kan ej ha samma färg 
                if(playerOneColor === playerTwoColor)
                {
                   //Fixad för labb 2 
                   throw { elementRef : currentTextRef, errorMsg : 'Ni kan inte ha samma färg!'};
                }
                // Lång if-sats som kollar alla förvillkor är uppfyllda. 
                if(nick1.value.length >= 5 && nick2.value.length >= 5 && n != 0 && 
                    playerOneColor != '#ffffff' && playerOneColor != '#000000' &&
                    playerTwoColor != '#ffffff' && playerTwoColor != '#000000' &&
                    playerOneColor != playerTwoColor)
                {
                    initiateGame();  
                    document.querySelector('#errorMsg').textContent = "";
                }
            }  
        } 
        
        //Fixad för labb 2 
        catch(oError) 
        {
            console.log(oError.errorMsg);
            
            //Här tar emot och fångar undantaget + visar felmeddelande
            document.querySelector('#errorMsg').textContent = oError.errorMsg;
            oError.focus();
            
        }
    }
    // Först checkbox sedan text. 
    /* Källa: https://www.w3schools.com/js/js_htmldom_nodes.asp */
    function checkBoxS()
    {
        // skapade en div där vi lägger in texte + Checkbox rutan!!! 
        // Div
        let checkDiv = document.createElement("div");
        checkDiv.classList.add('col-12'); 
        let fore = document.querySelector('#divWithA');
        let element = document.getElementById("divInForm");
        element.insertBefore(checkDiv, fore);

       // Checkbox is created. 
        let value; 
        let cbh = document.getElementById("divInForm");
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        cbh.appendChild(checkBox);
        checkBox.value = value;
        checkDiv.appendChild(checkBox);
        
        // Label is created. 
        let para = document.createElement("label");
        para.classList.add('form-control-label');
        para.classList.add('ml-2');
        let node = document.createTextNode("Vill du begränsa tiden till 5 sekunder per drag?");
        para.appendChild(node);
        checkDiv.appendChild(para);
    }
      
    function initiateGame()
    {  
        startGame = true;
        //Tar bort fältet för att skriva in namn och färg
        // När denna är inlaggd försvinner startknappen, tolkar att den ska göra detta! 
        let speralre = document.getElementById('divInForm');
        speralre.classList.add('d-none');
    
        //Tar bor d-none så man ser formuläret 
        let seSpelplan = document.querySelector('#gameArea').classList.remove('d-none');
      
        //Tar bort p elementet så det inte står något i de
        let tabortText = document.getElementById('errorMsg');
        tabortText.innerHTML = "";
    
        //Spara spelare 1 & 2s namn
        oGameData.nickNamePlayerOne = document.getElementById("nick1").value;
        oGameData.nickNamePlayerTwo = document.getElementById("nick2").value;
     
       //Sparar sperlare 1 & 2s Färger
        oGameData.colorPlayerOne = document.getElementById("color1").value;
        oGameData.colorPlayerTwo = document.getElementById("color2").value;
      
        //Spelplanens bakgrundsbild blir vit och rensar spelbrädan
        document.querySelectorAll("td").forEach((item) => 
        {
            item.style.backgroundColor = "white";
            item.textContent = "";
        });

        //lägger till lokala variabler
        let playerChar;
        let playerName;

        // Slumpar om vilken spelare som skall börja. 
        if (Math.random() > 0.5) 
        {
            playerChar = oGameData.playerOne;
            playerName = oGameData.nickNamePlayerOne;
            oGameData.currentPlayer = oGameData.playerOne;
        }
        else 
        {
            playerChar = oGameData.playerTwo;
            playerName = oGameData.nickNamePlayerTwo;
            oGameData.currentPlayer = oGameData.playerTwo;
        }
        
        //Skriver ut vems tur det är
        document.querySelector("h1").innerHTML = "Aktuell spelare är " + playerName;
       
        // Lyssnare för tabell, Anonym funktion
        document.querySelector('table').addEventListener('click', executeMove);
    }
});



function executeMove(oEvt)
{
    oData.counter = 0;
    console.log(oEvt.target.nodeName);

    // Kollar om man verkligen trycker på en TD
    if(oEvt.target.nodeName === 'TD')
    {
        let pos = oEvt.target.getAttribute('data-id');
        if(oGameData.gameField[pos] == [''])
        {
            /* Byter spelare */
            oGameData.switchPlayer();
            oGameData.gameField[pos] = oGameData.currentPlayer;
            
            /* Sätter färg & Bokstav */

            /* Spelare 1 */
            if(oGameData.currentPlayer == oGameData.playerOne)
            {
                oEvt.target.textContent = oGameData.playerTwo;
                oEvt.target.setAttribute('style', 'background-color: ' + color2.value);
            }

            /* Spelare 2 */
            if(oGameData.currentPlayer == oGameData.playerTwo)
            {
                oEvt.target.textContent = oGameData.playerOne;
                oEvt.target.setAttribute('style', 'background-color: ' + color1.value);
            }
        }
        
        if(oGameData.checkForGameOver() == 1 || oGameData.checkForGameOver() == 2 || oGameData.checkForGameOver() == 3) 
        {
            /* TAR BORT KLICK */
            document.querySelector('table').removeEventListener('click', executeMove);

            /* TAR BORT D-NONE PÅ FORMULÄRET */
            let speralre = document.getElementById('divInForm');
            speralre.classList.remove('d-none');
            
            // O är vinnare
            if(oGameData.checkForGameOver() == 1)
            {
                document.querySelector("h1").innerHTML = 'Vinnare är ' + document.getElementById("nick2").value +'(O)' + '! Spela igen? ';
                startGame = false;
                oData.h1Ref.textContent = '';
            }
            // X är vinnare
            if(oGameData.checkForGameOver() == 2)
            {
                document.querySelector("h1").innerHTML = 'Vinnare är ' + document.getElementById("nick1").value + '(X)' + '! Spela igen? ';
                startGame = false;
                oData.h1Ref.textContent = '';
            }
            // Oavgjort
            if(oGameData.checkForGameOver() == 3)
            {
                document.querySelector("h1").innerHTML = 'Det vart oavgjort! Spela igen? ';
                startGame = false;
                oData.h1Ref.textContent = '';
            }

            /*  LÄGGER TILL D-NONE PÅ GAMEAREA */
            document.querySelector('#gameArea').classList.add('d-none');

            /* ANROPAR FUNKTIONEN, STARTAR OM SPELET */
            oGameData.initGlobalObject();
        }
    }
}
/* Funktion som switchar spelare.  */
oGameData.switchPlayer = function()
{
    if(oGameData.currentPlayer == oGameData.playerOne)
    {
        oGameData.currentPlayer = oGameData.playerTwo;
        document.querySelector("h1").innerHTML = "Aktuell spelare är " + oGameData.nickNamePlayerTwo;
    }
    else 
    {
        oGameData.currentPlayer = oGameData.playerOne;
        document.querySelector("h1").innerHTML = "Aktuell spelare är " + oGameData.nickNamePlayerOne;
    }
}

// Horizontal
oGameData.checkHorizontal  = function()  
{ 
   /* Kollar om X är vinnare  Här är alla Varianter X kan vinna på i Horizontalt sätt */
    if(oGameData.gameField[0] == ['X'] && oGameData.gameField[1] == ['X'] && oGameData.gameField[2] == ['X'])
    {
        return 1;
    }
    if(oGameData.gameField[3] == ['X'] && oGameData.gameField[4] == ['X'] && oGameData.gameField[5] == ['X'])
    {
        return 1;
    }
    if(oGameData.gameField[6] == ['X'] && oGameData.gameField[7] == ['X'] && oGameData.gameField[8] == ['X'])
    {
        return 1;
    }

    /* Kollar om O är vinnare  Här är alla Varianter 0 kan vinna på i Horizontalt sätt*/
    if(oGameData.gameField[0] == ['O'] && oGameData.gameField[1] == ['O'] && oGameData.gameField[2] == ['O'])
    {
        return 2;
    }
    if(oGameData.gameField[3] == ['O'] && oGameData.gameField[4] == ['O'] && oGameData.gameField[5] == ['O'])
    {
        return 2;
    }
    if(oGameData.gameField[6] == ['O'] && oGameData.gameField[7] == ['O'] && oGameData.gameField[8] == ['O'])
    {
        return 2;
    }
}

// Vertical
oGameData.checkVertical = function ()
{
    /* Kollar om X är vinnare Här är alla Varianter X kan vinna på i Vertical sätt */
    if(oGameData.gameField[0] == ['X'] && oGameData.gameField[3] == ['X'] && oGameData.gameField[6] == ['X'])
    {
        return 1;
    }
    if(oGameData.gameField[1] == ['X'] && oGameData.gameField[4] == ['X'] && oGameData.gameField[7] == ['X'])
    {
        return 1;
    }
    if(oGameData.gameField[2] == ['X'] && oGameData.gameField[5] == ['X'] && oGameData.gameField[8] == ['X'])
    {
        return 1;
    }

    /* Kollar om O är vinnare Här är alla Varianter O kan vinna på i Vertical sätt */
    if(oGameData.gameField[0] == ['O'] && oGameData.gameField[3] == ['O'] && oGameData.gameField[6] == ['O'])
    {
        return 2;
    }
    if(oGameData.gameField[1] == ['O'] && oGameData.gameField[4] == ['O'] && oGameData.gameField[7] == ['O'])
    {
        return 2;
    }
    if(oGameData.gameField[2] == ['O'] && oGameData.gameField[5] == ['O'] && oGameData.gameField[8] == ['O'])
    {
        return 2;
    }
}
// Diagonal: Left to right
oGameData.checkDiagonalLeftToRight = function()
{
    /* Kollar om X är vinnare */
    if(oGameData.gameField[0] == ['X'] && oGameData.gameField[4] == ['X'] && oGameData.gameField[8] == ['X'])
    {
        return 1;
    }
    /* Kollar om O är vinnare */
    if(oGameData.gameField[0] == ['O'] && oGameData.gameField[4] == ['O'] && oGameData.gameField[8] == ['O'])
    {
        return 2;
    } 
}
// Diagonal: Right to left
oGameData.checkDiagonalRightToLeft = function()
{
    /* Kollar om X är vinnare */
    if(oGameData.gameField[2] == ['X'] && oGameData.gameField[4] == ['X'] && oGameData.gameField[6] == ['X'])
    {
        return 1;
    }
        
        /* Kollar om O är vinnare */
    if(oGameData.gameField[2] == ['O'] && oGameData.gameField[4] == ['O'] && oGameData.gameField[6] == ['O'])
    {
        return 2;
    }
}
// Draw
oGameData.checkForDraw = function()
{
/* Går igenom gameField och kollar efter tomma positioner 
    och returnerar 0 om den hittar en tomm position. Och ingen vinnare är given*/
    for (let i = 0; i < 8; i++)
    {
        if(oGameData.gameField[i] == '')
        {
            return 0;   
        }
    }
    return 3;
}
// Check for GameOver
oGameData.checkForGameOver = function() 
{
    
    /* Om den retunerar 1 eller 2 så ska den checkForGameOver retunera denna funktion. */
    if(oGameData.checkVertical() == 1 || oGameData.checkVertical() == 2)
    {
        return oGameData.checkVertical(); 
    }

    /* Om den retunerar 1 eller 2 så ska den checkForGameOver retunera denna funktion. */
    if(oGameData.checkHorizontal() == 1 || oGameData.checkHorizontal() == 2)
    {
        return oGameData.checkHorizontal(); 
    }
    /* Om den retunerar 1 eller 2 så ska den checkForGameOver retunera denna funktion. */
    if(oGameData.checkDiagonalLeftToRight() == 1 || oGameData.checkDiagonalLeftToRight() == 2)
    {
        return oGameData.checkDiagonalLeftToRight(); 
    }

    /* Om den retunerar 1 eller 2 så ska den checkForGameOver retunera denna funktion. */
    if(oGameData.checkDiagonalRightToLeft() == 1 || oGameData.checkDiagonalRightToLeft() == 2)
    {
        return oGameData.checkDiagonalRightToLeft(); 
    }

    /* Om den retunerar 3 så ska den checkForGameOver retunera denna funktion. */
    if(oGameData.checkForDraw() == 3 || oGameData.checkForDraw() == 0)
    {
        return oGameData.checkForDraw();
    }
}

