import { useEffect, useState } from "react";
import { ValidNumber } from "../types/sudoku-types";

export function useKeyDownSquare(lines: ValidNumber[][] | null) {
  const [hiddenGrid, setHiddenGrid] = useState<boolean[][] | null>(null);
  const [selectedXY, setSelectedXY] = useState<ValidNumber[] | null>(null);
  const [successXY, setSuccessXY] = useState<ValidNumber[] | null>(null);
  const [failXY, setFailXY] = useState<ValidNumber[] | null>(null);

  useEffect(() => {
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
  }, []);

  return { hiddenGrid, selectedXY, successXY, failXY };
}
