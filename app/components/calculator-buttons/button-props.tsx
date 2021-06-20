export interface ButtonProps {
    clearAll: () => void;
    inputPercent: () => void;
    inputDot: () => void;
    inputDigit: (digit: string) => void;
    performOperation: (nextOperator: string) => void;
}
  