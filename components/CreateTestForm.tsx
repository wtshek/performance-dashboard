"use client";

import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

type CreateTestFormProps = {
  onTestComplete: (isFinished: boolean, testName?: string) => void;
};

export function CreateTestForm({ onTestComplete }: CreateTestFormProps) {
  const [url, setUrl] = useState("");
  const [testName, setTestName] = useState("");
  const [testNumber, setTestNumber] = useState(5);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch("/api/lighthouse-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, testName, testNumber, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to run lighthouse test");
      }

      // Clear form after successful submission
      setUrl("");
      setTestName("");
      setDescription("");
      onTestComplete(true, testName);
      setIsLoading(false);
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
        <Input
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
        <Input
          id="testName"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-900"
          placeholder="Enter test name..."
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-900"
          placeholder="Enter description of the test..."
        />
      </div>

      <div>
        <label htmlFor="testNumber" className="block text-sm font-medium mb-1">
          Number of tests to run
        </label>
        <Input
          id="testNumber"
          value={testNumber}
          onChange={(e) => setTestNumber(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-900"
          placeholder="Enter test name..."
          type="number"
          max={20}
        />
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className={`w-full ${
          isLoading ? "bg-blue-300" : "bg-blue-500"
        } text-white py-2 px-4 rounded-md hover:bg-blue-600 flex justify-center items-center`}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : " Submit Test"}
      </button>
    </form>
  );
}
