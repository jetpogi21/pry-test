"use client";
import { useData, useFormula } from "@/app/_hooks/dataStore";
import { evaluateExpression } from "@/app/lib/evaluateExpression";
import { formatWithComma } from "@/app/lib/formatWithComma";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

const extractFunctionText = (formulaItem: string) => {
  // Extracting the text between square brackets
  const extractedText = formulaItem.match(/\[(.*?)\]/)?.[1];

  return extractedText;
};

function splitStringIntoArrays(input: string): string[] {
  const result = [];
  let baseKey: string[] = [];
  for (const char of input) {
    if (char === "[" || baseKey[0] === "[") {
      baseKey.push(char);
      if (char === "]") {
        result.push(baseKey.join(""));
        baseKey = [];
      }
    } else {
      baseKey.push(char);
    }
  }

  if (baseKey.length) {
    result.push(baseKey.join(""));
  }

  return result;
}

const AccordionComponent = (props: { item: [string, Formula[string]] }) => {
  const formulaString = props.item[1];
  const data = useData((state) => state.data);
  const formulaValue = evaluateExpression(formulaString, data);
  const formulaArray = splitStringIntoArrays(formulaString);

  return (
    <div className="w-full border p-4">
      <Collapsible>
        <div className="flex gap-2 items-center">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-9 p-0"
            >
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
          <span>{props.item[0]}</span>
        </div>
        <div className="pl-11">{formatWithComma(formulaValue)}</div>
        <CollapsibleContent>
          <div className="pl-11 py-2">
            <div className="flex flex-wrap border rounded-sm p-2 gap-2">
              {formulaArray.map((formulaItem) => {
                const extractedKey = extractFunctionText(formulaItem);
                return extractedKey ? (
                  <div className="border p-2">
                    {extractFunctionText(formulaItem)}
                  </div>
                ) : (
                  <input
                    className="ring-0 focus:outline-none"
                    value={formulaItem}
                  />
                );
              })}
              {extractFunctionText(formulaArray[formulaArray.length - 1]) ? (
                <input className="ring-0 focus:outline-none" />
              ) : null}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

type Formula = Record<string, string>;

export const Home = () => {
  const data = useData((state) => state.data);
  const dataEntries = Object.entries(data);

  const formulas = useFormula((state) => state.formula);
  const formulaEntries = Object.entries(formulas);

  return (
    <div className="flex gap-2 w-full">
      <div className="flex flex-col gap-2 border border-border p-4">
        <div className="whitespace-nowrap">Available base data</div>
        {dataEntries.length > 0 ? (
          dataEntries.map((item) => {
            return (
              <div
                className="flex justify-between"
                key={item[0]}
              >
                <div>{item[0]}</div>
                <div>{formatWithComma(item[1])}</div>
              </div>
            );
          })
        ) : (
          <div>Currently there's no base data</div>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        {formulaEntries.length > 0 ? (
          <div className="flex flex-col gap-2 w-full">
            {formulaEntries.map((item) => {
              return (
                <AccordionComponent
                  item={item}
                  key={item[0]}
                />
              );
            })}
          </div>
        ) : (
          <div>Currently there's no formula</div>
        )}
      </div>
    </div>
  );
};
