import { useState, useRef, useEffect } from "react";
import { ChevronDown, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const wallets: WalletOption[] = [
  { id: "metamask", name: "Metamask", icon: "🦊", color: "#F6851B" },
  { id: "rainbow", name: "Rainbow", icon: "🌈", color: "#001E59" },
  { id: "walletconnect", name: "WalletConnect", icon: "🔗", color: "#3B99FC" },
  { id: "other", name: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)", icon: "💳", color: "#8B5CF6" },
];

interface WalletSelectorProps {
  value: string;
  onChange: (wallet: WalletOption) => void;
  label: string;
}

export function WalletSelector({ value, onChange, label }: WalletSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selected = wallets.find(w => w.id === value);

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
    <div className="space-y-2" ref={dropdownRef}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between px-4 py-4 rounded-2xl border border-border bg-card",
            "hover:bg-accent/50 transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
        >
          <span className={cn(
            "text-base",
            selected ? "text-foreground font-medium" : "text-muted-foreground"
          )}>
            {selected ? selected.name : "Select an option"}
          </span>
          <ChevronDown className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </button>
        
        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-card rounded-xl border border-border dropdown-shadow z-50 animate-scale-in overflow-hidden">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                type="button"
                onClick={() => {
                  onChange(wallet);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 hover:bg-accent transition-colors text-left",
                  value === wallet.id && "bg-accent"
                )}
              >
                <span className="text-xl">{wallet.icon}</span>
                <span className="font-medium text-sm">{wallet.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
