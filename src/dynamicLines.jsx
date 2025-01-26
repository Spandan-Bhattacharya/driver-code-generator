import React, { useState } from "react";
import { generateCppCode } from "./code_generator";
const DynamicLines = () => {
  const [lines, setLines] = useState([]);
  const [permanentInputs, setPermanentInputs] = useState({
    input1: "",
    input21: "",
    input22: "",
  });
  const [cppCode, setCppCode] = useState("");
  // Add a new line with empty fields
  const addLine = () => {
    setLines([...lines, { field1: "", field2: "", field3: "" }]);
  };

  // Handle changes for individual fields in dynamic lines
  const handleFieldChange = (index, field, value) => {
    const updatedLines = lines.map((line, i) => {
      if (i === index) {
        return { ...line, [field]: value };
      }
      return line;
    });
    setLines(updatedLines);
  };

  // Handle changes for permanent inputs
  const handlePermanentInputChange = (field, value) => {
    setPermanentInputs({ ...permanentInputs, [field]: value });
  };
  const createObjectsFromLines = (lines) => {
    return lines.map((line) => ({
      name: line.field1 || "",
      type: line.field2 || "",
      datatype: line.field3 || "",
    }));
  };
  // Handle submit
  const handleSubmit = () => {
    // console.log("Permanent Inputs:", permanentInputs);
    let ListOfParameters = createObjectsFromLines(lines);
    let functionName = permanentInputs.input1 || "";
    let returnTypeName =
      { type: permanentInputs.input21, datatype: permanentInputs.input22 } ||
      "";
    // console.log("Dynamic Lines:", lines);
    // console.log(ListOfParameters);
    // console.log(functionName);
    // console.log(returnTypeName);
    let code = generateCppCode(returnTypeName, ListOfParameters, functionName);
    setCppCode(code);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Driver Code Generator</h1>
      <div className="mb-4">
        <label>FunctionName: </label>
        <input
          type="text"
          placeholder="testFunction"
          value={permanentInputs.input1}
          onChange={(e) => handlePermanentInputChange("input1", e.target.value)}
          className="border p-2 rounded-md mr-4"
        />
      </div>
      <div className="mb-4">
        <label>Return Type: </label>
        <select
          placeholder="Permanent Field 21"
          value={permanentInputs.input21}
          onChange={(e) =>
            handlePermanentInputChange("input21", e.target.value)
          }
          className="border p-2 rounded-md mr-4"
        >
          <option value="">Select...</option>
          <option value="Basic">Primitive</option>
          <option value="Array">Array</option>
        </select>
        <label>Data Type: </label>
        <select
          placeholder="Permanent Field 22"
          value={permanentInputs.input22}
          onChange={(e) =>
            handlePermanentInputChange("input22", e.target.value)
          }
          className="border p-2 rounded-md mr-4"
        >
          <option value="">Select...</option>
          <option value="Integer">Integer</option>
          <option value="Boolean">Boolean</option>
          <option value="Float">Float</option>
          <option value="Double">Double</option>
          <option value="Long">Long Long</option>
          <option value="String">String</option>
        </select>
      </div>
      {lines.map((line, index) => (
        <div key={index} className="flex gap-4 mb-2">
          <label>Parameter Name: </label>
          <input
            type="text"
            placeholder="nums"
            value={line.field1}
            onChange={(e) => handleFieldChange(index, "field1", e.target.value)}
            className="border p-2 rounded-md flex-1"
          />
          <label>Type: </label>
          <select
            value={line.field2}
            onChange={(e) => handleFieldChange(index, "field2", e.target.value)}
            className="border p-2 rounded-md flex-1"
          >
            <option value="">Select...</option>
            <option value="Basic">Primitive</option>
            <option value="Array">Array</option>
          </select>
          <label>Data Type: </label>
          <select
            value={line.field3}
            onChange={(e) => handleFieldChange(index, "field3", e.target.value)}
            className="border p-2 rounded-md flex-1"
          >
            <option value="">Select...</option>
            <option value="Integer">Integer</option>
            <option value="Boolean">Boolean</option>
            <option value="Float">Float</option>
            <option value="Double">Double</option>
            <option value="Long">Long Long</option>
            <option value="String">String</option>
          </select>
        </div>
      ))}
      <div className="mt-4 flex gap-4 justify-center">
        <button
          onClick={addLine}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Parameter
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </div>
      <div className="mb-4 mt-5">
        <textarea className="border-2 h-auto min-h-100" cols={100} value={cppCode} onChange={(v)=>setCppCode(v.value)}/>
      </div>
    </div>
  );
};

export default DynamicLines;
