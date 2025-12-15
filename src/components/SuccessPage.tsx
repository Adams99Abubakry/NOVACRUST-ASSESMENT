import { useState } from "react";
import { Check, Copy, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function SuccessPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const transactionId = "NC123456789";

  const handleCopy = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl card-shadow p-8 text-center space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">◈</span>
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">NOVACRUST</span>
          </div>

          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center animate-check-bounce">
              <Check className="w-8 h-8 text-success-foreground stroke-[3]" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-foreground">
              Your transaction is processing.
            </h1>
            <p className="text-muted-foreground">
              The recipient will receive it shortly.
            </p>
          </div>

          {/* Transaction ID */}
          <div className="bg-secondary rounded-2xl p-4 flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Transaction ID</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
            >
              <span>{transactionId}</span>
              {copied ? (
                <CheckCheck className="w-4 h-4 text-success" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Go Back Link */}
          <button
            onClick={() => navigate("/")}
            className={cn(
              "text-primary font-semibold hover:underline underline-offset-4",
              "transition-all duration-200 hover:text-primary/80"
            )}
          >
            Go back to home
          </button>
        </div>
      </div>
    </div>
  );
}
