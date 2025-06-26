import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const subscription = localStorage.getItem("subscription");
      if (subscription) {
        const subData = JSON.parse(subscription);
        const endDate = new Date(subData.endDate);
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setSelectedPlan(subData.planId);
        setIsSubscribed(true);
        setDaysRemaining(Math.max(0, diffDays));
      } else {
        // Reset if no subscription found
        setSelectedPlan(null);
        setIsSubscribed(false);
        setDaysRemaining(0);
      }
    }
  }, [isOpen]);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = () => {
    if (!selectedPlan) return;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const subscription = {
      planId: selectedPlan,
      endDate: endDate.toISOString(),
    };
    localStorage.setItem("subscription", JSON.stringify(subscription));
    setIsSubscribed(true);
    setDaysRemaining(30);
  };

  const getPlanName = (planId: string) =>
    planId.charAt(0).toUpperCase() + planId.slice(1);

  const getPlanDescription = (planId: string) => {
    switch (planId) {
      case "mobile":
        return "Access limited to mobile devices";
      case "basic":
        return "Basic quality on 1 screen";
      case "standard":
        return "HD on 2 screens";
      case "premium":
        return "4K UHD on 4 screens + no ads";
      default:
        return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0f1117] text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isSubscribed
              ? `Subscription Active - ${daysRemaining} Day${daysRemaining !== 1 ? "s" : ""} Left`
              : "Choose Your Plan"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isSubscribed
              ? `You have access to the ${getPlanName(selectedPlan || "")} plan.`
              : "Select one of the plans below to activate your subscription."}
          </DialogDescription>
        </DialogHeader>

        {!isSubscribed ? (
          <div className="grid gap-4 mt-4">
            {["mobile", "basic", "standard", "premium"].map((plan) => (
              <div
                key={plan}
                onClick={() => handlePlanSelect(plan)}
                className={`cursor-pointer rounded-lg border p-4 transition-all ${
                  selectedPlan === plan
                    ? "border-green-500 bg-green-500/10"
                    : "border-gray-600 hover:border-gray-400"
                }`}
              >
                <h3 className="text-lg font-semibold">{getPlanName(plan)}</h3>
                <p className="text-sm text-gray-400">{getPlanDescription(plan)}</p>
              </div>
            ))}

            <Button
              onClick={handleSubscribe}
              disabled={!selectedPlan}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white"
            >
              Subscribe to {selectedPlan ? getPlanName(selectedPlan) : "a plan"}
            </Button>
          </div>
        ) : (
          <div className="text-center mt-6">
            <div className="text-lg">🎉 You’re on the free trial {getPlanName(selectedPlan || "")} plan!</div>
            <p className="text-sm text-gray-400 mt-1">
              Enjoy your access for the next {daysRemaining} day{daysRemaining !== 1 ? "s" : ""}.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
