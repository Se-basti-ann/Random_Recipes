import React, { useState, useEffect } from 'react';
import { Recipe, TimerStep } from '../types';
import { Timer, Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

interface StepByStepModeProps {
  recipe: Recipe;
}

export const StepByStepMode: React.FC<StepByStepModeProps> = ({ recipe }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timers, setTimers] = useState<TimerStep[]>([]);

  useEffect(() => {
    // Parse time from instructions
    const newTimers = recipe.instructions.map(instruction => {
      const timeMatch = instruction.display_text.match(/(\d+)\s*(minute|min|minutes|mins?)/i);
      return {
        text: instruction.display_text,
        totalSeconds: timeMatch ? parseInt(timeMatch[1]) * 60 : 0,
        isRunning: false,
      };
    });
    setTimers(newTimers);
  }, [recipe]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev =>
        prev.map(timer => {
          if (timer.isRunning && timer.totalSeconds > 0) {
            return { ...timer, totalSeconds: timer.totalSeconds - 1 };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleTimer = (index: number) => {
    setTimers(prev =>
      prev.map((timer, i) =>
        i === index ? { ...timer, isRunning: !timer.isRunning } : timer
      )
    );
  };

  const resetTimer = (index: number) => {
    setTimers(prev =>
      prev.map((timer, i) =>
        i === index
          ? {
              ...timer,
              totalSeconds:
                parseInt(timer.text.match(/(\d+)\s*(?:minute|min|minutes|mins?)/i)?.[1] || '0') *
                60,
              isRunning: false,
            }
          : timer
      )
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Step-by-Step Instructions</h3>
      <div className="space-y-6">
        {recipe.instructions.map((instruction, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              currentStep === index ? 'bg-orange-50 border-2 border-orange-500' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="text-gray-700 mb-2">{instruction.display_text}</p>
                {timers[index].totalSeconds > 0 && (
                  <div className="flex items-center gap-4 mt-2">
                    <Timer className="text-orange-500" />
                    <span className="font-mono text-lg">
                      {formatTime(timers[index].totalSeconds)}
                    </span>
                    <button
                      onClick={() => toggleTimer(index)}
                      className="p-2 rounded-full hover:bg-gray-200"
                    >
                      {timers[index].isRunning ? (
                        <Pause className="text-gray-600" />
                      ) : (
                        <Play className="text-gray-600" />
                      )}
                    </button>
                    <button
                      onClick={() => resetTimer(index)}
                      className="p-2 rounded-full hover:bg-gray-200"
                    >
                      <RotateCcw className="text-gray-600" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous Step
        </button>
        <button
          onClick={() => setCurrentStep(prev => Math.min(recipe.instructions.length - 1, prev + 1))}
          disabled={currentStep === recipe.instructions.length - 1}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Next Step
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
};