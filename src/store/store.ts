import { create } from "zustand";

// Types
type Player = "blue" | "red" | "green" | "yellow";

export type TokenState = {
  id: number;
  color: string;
  position: string;
  isFinished: boolean;
  isOutofHome: boolean;
  stepsMoved: number;
};

type TokenRouteType = {
  blue: string[];
  red: string[];
  green: string[];
  yellow: string[];
};

type GameStore = {
  Turn: Player;
  Tokens: TokenState[];
  NumberOnDice: number | null;
  hasrolled: boolean;
  tokenTouched: boolean;
  TokenRoute: TokenRouteType;
  gotkilled: boolean;
  istokenmoved: boolean;
  Rankings: string[];
  setistokenmoved: (boolean: boolean) => void;
  sethasRolled: () => void;
  rollDice: () => number;
  nextTurn: () => void;
  settokenTouched: () => void;
  initializeTokens: () => void;
  moveOutFromHome: (id: number, color: TokenState["color"]) => void;
  moveToken: (id: number, color: TokenState["color"]) => void;
  sendTokenHome: (id: number, color: TokenState["color"]) => void;
  restoreState: () => void;
  AddtoRank: (color: string) => void;
};

export const GameState = create<GameStore>((set, get) => ({
  Turn: "blue",
  Tokens: [],
  NumberOnDice: null,
  hasrolled: false,
  tokenTouched: false,
  gotkilled: false,
  istokenmoved: false,
  Rankings: [],
  TokenRoute: {
    blue: ["startblue", "b9", "b6", "b3", "b0", "r15", "r12", "r9", "starred", "r3", "r0", "arrowred", "r2", "startred", "r8", "r11", "r14", "r17", "g15", "g12", "g9", "stargreen", "g3", "g0", "arrowgreen", "g2", "startgreen", "g8", "g11", "g14", "g17", "y2", "y5", "staryellow", "y11", "y14", "y17", "arrowyellow", "y15", "startyellow", "y9", "y6", "y3", "y0", "b2", "b5", "b8", "starblue", "b14", "b17", "arrowblue", "b13", "b10", "b7", "b4", "b1", "finishb"],
    red: ["startred", "r8", "r11", "r14", "r17", "g15", "g12", "g9", "stargreen", "g3", "g0", "arrowgreen", "g2", "startgreen", "g8", "g11", "g14", "g17", "y2", "y5", "staryellow", "y11", "y14", "y17", "arrowyellow", "y15", "startyellow", "y9", "y6", "y3", "y0", "b2", "b5", "b8", "starblue", "b14", "b17", "arrowblue", "b15", "startblue", "b9", "b6", "b3", "b0", "r15", "r12", "r9", "starred", "r3", "r0", "arrowred", "r4", "r7", "r10", "r13", "r16", "finishr"],
    green: ["startgreen", "g8", "g11", "g14", "g17", "y2", "y5", "staryellow", "y11", "y14", "y17", "arrowyellow", "y15", "startyellow", "y9", "y6", "y3", "y0", "b2", "b5", "b8", "starblue", "b14", "b17", "arrowblue", "b15", "startblue", "b9", "b6", "b3", "b0", "r15", "r12", "r9", "starred", "r3", "r0", "arrowred", "r2", "startred", "r8", "r11", "r14", "r17", "g15", "g12", "g9", "stargreen", "g3", "g0", "arrowgreen", "g4", "g7", "g10", "g13", "g16", "finishg"],
    yellow: ["startyellow", "y9", "y6", "y3", "y0", "b2", "b5", "b8", "starblue", "b14", "b17", "arrowblue", "b15", "startblue", "b9", "b6", "b3", "b0", "r15", "r12", "r9", "starred", "r3", "r0", "arrowred", "r2", "startred", "r8", "r11", "r14", "r17", "g15", "g12", "g9", "stargreen", "g3", "g0", "arrowgreen", "g2", "startgreen", "g8", "g11", "g14", "g17", "y2", "y5", "staryellow", "y11", "y14", "y17", "arrowyellow", "y13", "y10", "y7", "y4", "y1", "finishy"],
  },

  initializeTokens: () => {
    const colors = ["blue", "red", "green", "yellow"];
    const Tokens = colors.flatMap((color) =>
      Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        color,
        position: `home`,
        isFinished: false,
        isOutofHome: false,
        stepsMoved: 0,
      }))
    );
    set({ Tokens, Turn: "blue" });
  },

  rollDice: () => {
    const value = Math.floor(Math.random() * 6) + 1;
    set({ NumberOnDice: value, istokenmoved: false });
    const StateToBeSaved = { NumberOnDice: value, PositionOfPlayers: get().Tokens, Turn: get().Turn };
    localStorage.setItem("ludo-game-state", JSON.stringify(StateToBeSaved));
    return value;
  },

  sethasRolled: () => {
    set((state) => ({ hasrolled: !state.hasrolled }));
  },

  settokenTouched: () => {
    set((state) => ({ tokenTouched: !state.tokenTouched }));
  },
  setistokenmoved: (Boolean) => {
    set({ istokenmoved: Boolean });
  },
  nextTurn: () => {
    const { gotkilled, Rankings, Turn, NumberOnDice, Tokens } = get();
  
    const order: Player[] = ["blue", "red", "green", "yellow"];
  
    // Filter out players who have completed the game
    const activePlayers = order.filter((player) => !Rankings.includes(player));
  
    // If all players are ranked, do nothing
    if (activePlayers.length === 0) return;
  
    const currentIndex = activePlayers.indexOf(Turn);
    let nextIndex = (currentIndex + 1) % activePlayers.length;
    const next = activePlayers[nextIndex];
  
    if (!gotkilled) {
      setTimeout(() => {
        set({
          Turn: next,
          hasrolled: false,
          istokenmoved: false,
        });
  
        const StateToBeSaved = {
          NumberOnDice,
          PositionOfPlayers: Tokens,
          Turn: next,
        };
  
        localStorage.setItem("ludo-game-state", JSON.stringify(StateToBeSaved));
      }, 1200);
    } else {
      // If gotkilled, keep the same player but reset kill state
      set({
        Turn,
        hasrolled: false,
        gotkilled: false,
      });
    }
  },
  
  AddtoRank: (color) => {
    get().Rankings
    set((state) => {
      if (!state.Rankings.includes(color)) {
        const newRankings = [...state.Rankings, color];
        console.log("Updated Rankings:", newRankings);
        return { Rankings: newRankings };
        
      }
      return {};
       // return empty object to avoid returning the same reference
    });
    
    // ✅ Save updated tokens too
    const StateToBeSaved = 
    localStorage.setItem("ludo-game-state", JSON.stringify(StateToBeSaved));
  },
  

  moveToken: (id, color) => {
    const { Tokens, NumberOnDice, Turn, TokenRoute, istokenmoved } = get();
    if (NumberOnDice == null || istokenmoved) return;
  
    const updatedTokens = Tokens.map((token) => {
      if (
        token.id === id &&
        token.color === color &&
        Turn === color &&
        token.isOutofHome
      ) {
        const path = TokenRoute[color as Player];
        const newStepsMoved = token.stepsMoved + NumberOnDice;
  
        if (newStepsMoved < 56) {
          const newPosition = path[newStepsMoved];
          return { ...token, stepsMoved: newStepsMoved, position: newPosition };
        } else if (newStepsMoved === 56) {
          return {
            ...token,
            stepsMoved: newStepsMoved,
            isFinished: true,
            position: `finish${color[0]}`,
          };
        }
      }
      return token;
    });
  
    set({ Tokens: updatedTokens });
  
    // ✅ Check using updated tokens
    const playerTokens = updatedTokens.filter((t) => t.color === color);
    const allFinished = playerTokens.every((t) => t.position?.includes("finish"));
    console.log(allFinished)
    if (allFinished && !get().Rankings.includes(color)) {
      get().AddtoRank(color);
    }
  
    // ✅ Save updated tokens too
    const StateToBeSaved = {
      NumberOnDice,
      PositionOfPlayers: updatedTokens,
      Turn,
      
    };
    localStorage.setItem("ludo-game-state", JSON.stringify(StateToBeSaved));
  }
,  

  sendTokenHome: (id, color) => {
    const { Tokens } = get();
    const updatedTokens = Tokens.map((t) => (t.id === id && t.color === color ? { ...t, position: "home", isOutofHome: false } : t));
    set({ Tokens: updatedTokens, gotkilled: true, istokenmoved: false });
  },

  moveOutFromHome: (id, color) => {
    const { Tokens, NumberOnDice, Turn } = get();
    if (NumberOnDice !== 6) return;

    const updatedTokens = Tokens.map((token) => {
      if (token.id === id && token.color === color && token.position === "home" && Turn === color) {
        return {
          ...token,
          position: `start${color}`,
          isOutofHome: true,
          stepsMoved: 0,
        };
      }
      return token;
    });

    set({ Tokens: updatedTokens });
    const StateToBeSaved = { NumberOnDice: NumberOnDice, PositionOfPlayers: Tokens };
    localStorage.setItem("ludo-game-state", JSON.stringify(StateToBeSaved));
  },
  restoreState: () => {
    const savedState = localStorage.getItem("ludo-game-state");
    if (savedState) {
      const parsed = JSON.parse(savedState);
      set({
        NumberOnDice: parsed.NumberOnDice,
        Tokens: parsed.PositionOfPlayers,
        Turn: parsed.Turn || get().Turn,
      });
    }
  },
}));
