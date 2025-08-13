import { useState } from "react";
import { Analytics } from '@vercel/analytics/react';
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [goalReached, setGoalReached] = useState(false);
  const [resetCountUi, setResetCountUi] = useState(false);
  const [goal, setGoal] = useState(0);
  const [goalUi, setGoalUi] = useState(false);
  const [goalInput, setGoalInput] = useState(0);

  function increment() {
    setCount(prevCount => prevCount + 1);
    if (goal > 0 && (count + 1) === goal) {
      setGoalReached(true);
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    };
  }

  function TogglePermissionBox(bool) {
    setResetCountUi(bool);
  }

  function reset() {
    setCount(0);
    setGoalInput(0);
    setGoal(0);
    setResetCountUi(false);
    setGoalReached(false);
  }

  function ToggleGoalUi(bool) {
    if (bool) setGoalInput(goal || 0);
    setGoalUi(bool);
  }

  function saveGoal() {
    setGoal(goalInput);
    setCount(0);
    setGoalUi(false);
    setGoalReached(false);
  }

  return (
    <>
      <header className="text-white text-3xl text-center py-2 border-b border-white/10">
        <span>Tasbeeh Counter</span>
      </header>
      <div className="h-[90dvh] flex flex-col items-center justify-center">
        <div className="flex items-center justify-center flex-col bg-white/10 rounded-lg border-white/10 w-[90vw] md:w-[40vw] py-6 md:py-10">
          {/* Reset Ui */}
          <div
            className={`absolute bg-[#3A1D5E] border border-[#FFD93D]/60 text-white px-4 max-w-[80vw] md:max-w-[30vw] min-h-[25dvh] md:flex md:flex-col justify-around space-y-6 py-6 rounded-xl shadow-lg shadow-[#FFD93D]/20 transition-all ${
              resetCountUi
                ? "opacity-100 scale-100"
                : "opacity-0 scale-70 pointer-events-none"
            }`}
          >
            <h2 className="text-xl text-center font-semibold">
              Are you sure you want to reset the count to 0?
            </h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-2 text-lg font-medium bg-[#FFD93D] text-[#3A1D5E] rounded-lg hover:bg-[#f5c532] active:bg-[#e6b82f] transition cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => TogglePermissionBox(false)}
                className="px-6 py-2 text-lg font-medium bg-[#B22234] text-white rounded-lg hover:bg-[#8b1a28] active:bg-[#70151f] transition cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
          {/* Goal ui */}
          <div
            className={`absolute bg-[#3A1D5E] border border-[#FFD93D]/60 text-white px-6 max-w-[90vw] md:max-w-[35vw] md:flex md:flex-col justify-around min-h-[30dvh] space-y-6 py-6 rounded-xl shadow-lg shadow-[#FFD93D]/20 transition-all duration-300 ${
              goalUi
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90 pointer-events-none"
            }`}
          >
            <h2 className="text-2xl text-center font-semibold text-[#FFD93D]">
              Set Your Goal
            </h2>

            {/* Input Field */}
            <input
              type="number"
              min="1"
              value={goalInput || ""}
              placeholder="Enter target count"
              className="w-full px-4 py-2 rounded-lg text-lg text-[#FFD93D] bg-white/10 border border-[#FFD93D]/40 placeholder-[#FFD93D]/50 focus:outline-none focus:border-[#FFD93D] focus:ring-2 focus:ring-[#FFD93D]/30"
              onChange={(e) => setGoalInput(Number(e.target.value))}
            />

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={saveGoal}
                className="px-6 py-2 text-lg font-medium bg-[#FFD93D] text-[#3A1D5E] rounded-lg hover:bg-[#f5c532] active:bg-[#e6b82f] transition cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => ToggleGoalUi(false)}
                className="px-6 py-2 text-lg font-medium bg-[#B22234] text-white rounded-lg hover:bg-[#8b1a28] active:bg-[#70151f] transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="pb-4 flex gap-2 items-center">
            <h2 className="text-white/60 font-medium text-2xl">Count: </h2>
            <p className="text-white/90 font-semibold text-4xl text-center">
              {count}
              {goal > 0 && (
                <span className="text-white/60 text-2xl">/{goal}</span>
              )}
            </p>
          </div>
          <div className="flex items-center justify-center flex-col gap-3 md:gap-6">
            <button
              onClick={increment}
              disabled={goalReached}
              className="size-36 rounded-full flex items-center justify-center bg-[#6A0DAD] text-6xl text-[#FFD93D] active:bg-[#530a88] leading-normal cursor-pointer"
            >
              <span className="h-fit">+</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => TogglePermissionBox(true)}
                className="bg-[#B22234] active:bg-red-700 px-4 py-1 rounded-md text-xl font-semibold text-white cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => ToggleGoalUi(true)}
                className="bg-green-600 active:bg-green-700 px-4 py-1 rounded-md text-xl font-semibold text-white cursor-pointer"
              >
                Set Goal
              </button>
            </div>
          </div>
        </div>
      </div>
      <Analytics />
    </>
  );
}

export default App;
