import { useState } from "react";
import { TabSwitcher } from "./TabSwitcher";
import { AmountInput } from "./AmountInput";
import { WalletSelector } from "./WalletSelector";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const tabs = [
  { id: "crypto-cash", label: "Crypto to cash" },
  { id: "cash-crypto", label: "Cash to crypto" },
  { id: "crypto-loan", label: "Crypto to fiat loan" },
];

export function ConversionPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("crypto-cash");
  const [payAmount, setPayAmount] = useState("1.00");
  const [receiveAmount, setReceiveAmount] = useState("1.00");
  const [payCurrency, setPayCurrency] = useState("ETH");
  const [receiveCurrency, setReceiveCurrency] = useState("NGN");
  const [payFrom, setPayFrom] = useState("");
  const [payTo, setPayTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = () => {
    setIsLoading(true);
    // Simulate conversion
    setTimeout(() => {
      setIsLoading(false);
      navigate("/success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl card-shadow p-6 sm:p-8 space-y-6 animate-fade-in">
          {/* Tab Switcher */}
          <div className="flex justify-center">
            <TabSwitcher 
              tabs={tabs} 
              activeTab={activeTab} 
              onChange={setActiveTab} 
            />
          </div>

          {/* Amount Inputs */}
          <div className="space-y-4">
            <AmountInput
              label="You pay"
              value={payAmount}
              onChange={setPayAmount}
              currency={payCurrency}
              onCurrencyChange={(c) => setPayCurrency(c.code)}
            />
            
            <AmountInput
              label="You receive"
              value={receiveAmount}
              onChange={setReceiveAmount}
              currency={receiveCurrency}
              onCurrencyChange={(c) => setReceiveCurrency(c.code)}
            />
          </div>

          {/* Wallet Selectors */}
          <div className="space-y-4">
            <WalletSelector
              label="Pay from"
              value={payFrom}
              onChange={(w) => setPayFrom(w.id)}
            />
            
            <WalletSelector
              label="Pay to"
              value={payTo}
              onChange={(w) => setPayTo(w.id)}
            />
          </div>

          {/* Convert Button */}
          <Button 
            variant="pill" 
            size="full"
            onClick={handleConvert}
            disabled={isLoading || !payFrom || !payTo}
            className="mt-4"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Converting...
              </span>
            ) : (
              "Convert now"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
