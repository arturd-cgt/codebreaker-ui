import React, { createContext, useContext, useState, ReactNode } from "react";

interface GameContextType {
  secretCodes: Record<string, number[]>;
  setSecretCode: (gameId: string, code: number[]) => void;
  getSecretCode: (gameId: string) => number[] | undefined;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [secretCodes, setSecretCodes] = useState<Record<string, number[]>>({});

  const setSecretCode = (gameId: string, code: number[]) => {
    setSecretCodes((prev) => ({
      ...prev,
      [gameId]: code
    }));
  };

  const getSecretCode = (gameId: string) => {
    return secretCodes[gameId];
  };

  return (
    <GameContext.Provider value={{ secretCodes, setSecretCode, getSecretCode }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within GameProvider");
  }
  return context;
};
