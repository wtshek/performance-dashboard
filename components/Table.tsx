import React from "react";
import {
  Table as T,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TableData } from "@/lib/type";

type TableProps = {
  data: { [key: string]: TableData };
  onShowButtonClick: (id: string, checked: boolean) => void;
  onDeleteButtonClick: (id: string) => void;
};

export const Table: React.FC<TableProps> = ({
  data,
  onShowButtonClick,
  onDeleteButtonClick,
}) => {
  return (
    <T>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Test Name</TableHead>
          <TableHead>Number of Test Run</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Average LCP</TableHead>
          <TableHead>Average TBT</TableHead>
          <TableHead>Average CLS</TableHead>
          <TableHead className="text-center">Display in the Chart</TableHead>
          <TableHead className="text-center">Delete Test</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(data).map(([name, item]) => {
          const { count, average, description } = item;
          return (
            <TableRow key={name}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell className="text-center">{count}</TableCell>
              <TableCell className="text-center">{description}</TableCell>
              <TableCell className="text-center">
                {average.lcp.toFixed(2)}ms
              </TableCell>
              <TableCell className="text-center">
                {average.tbt.toFixed(2)}ms
              </TableCell>
              <TableCell className="text-center">
                {average.cls.toFixed(2)}s
              </TableCell>
              <TableCell className="text-center">
                <Checkbox
                  className="border-white"
                  onCheckedChange={(checked) =>
                    onShowButtonClick(name, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => onDeleteButtonClick(name)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </T>
  );
};
