const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div
            key={index}
            className={`flex items-center space-x-2 ${
              stepNumber !== totalSteps ? "flex-1" : ""
            }`}
          >
            {/* Step Circle */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                isActive
                  ? "bg-primary"
                  : isCompleted
                  ? "bg-green-500 border-2 border-primary"
                  : "bg-gray-300"
              }`}
            >
              {isCompleted ? "" : stepNumber}
            </div>

            {stepNumber !== totalSteps && (
              <div
                className={`h-[2px] flex-1 ${
                  isCompleted ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
