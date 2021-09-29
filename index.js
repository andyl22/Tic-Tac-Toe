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

const gameBoard = (() => {

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
        _saveBoardState(e);
        e.target.textContent = gameController.playerTurn.weapon;
        gameController.switchTurns();
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

    function removeAllListeners() {
        _boardPartitions.forEach(partition => partition.removeEventListener("click", _makeMove));
    }

    function highlightWin(winningArray) {
        winningArray.forEach(indexNumber => _boardPartitions[indexNumber].classList.add("winner"));
    }

    function displayWinner(winnerName) {
        console.log(winnerName + " won!");
    }

    return {
        get boardState() {
            return _boardState;
        },
        finalizeWinner(evaluation, winnerName) {
            removeAllListeners();
            highlightWin(evaluation);
            displayWinner(winnerName);
        }
    }
})();

const gameController = (() => {
    let _playerTurn;

    const detectWinner = function (boardState) {
        let a = boardState; // setting this to short variable for readability
        evaluateBoardState(a, player1);
        evaluateBoardState(a, player2);
    }

    function evaluateBoardState(a, player) {
        let weapon = player.weapon;
        let evaluation = 
        (a[0] == (weapon) && a[1] == (weapon) && a[2] == (weapon)) ? [0, 1, 2] :
        (a[3] == (weapon) && a[4] == (weapon) && a[5] == (weapon)) ? [3, 4, 5] :
        (a[6] == (weapon) && a[7] == (weapon) && a[8] == (weapon)) ? [6, 7, 8] :
        (a[0] == (weapon) && a[3] == (weapon) && a[6] == (weapon)) ? [0, 3, 6] :
        (a[1] == (weapon) && a[4] == (weapon) && a[7] == (weapon)) ? [1, 4, 7] :
        (a[2] == (weapon) && a[5] == (weapon) && a[8] == (weapon)) ? [2, 5, 8] :
        (a[0] == (weapon) && a[4] == (weapon) && a[8] == (weapon)) ? [0, 4, 8] :
        (a[2] == (weapon) && a[4] == (weapon) && a[6] == (weapon)) ? [2, 4, 6] :
        "No winner";
        if (evaluation != "No winner") {
            gameBoard.finalizeWinner(evaluation, player.name);
        }
    }

    const switchTurns = function () {
        detectWinner(gameBoard.boardState);
        if (_playerTurn == player1) {
            _playerTurn = player2;
        } else {
            _playerTurn = player1;
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
