import React, { useState } from "react";

const Home: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | string>("");

  const add = (numbers: string): number => {
    if (numbers.trim() === "") return 0;

    let delimiters: string[] = [",", "\n"];
    let numString = numbers;

    if (numbers.startsWith("//")) {
      const parts = numbers.split("\n", 2);
      const customDelimiter = parts[0].slice(2).trim();
      numString = parts[1];
      delimiters.push(customDelimiter);
    }

    const combinedDelimiter = new RegExp(
      delimiters
        .map((d) => d.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"))
        .join("|")
    );

    const numArray = numString
      .split(combinedDelimiter)
      .map((num) => num.trim())
      .filter((num) => num !== "");

    const numbersList = numArray.map((num) => {
      const parsedNum = Number(num);
      if (isNaN(parsedNum)) {
        throw new Error(`"${num}" is not a valid number`);
      }
      return parsedNum;
    });

    const negativeNumbers = numbersList.filter((n) => n < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(
        `Negative numbers are not allowed: ${negativeNumbers.join(",")}`
      );
    }

    return numbersList.reduce((acc, curr) => acc + curr, 0);
  };

  const calculateResult = () => {
    try {
      setResult(add(input));
    } catch (error: any) {
      setResult(error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-100">
      <h1 className="text-3xl font-bold mb-4 text-cyan-900 pb-20">
        Welcome to the String Calculator Mahesh Bairi Assignment
      </h1>
      <div className="p-8 bg-white shadow-md rounded-lg mb-20">
        <h1 className="text-2xl font-bold mb-8 text-center text-cyan-900">
          Mahesh Bairi String Calculator
        </h1>

        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Enter the values"
          className="w-full px-4 py-10 mb-4 border border-gray-300 rounded text-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none overflow-hidden"
          rows={4}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
            }
          }}
        />

        <button
          onClick={calculateResult}
          className="w-full bg-cyan-400 text-xl text-white px-4 py-2 rounded hover:bg-cyan-600 transition"
        >
          Calculate
        </button>

        <h2 className="mt-4 text-2xl font-bold text-cyan-900 text-center">
          Result: {result}
        </h2>
      </div>
    </div>
  );
};

export default Home;
