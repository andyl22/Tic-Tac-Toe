const playerFactory = (name, weapon) => {
    const _name = name;
    const _weapon = weapon;

    return {
        get name() {
            return _name;
        },
        get weapon() {
            return _weapon;
        }
    }

};

const gameBoard = (()=> {

    console.log("Is this executed?");
    let _boardPartitions = _selectBoardPartitions();
    let _boardState = ["", "", "", "", "", "", "", "", ""];
    _setUpListeners();

    function _selectBoardPartitions() {
        let partitionOne = document.querySelector("#partition-one");
        let partitionTwo = document.querySelector("#partition-two");
        let partitionThree = document.querySelector("#partition-three");
        let partitionFour = document.querySelector("#partition-four");
        let partitionFive = document.querySelector("#partition-five");
        let partitionSix = document.querySelector("#partition-six");
        let partitionSeven = document.querySelector("#partition-seven");
        let partitionEight = document.querySelector("#partition-eight");
        let partitionNine = document.querySelector("#partition-nine");
        return [partitionOne, partitionTwo, partitionThree, partitionFour, partitionFive, partitionSix, partitionSeven, partitionEight, partitionNine];
    };

    function _setUpListeners() {
        _boardPartitions.forEach(partition => partition.addEventListener("click", _makeMove));
    }

    function _makeMove(e) {
        e.target.textContent = gameController.playerTurn.weapon;
        gameController.switchTurns();
        _saveBoardState(e);
    }

    function _saveBoardState(e) {
        _removeListener(e);
        _setBoardState(e);
    }

    function _removeListener(e) {
        e.target.removeEventListener("click", _makeMove);
    }

    function _setBoardState(e) {
        _boardState[e.target.getAttribute("data-partition-number")] = gameController.playerTurn.weapon;
    }

    return {
        get boardState() {
            return _boardState;
        }
    }
})();

const gameController = (()=> {
    let _playerTurn;

    const switchTurns = function() {
        if (_playerTurn==player1) {
            _playerTurn=player2;
        } else {
            _playerTurn= player1;
        }
        console.log(`${_playerTurn.name}'s turn.`);
    }

    return {
        set playerTurn(player) {
            _playerTurn = player;
        },
        get playerTurn() {
            return _playerTurn;
        },
        switchTurns
    }

})();

const player1 = playerFactory("Andy", "A");
const player2 = playerFactory("Yang", "Y");

gameController.playerTurn = player2;
console.log(gameController.playerTurn);
