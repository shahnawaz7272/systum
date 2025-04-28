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
  gotkilled:boolean
  sethasRolled: () => void;
  rollDice: () => number;
  nextTurn: () => void;
  settokenTouched: () => void;
  initializeTokens: () => void;
  moveOutFromHome: (id: number, color: TokenState["color"]) => void;
  moveToken: (id: number, color: TokenState["color"]) => void;
  sendTokenHome: (id: number, color: TokenState["color"]) => void;
  restoreState: () => void;

};

export const GameState = create<GameStore>((set, get) => ({
  Turn: "blue",
  Tokens: [],
  NumberOnDice: null,
  hasrolled: false,
  tokenTouched: false,
  gotkilled:false,

  TokenRoute: {
    blue: ["startblue","b9","b6","b3","b0","r15","r12","r9","starred","r3","r0","arrowred","r2","startred","r8","r11","r14","r17","g15","g12","g9","stargreen","g3","g0","arrowgreen","g2","startgreen","g8","g11","g14","g17","y2","y5","staryellow","y11","y14","y17","arrowyellow","y15","startyellow","y9","y6","y3","y0","b2","b5","b8","starblue","b14","b17","arrowblue","b13","b10","b7","b4","b1","finishb"],
    red: ["startred","r8","r11","r14","r17","g15","g12","g9","stargreen","g3","g0","arrowgreen","g2","startgreen","g8","g11","g14","g17","y2","y5","staryellow","y11","y14","y17","arrowyellow","y15","startyellow","y9","y6","y3","y0","b2","b5","b8","starblue","b14","b17","arrowblue","b15","startblue","b9","b6","b3","b0","r15","r12","r9","starred","r3","r0","arrowred","r4","r7","r10","r13","r16","finishr"],
    green: ["startgreen","g8","g11","g14","g17","y2","y5","staryellow","y11","y14","y17","arrowyellow","y15","startyellow","y9","y6","y3","y0","b2","b5","b8","starblue","b14","b17","arrowblue","b15","startblue","b9","b6","b3","b0","r15","r12","r9","starred","r3","r0","arrowred","r2","startred","r8","r11","r14","r17","g15","g12","g9","stargreen","g3","g0","arrowgreen","g4","g7","g10","g13","g16","finishg"],
    yellow: ["startyellow","y9","y6","y3","y0","b2","b5","b8","starblue","b14","b17","arrowblue","b15","startblue","b9","b6","b3","b0","r15","r12","r9","starred","r3","r0","arrowred","r2","startred","r8","r11","r14","r17","g15","g12","g9","stargreen","g3","g0","arrowgreen","g2","startgreen","g8","g11","g14","g17","y2","y5","staryellow","y11","y14","y17","arrowyellow","y13","y10","y7","y4","y1","finishy"],
  },

  initializeTokens: () => {
    const colors = ["red", "green", "yellow", "blue"];
    const Tokens = colors.flatMap((color) =>
      Array.from({ length: 4 }).map((_, i) => ({
        
        id: i,
        color,
        position: `home`,
        isFinished: false,
        isOutofHome: false,
        stepsMoved: 0
      }))
    );
    set({ Tokens , Turn:"blue"});
  },

  rollDice: () => {
    const value = Math.floor(Math.random() * 6) + 1;
    set({ NumberOnDice: value });
    const StateToBeSaved = {NumberOnDice:value,PositionOfPlayers:get().Tokens,Turn:get().Turn}
    localStorage.setItem('ludo-game-state', JSON.stringify(StateToBeSaved))
    return value;
  },

  sethasRolled: () => {
    set(state => ({ hasrolled: !state.hasrolled }));
  },

  settokenTouched: () => {
    set(state => ({ tokenTouched: !state.tokenTouched }));
  },

  nextTurn: () => {
    const { gotkilled  } = get();
    const order: Player[] = ["blue", "red", "green", "yellow"];
    const currentTurn = get().Turn;
    if(!gotkilled){
      const next = order[(order.indexOf(currentTurn) + 1) % order.length];
    setTimeout(() => {
    set({ Turn: next, hasrolled: false });
    const StateToBeSaved = {NumberOnDice:get().NumberOnDice,PositionOfPlayers:get().Tokens,Turn:next}
    localStorage.setItem('ludo-game-state', JSON.stringify(StateToBeSaved))
    }, 1200);
    }else{
    set({ Turn: currentTurn, hasrolled: false , gotkilled:false });

    }
    
  },

  moveToken: (id, color) => {
    const { Tokens, NumberOnDice, Turn, TokenRoute } = get();
    if (NumberOnDice == null) return;

    const updatedTokens = Tokens.map((token) => {
      if (
        token.id === id &&
        token.color === color &&
        Turn === color &&
        token.isOutofHome
      ) {
        const path = TokenRoute[color as Player];
        const newStepsMoved = token.stepsMoved + NumberOnDice ;

        if (newStepsMoved < 56) {
          const newPosition = path[newStepsMoved];
          return { ...token, stepsMoved: newStepsMoved, position: newPosition };

        } else if (newStepsMoved === 56) {
          return {
            ...token,
            stepsMoved: newStepsMoved,
            isFinished: true,
            position: `finish${color[0]}` // finishb, finishr, etc.
          };
        } else {
          return token;
        }
      }
      return token;
    });

    set({ Tokens: updatedTokens });
    const StateToBeSaved = {NumberOnDice:NumberOnDice,PositionOfPlayers:Tokens ,Turn:Turn}
    localStorage.setItem('ludo-game-state', JSON.stringify(StateToBeSaved))
  },

  sendTokenHome: (id, color) => {
    
    const { Tokens  } = get();
    const updatedTokens = Tokens.map(t =>
      t.id === id && t.color === color
        ? { ...t, position: "home", isOutofHome: false }
        : t
    );
    set({ Tokens: updatedTokens ,gotkilled:true});
  },

  moveOutFromHome: (id, color) => {
    const { Tokens, NumberOnDice, Turn } = get();
    if (NumberOnDice !== 6) return;

    const updatedTokens = Tokens.map((token) => {
      if (
        token.id === id &&
        token.color === color &&
        token.position === "home" &&
        Turn === color
      ) {
        return {
          ...token,
          position: `start${color}`,
          isOutofHome: true,
          stepsMoved: 0
        };
      }
      return token;
    });

    set({ Tokens: updatedTokens });
    const StateToBeSaved = {NumberOnDice:NumberOnDice,PositionOfPlayers:Tokens}
    localStorage.setItem('ludo-game-state', JSON.stringify(StateToBeSaved))
  },
  restoreState: () => {
    const savedState = localStorage.getItem('ludo-game-state');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      set({
        NumberOnDice: parsed.NumberOnDice ,
        Tokens: parsed.PositionOfPlayers ,
        Turn:parsed.Turn || get().Turn
      });
    } 
  }
}));
