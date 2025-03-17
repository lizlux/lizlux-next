import { useEffect, useState } from "react";
import { DifficultyLevel } from "../types/sudoku-types";

export function useSudokuAPI({ difficulty }: { difficulty: DifficultyLevel }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!difficulty) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      fetch(`/api/sudoko?d=${difficulty}`)
        .then(async (resp) => {
          if (!resp.ok) {
            throw new Error(`HTTP Error! status ${resp.status}`);
          }
          const data = await resp.json();
          setData(data);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    };

    fetchData();
  }, [difficulty]);

  return [data.lines, data.hidden, loading, error];
}
