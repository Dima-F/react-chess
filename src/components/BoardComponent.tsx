import { FC, Fragment, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent : FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
  const [selectedCell, setSelectedSell] = useState<Cell|null>(null);

  useEffect(() => {
      highlightCells()
  }, [selectedCell]);

  const click = (cell:Cell) => {
    if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
        selectedCell.moveFigure(cell);
        swapPlayer();
        setSelectedSell(null);
    } else {
        if(cell.figure?.color === currentPlayer?.color) {
            setSelectedSell(cell);
        }
    }
  }

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
      const newBoard = board.getCopyBoard();
      setBoard(newBoard);
  }

  return (
    <div>
        <h4>Current player: {currentPlayer?.color}</h4>
        <div className='board'>
            {board.cells.map((row, index) => 
                <Fragment key={index}>
                    {row.map(cell => 
                        <CellComponent
                            cell={cell}
                            key={cell.id}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            click={click}
                        />)}
                </Fragment>
            )}
        </div>
    </div>
  )
}

export default BoardComponent;