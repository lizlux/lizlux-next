"use client";

import { useEffect, useState } from "react";
import "./styles/sudoku.css";
import DifficultyToggle from "./components/DifficultyToggle";
import Link from "next/link";
import { DifficultyLevel, ValidNumber } from "./types/sudoku-types";
import { getHidden, getLines } from "./helpers/getSudokuGrid";
import GameTimer from "./components/GameTimer";
import SudokuContainer from "./components/SudokuContainer";
import WeatherWidget from "./components/WeatherWidget";

function Sudoku() {
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>(null);
  const [lines, setLines] = useState<ValidNumber[][] | null>(null);
  const [hiddenGrid, setHiddenGrid] = useState<boolean[][] | null>(null);
  const [selectedXY, setSelectedXY] = useState<ValidNumber[] | null>(null);
  const [successXY, setSuccessXY] = useState<ValidNumber[] | null>(null);
  const [failXY, setFailXY] = useState<ValidNumber[] | null>(null);

  const updateHiddenGrid = (grid: boolean[][], selected: ValidNumber[]) => {
    const gridCopy = [...grid];
    const rowToReplace = gridCopy[selected[0]];
    rowToReplace.splice(selected[1], 1, false);
    setHiddenGrid(gridCopy);
  };

  const checkIsComplete = (grid: boolean[][]) => {
    return grid?.every((row) => {
      return row.every((col) => {
        return col !== true;
      });
    });
  };

  const handleKeyDownSuccess = (grid: boolean[][], xy: ValidNumber[]) => {
    console.log("got it right!");
    updateHiddenGrid(grid, xy);
    setSuccessXY(xy);
    setSelectedXY(null);
    const isComplete = checkIsComplete(grid);
    if (isComplete) {
      setTimeout(() => alert("You did it! 🎉"), 0);
    }
  };

  const handleKeyDownFail = (selected: ValidNumber[]) => {
    console.log("got it wrong :(");
    setFailXY(selected);
  };

  useEffect(() => {
    if (difficultyLevel) {
      setLines(getLines());
      setHiddenGrid(getHidden(difficultyLevel));
    }
  }, [difficultyLevel]);

  useEffect(() => {
    if (!successXY) {
      return;
    }
    const timer = setTimeout(() => {
      setSuccessXY(null);
    }, 500);
    return () => clearTimeout(timer);
  }, [successXY]);

  useEffect(() => {
    if (!failXY) {
      return;
    }
    const timer = setTimeout(() => {
      setFailXY(null);
    }, 500);
    return () => clearTimeout(timer);
  }, [failXY]);

  useEffect(() => {
    const getSelectedValue = (): ValidNumber | null => {
      if (!selectedXY || !lines) {
        return null;
      }
      return lines[selectedXY[0]][selectedXY[1]];
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const code = Number(event.key);
      if (selectedXY && hiddenGrid && code && code === getSelectedValue()) {
        handleKeyDownSuccess(hiddenGrid, selectedXY);
      } else if (selectedXY) {
        handleKeyDownFail(selectedXY);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="App">
      <h1>Welcome to Sudoku</h1>
      <h2>Built with React</h2>
      {difficultyLevel && lines && hiddenGrid ? (
        <>
          <div className="sudoku-header">
            <Link
              href="/"
              className="back-button"
              role="button"
              onClick={(event) => {
                event.preventDefault();
                setDifficultyLevel(null);
              }}
            >
              Back
            </Link>
            <GameTimer enableTimer={true} />
          </div>
          <SudokuContainer
            lines={lines}
            hiddenGrid={hiddenGrid}
            selectedXY={selectedXY}
            setSelectedXY={setSelectedXY}
            successXY={successXY}
            failXY={failXY}
          />
        </>
      ) : (
        <DifficultyToggle
          setDifficultyLevel={setDifficultyLevel}
          difficultyLevel={difficultyLevel}
        />
      )}
      <WeatherWidget />
    </div>
  );
}

export default Sudoku;
