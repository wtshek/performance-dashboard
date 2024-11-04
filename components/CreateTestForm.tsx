"use client";

import { useState, FormEvent } from "react";

type CreateTestFormProps = {
  onTestComplete: (isFinished: boolean, testName?: string) => void;
};

export function CreateTestForm({ onTestComplete }: CreateTestFormProps) {
  const [url, setUrl] = useState("");
  const [testName, setTestName] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/run-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, testName }),
      });

      if (!response.ok) {
        throw new Error("Failed to run lighthouse test");
      }

      const data = await response.json();
      console.log("Lighthouse results:", data);

      // Clear form after successful submission
      setUrl("");
      setTestName("");
      onTestComplete(true, testName);
    } catch (error) {
      console.error("Error running lighthouse:", error);
      onTestComplete(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="url" className="block text-sm font-medium mb-1">
          URL to Test
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label htmlFor="testName" className="block text-sm font-medium mb-1">
          Test Name
        </label>
        <input
          id="testName"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-900"
          placeholder="Enter test name..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Submit Test
      </button>
    </form>
  );
}
