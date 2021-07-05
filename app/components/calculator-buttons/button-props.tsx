export interface ButtonProps {
    clearAll: () => void;
    inputDot: () => void;
    inputDigit: (digit: string) => void;
    inputOperator: (opererator: string) => void;
    inputPercent: () => void;
    inputParenthesis: (parenthesis: string) => void;
    performOperation: (nextOperator: string) => void;
}
  