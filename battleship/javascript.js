const NUMBER_OF_REQUIRED_SHIPS = 5
const DIMENSIONS = 10;
const REQUIRED_SHIPS = [
    ["carrier", 5],
    ["battleship", 4],
    ["cruiser", 3],
    ["submarine",3],
    ["destroyer", 2]
]


function Ship(name, ship_length){
    this.name = name;
    const hits = 0;
    const sunk = false;
    this.ship_length = ship_length;
    const position = [];
    //increases the number of hits
    function hit(){
        this.hits  = this.hits +1;
        return this.hits;
    }
    //determines if the ship is sunk based on the length and the number of hits taken
    function isSunk(){
        if(this.ship_length==this.hits){
            this.sunk = true;
        }
        return this.sunk;
    }

    return {name, ship_length, position, hits, sunk, hit, isSunk}
}

function Square(posX,posY){
    const position = [posX,posY]
    //const hit = false;
    //const has_ship = -1;
    return{position}
}

//Gameboard is a 10X10
function Gameboard(){
    var board = create_board();
    var ships = generate_ships();
    var missed_shots = [];
    var position_of_hits = [];
    var number_of_ships_sunk = 0 ;
    var number_of_ships_played = 0;
    // this.board = create_board();
    // this.ships = generate_ships();
    // this.missed_shots = [];
    // this.position_of_hits = [];
    // this.number_of_ships_sunk = 0 ;
    // this.number_of_ships_played = 0;
 
    

    function create_board(){
        var gameboard = [] 
        for(let i=0; i<DIMENSIONS; i++){
            gameboard[i]=[]
            for (let j=0; j<DIMENSIONS; j++){
                let newSquare = Square(i,j);
                gameboard[i][j] = newSquare
                //gameboard.push([i,j])
            }
        }
        return gameboard
    }

    function generate_ships(){
        var ships = [];
        for (let i=0;  i<REQUIRED_SHIPS.length; i++){
            const ship = Ship(REQUIRED_SHIPS[i][0], REQUIRED_SHIPS[i][1])
            ships.push(ship)
        }
        return ships;
    }

    //checks that the position is within the board 
    function check_position_on_board(posX, posY){
        if(posX<DIMENSIONS && posX>-1 ){
            if(posY<DIMENSIONS && posY > -1){
                return true
            }
        }
        console.log("position "+ posX + "," +posY + " is not on the board")
        return false;
    }

    function nowrap(ship_to_place,position_arr,isVertical){
        if(isVertical==false){
            if(position_arr[0][1]+ship_to_place.ship_length-1>9){
                return false
            }
        }
    }

    function get_position_of_ships(){
        try{
            var position_of_ships = []
            for(let i=0;i<REQUIRED_SHIPS.length;i++){
                var position_arr = this.ships[i].position
                position_of_ships.push(...position_arr)
            }
            return position_of_ships
        }
        catch(error){
            if(error instanceof TypeError){
                var position_of_ships = []
                for(let i=0;i<REQUIRED_SHIPS.length;i++){
                    var position_arr = ships[i].position
                    position_of_ships.push(...position_arr)
                }
                return position_of_ships
            }
            else{
                throw error
            }
        }

    }
  
    function isPlacementPossible(ship_to_place, position_arr, isVertical){
            var position_of_ships = get_position_of_ships()
            if(ship_to_place.ship_length != position_arr.length){
                console.log("Array is not the same length as the ship length required for that type of ship")
                return false;
            }
            if(nowrap(ship_to_place,position_arr,isVertical)==false){
                console.log("wrapping is not allowed!")
                return false
            }
            
            //loops through the possible positions
            for(let i = 0 ; i< position_arr.length; i++){
                if(JSON.stringify(position_of_ships).includes(JSON.stringify(position_arr[i]))){
                    console.log("WARNING: There is already a ship there")
                    return false
                }
                //check if all positions are within board
                if(!check_position_on_board(position_arr[i][0], position_arr[i][1]) ){
                    console.log("That position is off the board")
                    return false;
                }
            }
            return true;
        
    }

    function placeShip(ship_to_place, position_arr, isVertical){
            console.log("Called place ship on: " + ship_to_place.name +
            "\n at position: "+ JSON.stringify(position_arr))
            if(isPlacementPossible(ship_to_place, position_arr, isVertical)){
                ship_to_place.position = position_arr
                console.log(ship_to_place.name + " placed successfully")
                return true
            } 
            else{
                console.log("WARNING: You cannot place ship")
                return false
            }
    }


    function receiveAttack(posX, posY){
            if(JSON.stringify(this.missed_shots).includes(JSON.stringify([posX, posY])) || JSON.stringify(this.position_of_hits).includes(JSON.stringify([posX,posY]))){
                console.log("you already made that move!")
            }
            else{
                for(let i=0;i<this.ships.length;i++){
                    if(JSON.stringify(this.ships[i].position).includes(JSON.stringify([posX,posY]))){
                        console.log("you hit a ship!")
                        this.ships[i].hits++;
                        this.position_of_hits.push([posX,posY])
                        if(this.ships[i].isSunk()==true){
                            this.number_of_ships_sunk++;
                            console.log(`YOU SUNK A ${this.ships[i].name}!`)
                        }
                        if(this.sunk_all_ships()==true){
                            console.log("GAME OVER")
                        }
                        return true
                    }

                }
                console.log("you missed!")
                this.missed_shots.push([posX, posY])
                return false
            }
    }

    
    //determines if all the ships placed have been sunk
    function sunk_all_ships(){
        if(REQUIRED_SHIPS.length>this.number_of_ships_sunk){
            return false;
        }
        else{
            return true;
        }
    }


    function get_possible_position_array(row, column, length, isVertical){
        var starting_position = [row,column]
        var possible_pos_array=[]
        var previousPos;
        possible_pos_array.push(starting_position)
        if(isVertical == true){
            //console.log("Generating a vertical position array")
            for(let i=1;i<length;i++){
                previousPos  = [row+i, column]
                possible_pos_array.push(previousPos)
            }
        }
        else{
            //console.log("Generating a horizontal position array")
            for(let i=1;i<length;i++){
                previousPos  = [row, column+i]
                possible_pos_array.push(previousPos)
                }
            }
        //console.log("Generated possible array: "+JSON.stringify(possible_pos_array))
        return possible_pos_array
    }
    
    function randomly_place_single_ship(ship_to_place){
            var row = Math.floor(Math.random()*DIMENSIONS);
            var column = Math.floor(Math.random()*DIMENSIONS)
            var isVertical = Math.random() < 0.5;
            var position_arr = get_possible_position_array(row, column, ship_to_place.ship_length, isVertical)
            if(position_arr==undefined){
                console.log("This position array will not work. Generate a new positon array")
                return false
            }
            else{
                if(placeShip(ship_to_place,position_arr, isVertical)){
                    return true
                }
                else{
                    return false
                }
            }
    }

     function randomly_place_ships(){
        while(this.number_of_ships_played<5){
            if(randomly_place_single_ship(this.ships[this.number_of_ships_played])){
                this.number_of_ships_played++
            }
        }
        return JSON.stringify(get_position_of_ships())
    }

    function get_sunk_ship_positions(){
        var sunk_ship_positions = []
        for(let i=0; i<5 ;i++){
            if(this.ships[i].isSunk()==true){
                sunk_ship_positions.push(...this.ships[i].position)
            }
        }
        return sunk_ship_positions
    }
    

    return{
        board, 
        ships,
        missed_shots,
        number_of_ships_sunk,
        number_of_ships_played,
        position_of_hits,
        get_position_of_ships,
        placeShip, 
        create_board, 
        generate_ships,
        receiveAttack,
        check_position_on_board,
        sunk_all_ships, 
        create_board, 
        isPlacementPossible,
        get_possible_position_array,
        randomly_place_single_ship,
        randomly_place_ships,
        get_sunk_ship_positions
    }
}


function Player(){
    var gameboard = Gameboard();
    var name = null;
    var available_moves = get_available_moves(JSON.parse(JSON.stringify(gameboard.board)))
    var previous_moves = [];
    var priority_moves = [];

    function get_available_moves(arr){
        var pos_arr = []
        for(let i=0; i<10;i++){
            for(let j=0; j<10;j++){
                pos_arr.push(arr[i][j].position)
            }
        }
         return pos_arr
    }
    

    function get_index_from_available_moves(posX, posY){
        for(let i=0; i<available_moves.length;i++){
            if(JSON.stringify(available_moves[i]) == JSON.stringify([posX,posY])){
                return i;
            }
        }
    }


    function manual_attack(opponent, arr){
        //if attack has not been made at that position opponent will receive attack. The opponent's board will record the misses or hits made on their ships. 
        if(this.gameboard.number_of_ships_played==5 && opponent.gameboard.number_of_ships_played==5){
            var posX = arr[0]
            var posY = arr[1]
            var index_i = get_index_from_available_moves(posX,posY)
            console.log(`Attack ${opponent.name} at position [${posX},${posY}] \n at index ${index_i}`)
            if(JSON.stringify(this.previous_moves).includes(JSON.stringify([posX,posY]))){
                console.log("you already made that move!")
                return
            }
            else{
                var attack_result = opponent.gameboard.receiveAttack(posX, posY)
                this.previous_moves.push([posX,posY])
                this.available_moves.splice(index_i,1)
                //console.log(`There are now ${this.available_moves.length} available now. Previous moves list is now ${JSON.stringify(this.previous_moves)}`)
                return attack_result
            }
        }

    }

    function random_attack(opponent){
        //if both players have placed their ships, they can launch an attack
        if(this.gameboard.number_of_ships_played==5 && opponent.gameboard.number_of_ships_played==5){
            //console.log("Number of moves available: " + this.available_moves.length)
            if(this.available_moves.length > 0){
                var index_i = Math.floor(Math.random()*(this.available_moves.length));
                //console.log("random index generated:" + index_i)
                var posX= this.available_moves[index_i][0]
                var posY = this.available_moves[index_i][1]
                this.available_moves.splice(index_i,1)
                  if(!JSON.stringify(this.previous_moves).includes(JSON.stringify([posX,posY]))){
                    this.previous_moves.push([posX,posY])
                    return opponent.gameboard.receiveAttack(posX, posY)
                }
            }
            else{ 
                console.log("there are no more moves to make")
                return
            }
        }
    }
    

    function get_neighboring_positions(arr, player){
        var steps = [[0,-1],[-1,0],[0,1],[1,0]]
        var neighboring_positions = []
        for(let i=0;i<steps.length;i++){
            var possibleX = steps[i][0] + arr[0]
            var possibleY = steps[i][1] + arr[1]
            var possible_position = [possibleX,possibleY]
            //if position is on the board, add it to the neighboring array
            if(player.gameboard.check_position_on_board(possibleX,possibleY)){
                neighboring_positions.push(possible_position)
            }

        }
         return neighboring_positions
    }

    function smart_attack(opponent){
        //if the last move was a hit...
        if(JSON.stringify(opponent.gameboard.position_of_hits).includes(JSON.stringify(this.previous_moves[this.previous_moves.length-1]))){
            var last_posX = this.previous_moves[this.previous_moves.length-1][0]
            var last_posY = this.previous_moves[this.previous_moves.length-1][1]
            var neighboring_positions = get_neighboring_positions([last_posX,last_posY],opponent)
            for(let i=0;i<neighboring_positions.length;i++){
                if(!JSON.stringify(previous_moves).includes(JSON.stringify(neighboring_positions[i]))){
                    this.priority_moves.push(neighboring_positions[i])
                }
            }
            this.manual_attack(opponent, this.priority_moves.pop())
        }
        //if the last move was not a hit,but there are still priority moves 
        else{
            if(this.priority_moves.length!=0){
                this.manual_attack(opponent, this.priority_moves.pop())
            }
            else{
                this.random_attack(opponent)
            }
        }

    }



    return{
        gameboard,
        name,
        available_moves,
        previous_moves,
        priority_moves,
        get_available_moves,
        get_index_from_available_moves,
        manual_attack,
        random_attack,
        get_neighboring_positions,
        smart_attack
    }
}

console.log("*************************************************")

//MAKE A GAME

    // var player1 = Player()
    // var player2 = Player()
    // player1.name = "Player1"
    // player2.name = "Player2"
    //console.log(player1.gameboard.ships[1].position)
    //console.log(player1.gameboard.get_position_of_ships())
    // console.log(player1.gameboard.get_possible_position_array(1, 2, 3, true))
    //console.log(player1.gameboard.randomly_place_ships())
    // console.log(player2.gameboard.receiveAttack(4,5))

    
    //console.log(player1.gameboard.isPlacementPossible(player1.gameboard.ships[0],[[4,7],[5,7],[6,7],[7,7],[8,7]]))
    //player1.gameboard.increase_number_of_ships_placed()
    // player1.gameboard.placeShip(player1.gameboard.ships[0],[[4,7],[5,7],[6,7],[7,7],[8,7]])
    // player1.gameboard.placeShip(player1.gameboard.ships[1],[[7,0],[7,1],[7,2],[7,3]])
    // player1.gameboard.placeShip(player1.gameboard.ships[2],[[0,7],[0,8],[0,9]])
    //console.log("Number of ships placed: "+ player1.gameboard.number_of_ships_played)

    //  player1.manualShipPlacement(player1.gameboard.ships[3],[[6,2],[7,2],[8,2]]) //should fail because there is overlap
    // player1.manualShipPlacement(player1.gameboard.ships[3],[[2,3],[3,3],[4,3]])
    //  player1.manualShipPlacement(player1.gameboard.ships[3],[[2,3],[3,3],[4,3]]) //repeat and should fail
    //  player1.manualShipPlacement(player1.gameboard.ships[4],[[2,4],[2,5]])
    //  var set1 = new Set(player1.gameboard.get_position_of_ships())
    //  console.log(set1)

    // player2.manualShipPlacement(player2.gameboard.ships[0],[[1,2],[1,3],[1,4],[1,5],[1,6]])
    // player2.manualShipPlacement(player2.gameboard.ships[1],[[2,3],[2,4],[2,5],[2,6]])
    // player2.manualShipPlacement(player2.gameboard.ships[2],[[8,5],[8,6],[8,7]])
    // player2.manualShipPlacement(player2.gameboard.ships[3],[[7,3],[8,3],[9,3]])
    // player2.manualShipPlacement(player2.gameboard.ships[4],[[4,4],[4,5]])

    // console.log("Player1 ships: "+JSON.stringify(game.player1.gameboard.position_of_ships))
    // console.log("Player2 ships: " + JSON.stringify(game.player2.gameboard.position_of_ships))


    // //console.log(findDuplicates(strArray)) // All duplicates
    // console.log([...new Set(findDuplicates(strArray))]) // Unique duplicates


    //console.log("double check to make sure there is no overlap: " + [...new Set(findDuplicates(JSON.stringify(game.player1.gameboard.position_of_ships)))])
    //PLAY A GAME

//VISUALIZE




    



    var player1 = Player()
    var player2 = Player()
    player1.name = "Player1"
    player2.name = "Player2"

    function get_selection(ship, starting_position, target_length, isVertical){
        var posX = Number(starting_position[0])
        var posY = Number(starting_position[1])
        possible_pos_array=[]
        possible_pos_array.push(starting_position)
        for(let i=1;i<target_length;i++){
                    if(isVertical==true){
                        posX = posX+1
                        var possible_position = [posX,posY]
                        possible_pos_array.push(possible_position)
                    }
                    else{
                        posY = posY+1
                        var possible_position = [posX,posY]
                        possible_pos_array.push(possible_position)
                    }
        }
        if(player1.gameboard.isPlacementPossible(ship,possible_pos_array,isVertical) == false){
            return
        }
        else{
            return possible_pos_array
        }
        
    }


    var my_grid = document.querySelector('.grid-container-mine')
    var opponent_grid =document.querySelector('.grid-container-opponent')
    

    
    var hit_me = player1.gameboard.position_of_hits
    var missed_me = player1.gameboard.missed_shots

    var hit_opponent = player2.gameboard.position_of_hits
    var missed_opponent = player2.gameboard.missed_shots
    


    var content = document.querySelector(".choices > .content")
    var manual_placement = document.querySelector(".manual_placement")
    var random_placement = document.querySelector(".random_placement")
    var reset_button = document.createElement("button")
    reset_button.classList.add("reset_button")
    reset_button.innerHTML = "Reset"
    var my_console =document.querySelector(".console > .text")
    my_console.innerHTML = "Would you like to place your own ships manually or at random?"

    var rotate_selection = document.createElement("button")
    rotate_selection.innerHTML = "Rotate ship"
    rotate_selection.classList.add("rotate_ship")

    var next_selection = document.createElement("button")
    next_selection.innerHTML = "Place next ship"
    next_selection.classList.add("place_next_ship")

    function create_opponent_board(){
        for(let i=1;i<DIMENSIONS+1; i++){
            for(let j=1;j<DIMENSIONS+1;j++){
                var item = document.createElement('div');
                item.className = "grid-item"
                item.style.gridRow= i +"/"+ "span 1";
                item.style.gridColumn= j +"/"+ "span 1 ";
                item.innerHTML=`${i-1},${j-1}`
                opponent_grid.append(item)
            }
        }
    }
    
    function create_my_board(){
        for(let m=1;m<DIMENSIONS+1; m++){
            for(let n=1;n<DIMENSIONS+1;n++){
                var item = document.createElement('div');
                //item.className = "item_"+m+", "+n+ " grid-item"
                item.className = "grid-item"
                item.style.gridRow= m +"/"+ "span 1";
                item.style.gridColumn= n +"/"+ "span 1 ";
                item.innerHTML=`${m-1},${n-1}`
                my_grid.append(item)
            }
        }
    }
create_opponent_board()
create_my_board()
var my_grid_items = my_grid.querySelectorAll(":scope > .grid-item")
var opponent_grid_items = opponent_grid.querySelectorAll(":scope > .grid-item")
var selection = [] 
var current_ship ;
var target_length;
var isVertical = false;
var position = []
var isPlaced;
    
manual_placement.addEventListener("click", manually_place_ships_by_click);


random_placement.onclick = function() {
    content.innerHTML = ""
    my_console.innerHTML = ""
    player1.gameboard.randomly_place_ships()
    check_my_status()
    ready_to_play()
}





function manually_place_ships_by_click(){
    //right click to switch between vertical and horizontal placement options
    content.innerHTML = ""
    my_console.innerHTML = ""
    content.appendChild(reset_button)
    current_ship = player1.gameboard.ships[0]
    isPlaced=false
    get_position_loop()
    mouseover_loop()
    make_seleciton_loop()
    //get_next_ship()
}






function toggle_isVertical(to_tog){
    if(to_tog==false){
        return true
    }
    else{
        return false
    }
}



function get_position_loop(){
    my_grid_items.forEach(function(item){
        item.addEventListener("mouseover",function(){
            get_position(item)
        }
        )
    })
}


window.addEventListener('contextmenu',function(event){
    event.preventDefault();
    isVertical = toggle_isVertical(isVertical)
})

    
function mouseover_loop(){
    my_grid_items.forEach(function(item){
        item.addEventListener("mouseover", mouseover_selection)
})
}

function get_position(item){
    var posX = Number(item.innerHTML[0])
    var posY = Number(item.innerHTML[2])
    position = [posX, posY]
    return position
}
function mouseover_selection(){
    target_length = current_ship.ship_length;
    if(isPlaced==false){
        selection = get_selection(current_ship, position, target_length, isVertical)
        if(selection==undefined){
            remove_all_highlight()
        }
        else{
            highlight(selection)
        }
        return selection
    }
    else{
        return
    }
}

function highlight(arr){
    my_grid_items.forEach(function(item){
        position = get_position(item)
        if(JSON.stringify(arr).includes(position)){
            item.classList.add("hover_over")
        }
        else{
            item.classList.remove("hover_over")
        }
    })
}

function remove_all_highlight(){
    my_grid_items.forEach(function(item){
        item.classList.remove("hover_over")
    })
}

function make_selection(ship, arr, isVertical){
    if(isPlaced==false){
        remove_all_highlight()
        var results = player1.gameboard.placeShip(ship,arr,isVertical)
        isPlaced = true
        check_my_status()
        if(results){
            get_next_ship()
        }
    }
}


function make_seleciton_loop(){
    my_grid_items.forEach(function(item){
        item.addEventListener("click", function(){
           make_selection(current_ship,selection,isVertical)
        }) 
    })

}

function remove_mouseover(){
    my_grid_items.forEach(function(item){
        item.removeEventListener("mouseover", mouseover_selection)
})
}

function get_next_ship(){
    player1.gameboard.number_of_ships_played++
    if(player1.gameboard.number_of_ships_played<5){
        current_ship = player1.gameboard.ships[player1.gameboard.number_of_ships_played]
        my_console.innerHTML = ""
        my_console.innerHTML = `Place your ${current_ship.name} . Right-click to rotate.`
        isPlaced = false
    }
    if(player1.gameboard.number_of_ships_played==5){
        console.log("You placed all your ships! Ready to play!")
        my_console.innerHTML = ""
        ready_to_play()
    }
    
}


function ready_to_play(){
    player2.gameboard.randomly_place_ships()
    my_console.innerHTML = "Now we are ready to play. Click on the opposing team's board to launch an attack."
    content.appendChild(reset_button)
    play_a_game()
}

reset_button.onclick = function(){
    location.reload();
}

function play_a_game(){
    opponent_grid_items.forEach(function(item){
        var posX = Number(item.innerHTML[0])
        var posY = Number(item.innerHTML[2])
        var position = [posX, posY]
        
            item.onclick = function(){
                my_console.innerHTML=""
                if(player1.gameboard.number_of_ships_sunk<5 && player2.gameboard.number_of_ships_sunk<5){
                    my_console.innerHTML ="Entered this loop on a click"
                    var result = player1.manual_attack(player2,position)
                    if(result!=undefined){
                        check_opponents_status(item)
                        if(result==true){
                            my_console.innerHTML = `Direct hit at [${item.innerHTML}] on opponent`
                            if(player2.gameboard.number_of_ships_sunk==5){
                                my_console.innerHTML  = `You are a winner!`
                                return
                            }
                        }
                        else{
                            my_console.innerHTML = `Attack at [${item.innerHTML}] missed opponent`
                        }
                        //now opponent makes a move
                        player2.smart_attack(player1)
                        check_my_status()
                        if(player1.gameboard.number_of_ships_sunk==5){
                            my_console.innerHTML  = `You lost! Click reset to play again!`
                            return
                        }
                        
                    }
            
                    else{
                        my_console.innerHTML = `Attack at [${item.innerHTML}] is not allowed \n Number of ships played: ${player1.gameboard.number_of_ships_played} \n Number of my ships sunk: ${player1.gameboard.number_of_ships_sunk} `
                    }
            }
            else{
                my_console.innerHTML = "No more moves are allowed. Please reset your game if you want to continue."
                return
            }
            }    
    })
}
    
function check_my_status(){
    my_grid_items.forEach(function(item){
        var posX = Number(item.innerHTML[0])
        var posY = Number(item.innerHTML[2])
        var position = [posX, posY]
        var my_ships = player1.gameboard.get_position_of_ships()
        var my_sunk_ships = player1.gameboard.get_sunk_ship_positions()
        //console.log("My ships" + JSON.stringify(my_ships))
        if(JSON.stringify(my_ships).includes(JSON.stringify(position))){
            item.classList.add("ship_present")  
        }
        if(JSON.stringify(hit_me).includes(JSON.stringify(position))){
            item.classList.add("hit")
        }
        if(JSON.stringify(missed_me).includes(JSON.stringify(position))){
            item.classList.add("miss")
        }
        if(JSON.stringify(my_sunk_ships).includes(JSON.stringify(position))){
            my_ship_is_sunk(my_sunk_ships)
        }
    })
}


function check_opponents_status(item){
    //console.log(item)
    var posX = Number(item.innerHTML[0])
    var posY = Number(item.innerHTML[2])
    var position = [posX, posY]
    var sunk_ships_opponents = player2.gameboard.get_sunk_ship_positions()
    
    if(JSON.stringify(sunk_ships_opponents).includes(JSON.stringify(position))){
        //console.log(JSON.stringify(sunk_ships_opponents))
        opponent_ship_is_sunk(sunk_ships_opponents)
    }
    if(JSON.stringify(hit_opponent).includes(JSON.stringify(position))){
        item.classList.add("hit")
    }
    if(JSON.stringify(missed_opponent).includes(JSON.stringify(position))){
        item.classList.add("miss")
    }

}

function opponent_ship_is_sunk(arr){
    opponent_grid_items.forEach(function(item){
        var posX = Number(item.innerHTML[0])
        var posY = Number(item.innerHTML[2])
        var position = [posX, posY]
        if(JSON.stringify(arr).includes(JSON.stringify(position))){
            item.classList.remove("hit")
            item.classList.add("sunk")
        }
    })
}

function my_ship_is_sunk(arr){
    my_grid_items.forEach(function(item){
        var posX = Number(item.innerHTML[0])
        var posY = Number(item.innerHTML[2])
        var position = [posX, posY]
        if(JSON.stringify(arr).includes(JSON.stringify(position))){
            item.classList.remove("hit")
            item.classList.add("sunk")
        }
    })
}
