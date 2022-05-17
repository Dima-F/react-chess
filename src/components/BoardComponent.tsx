import { FC, Fragment, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent : FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedSell] = useState<Cell|null>(null);

  useEffect(() => {
      highlightCells()
  }, [selectedCell]);

  const click = (cell:Cell) => {
    if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
        selectedCell.moveFigure(cell);
        setSelectedSell(null);
    } else {
        setSelectedSell(cell);
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
  )
}

export default BoardComponent;