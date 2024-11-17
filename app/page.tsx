"use client";

import { Dashboard } from "@/components/Dashboard";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateTestForm } from "@/components/CreateTestForm";
import { TableData, Test } from "@/lib/type";
import { generateRandomColor } from "@/lib/utils";
import { Table } from "@/components/Table";

export default function PerformanceDashboardPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [shouldReload, setShouldReload] = useState(false);
  const [tableData, setTableData] = useState<{ [key: string]: TableData }>({});

  const onSelectChange = async (value: string, checked: boolean) => {
    if (!checked) {
      setTests(tests.filter((test) => test.id !== value));
      return;
    }

    const res = await fetch(`/api/lighthouse-test/${value.replace(" ", "+")}`);
    const json = await res.json();

    setTests([
      ...tests,
      {
        id: value,
        fetched: true,
        testResult: json,
        chartColor: generateRandomColor(),
      },
    ]);
  };

  const onDeleteButtonClick = async (id: string) => {
    await fetch(`/api/lighthouse-test/${id.replace(" ", "+")}`, {
      method: "DELETE",
    });
    setTests(tests.filter((test) => test.id !== id));
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch("/api/lighthouse-test", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch test options");
        }
        const json = await res.json();
        setTableData(json);
      } catch (e) {
        console.error("Error fetching test options:", e);
      }
    };

    fetchOptions();
  }, [shouldReload]);

  return (
    <div className="bg-black min-w-screen min-h-screen flex flex-col items-center py-16 text-white">
      <h1 className="text-white text-3xl font-black mb-8">
        Lighthouse Tests Visualization
      </h1>
      <div className="max-w-[1200px]">
        <Table
          data={tableData}
          onShowButtonClick={onSelectChange}
          onDeleteButtonClick={onDeleteButtonClick}
        />
        <div className="my-16">
          <Dashboard data={tests} />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Test</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Create A New Test</DialogHeader>
            <CreateTestForm
              onTestComplete={() => {
                setShouldReload(true);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
