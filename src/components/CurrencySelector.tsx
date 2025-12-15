import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Currency {
  code: string;
  name: string;
  icon: string;
  color: string;
}

const currencies: Currency[] = [
  { code: "ETH", name: "Ethereum", icon: "◆", color: "#627EEA" },
  { code: "NGN", name: "Nigerian Naira", icon: "₦", color: "#008751" },
  { code: "USDT - CELO", name: "USDT on Celo", icon: "₮", color: "#FCCE4B" },
  { code: "USDT - TON", name: "USDT on TON", icon: "◇", color: "#0088CC" },
  { code: "USDT - BNB", name: "USDT on BNB", icon: "◈", color: "#F3BA2F" },
];

interface CurrencySelectorProps {
  value: string;
  onChange: (currency: Currency) => void;
  label?: string;
}

export function CurrencySelector({ value, onChange, label }: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selected = currencies.find(c => c.code === value) || currencies[0];
  
  const filteredCurrencies = currencies.filter(c => 
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-card",
          "hover:bg-accent transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
      >
        <span 
          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: selected.color, color: 'white' }}
        >
          {selected.icon}
        </span>
        <span className="font-medium text-sm">{selected.code}</span>
        <ChevronDown className={cn(
          "w-4 h-4 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-card rounded-xl border border-border dropdown-shadow z-50 animate-scale-in overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCurrencies.map((currency) => (
              <button
                key={currency.code}
                type="button"
                onClick={() => {
                  onChange(currency);
                  setIsOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors",
                  value === currency.code && "bg-accent"
                )}
              >
                <span 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: currency.color, color: 'white' }}
                >
                  {currency.icon}
                </span>
                <span className="font-medium">{currency.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
