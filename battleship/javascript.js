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
    const has_ship = -1;
    return{position, has_ship}
}

function Gameboard(){
    const board = [];
    const ships = [];
    const missed_shots = [];
    const position_of_hits =[];
    var number_of_ships_sunk = 0 ;
    var number_of_ships_played = 0;
    
    function create_board(){
        for(let i=0; i<DIMENSIONS; i++){
            for (let j=0; j<DIMENSIONS; j++){
                let newSquare = Square(i,j);
                this.board.push(newSquare)
            }
        }
        return this.board
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

    function generate_ships(){
        for (let i=0;  i<REQUIRED_SHIPS.length; i++){
            const ship = Ship(REQUIRED_SHIPS[i][0], REQUIRED_SHIPS[i][1])
            //console.log(`created ${REQUIRED_SHIPS[i][0]} with a length of ${REQUIRED_SHIPS[i][1]}`)
            this.ships.push(ship)
        }
        return this.ships
    }

    function initialize(){
        this.create_board()
        this.generate_ships()
    }

    this.get_index=function(posX, posY){
        for(let i=0; i<board.length;i++){
            if(JSON.stringify(board[i].position) == JSON.stringify([posX,posY])){
                return i;
            }
        }
    }

    function get_adjacent_positions(posX, posY){
            const adjacent_moves =[[-1,0],[0, -1],[0,1],[1,0]]
            const adjacent_positions=[]
            for(let i=0; i<adjacent_moves.length;i++){
                let pos_x = posX+adjacent_moves[i][0]
                let pos_y = posY+adjacent_moves[i][1]
                adjacent_positions.push([pos_x, pos_y])
            }
            return(adjacent_positions)
    }

    this.isPlacementPossible = function(position_arr){
        //loops through the possible positions
        for(let i = 0 ; i< position_arr.length; i++){
            const index_of_interst = this.get_index(position_arr[i][0],position_arr[i][1]);
            //check if all positions are within board
            if(!check_position_on_board(position_arr[i][0], position_arr[i][1]) ){
                return false;
            }
            //check that there is no ship already at that position
            if(board[index_of_interst].has_ship!=-1){
                return false;
            }
        }
        return true;
    }

    function placeShip(ship_to_place, position_arr){
        //check if placement is possible
        if(!isPlacementPossible(position_arr)){
            return false;
        }
        else{ 
            ship_to_place.position = position_arr
            this.number_of_ships_played++;
            console.log(ship_to_place.position)
            for(let i=0;i<position_arr.length;i++){
                console.log(this.get_index(position_arr[i][0],position_arr[i][1]))
                this.board[this.get_index(position_arr[i][0],position_arr[i][1])].has_ship=i            
            }
            return true;
        }    
    }

    function receiveAttack(posX, posY){
        let direct_hit = false;
        console.log(posX + "," + posY)
        //determines if the coordinates hit any of the ships,
        //sends a hit to the correct ship,
        //records the coordinates of missed shot
        if(JSON.stringify(missed_shots).includes(JSON.stringify([posX, posY])) || JSON.stringify(position_of_hits).includes(JSON.stringify([posX,posY]))){
            console.log("you already made that move!")
        }
        else{
            for(let i=0;i<this.ships.length;i++){
                //console.log(JSON.stringify(this.ships[i].position))
                if(this.ships[i].position==[]){
                    return;
                }
                if(JSON.stringify(this.ships[i].position).includes(JSON.stringify([posX,posY]))){
                    console.log("you hit a ship")
                    this.ships[i].hits++;
                    if(this.ships[i].isSunk()==true){
                        this.number_of_ships_sunk++;
                        console.log(`YOU SUNK A ${this.ships[i].name} !!!!!`)
                    }
                    direct_hit = true;
                    this.position_of_hits.push([posX,posY])
                    if(this.sunk_all_ships()==true){
                        console.log("GAME OVER")
                    }
                }
                
            }
            if(direct_hit==false){
                console.log("you missed!")
                this.missed_shots.push([posX, posY])
            }
            
        }
        return direct_hit

    }
    //determines if all the ships placed have been sunk
    function sunk_all_ships(){
        console.log("number of ships sunk: "+this.number_of_ships_sunk)
        if(REQUIRED_SHIPS.length>this.number_of_ships_sunk){
            return false;
        }
        else{
            return true;
        }
    }

    function get_adjacent_positions(posX, posY){
        const adjacent_moves =[[-1,0],[0, -1],[0,1],[1,0]]
        const adjacent_positions=[]
        for(let i=0; i<adjacent_moves.length;i++){
            let pos_x = posX+adjacent_moves[i][0]
            let pos_y = posY+adjacent_moves[i][1]
            adjacent_positions.push([pos_x, pos_y])
        }
        return(adjacent_positions)
    }
    

    return{
        board,
        ships,
        number_of_ships_played,
        missed_shots,
        position_of_hits,
        number_of_ships_sunk,
        check_position_on_board,
        create_board,
        get_index, 
        generate_ships,
        initialize,
        get_adjacent_positions,
        isPlacementPossible,
        placeShip,
        receiveAttack,
        sunk_all_ships,
        get_adjacent_positions
    }
}

const myGameboard = Gameboard();
//myGameboard.create_board();
myGameboard.initialize();
//console.log(myGameboard.get_index(4,4))
//console.log(myGameboard.check_position_on_board(4,4))
//console.log(myGameboard.check_position_on_board(10,10))
const possible_positions =  [[2,3], [3,3], [4,3]]

//console.log(myGameboard.get_adjacent_positions(4,4))

//console.log(REQUIRED_SHIPS.length)
//console.log(myGameboard.get_index(possible_positions[0][0],possible_positions[0][1]))
//console.log(myGameboard.isPlacementPossible(possible_positions))
//console.log(myGameboard.ships)
console.log(myGameboard.placeShip(myGameboard.ships[3],possible_positions))
console.log(myGameboard.ships[3].position)

myGameboard.missed_shots.push([5,4])
myGameboard.missed_shots.push([7,8])
myGameboard.missed_shots.push([5,8])
//console.log(myGameboard.missed_shots.includes(JSON.stringify([5,8])))
myGameboard.receiveAttack(5,8) //already missed
myGameboard.receiveAttack(5,3) //miss
myGameboard.receiveAttack(3,3) //hit
myGameboard.receiveAttack(3,3) //already made that move and it was a hit!
console.log("Position of hits: " + JSON.stringify(myGameboard.position_of_hits))
console.log("Position of missed shots: "+ JSON.stringify(myGameboard.missed_shots))
console.log("number of hits taken to the third ship: "+ myGameboard.ships[3].hits)
myGameboard.receiveAttack(2,3)
myGameboard.receiveAttack(4,3)
console.log(myGameboard.ships[3].hits)
console.log(myGameboard.ships[3].isSunk()) //true
console.log("number of ships sunk: " + myGameboard.number_of_ships_sunk)
console.log(myGameboard.sunk_all_ships()) //false

myGameboard.number_of_ships_sunk = 5   
console.log("number of ships hit: "+ myGameboard.number_of_ships_sunk)
console.log("length of required ships: "+ REQUIRED_SHIPS.length)
console.log("Sunk all ships: "+ myGameboard.sunk_all_ships())
