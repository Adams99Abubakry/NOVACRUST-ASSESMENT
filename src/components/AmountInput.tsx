import { CurrencySelector } from "./CurrencySelector";

interface AmountInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency: string;
  onCurrencyChange: (currency: { code: string }) => void;
  readOnly?: boolean;
}

export function AmountInput({ 
  label, 
  value, 
  onChange, 
  currency, 
  onCurrencyChange,
  readOnly = false 
}: AmountInputProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <label className="text-sm text-muted-foreground mb-1 block">{label}</label>
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*\.?\d*$/.test(val)) {
                onChange(val);
              }
            }}
            readOnly={readOnly}
            className="w-full text-3xl font-semibold bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
            placeholder="0.00"
          />
        </div>
        <CurrencySelector 
          value={currency} 
          onChange={onCurrencyChange}
        />
      </div>
    </div>
  );
}
