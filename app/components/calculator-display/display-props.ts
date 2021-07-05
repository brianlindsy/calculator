export interface DisplayProps {
  displayValue?: string;
  clearLastChar: () => void;
  onChangeText: (text: string) => void;
}
