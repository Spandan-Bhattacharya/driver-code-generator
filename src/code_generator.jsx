function basicDataType(dataType) {
  switch (dataType.datatype) {
    case "Integer":
      return "int";
    case "Double":
      return "double";
    case "Float":
      return "float";
    case "Boolean":
      return "bool";
    case "Long":
      return "long long";
    case "String":
      return "string";
    default:
      return "-1";
  }
}

function ArrayDataType(dataType) {
  return `vector<${basicDataType(dataType)}>`;
}
function cppReturnType(returnType) {
  if (returnType.type == "Basic") {
    return basicDataType(returnType);
  } else if (returnType.type == "Array") {
    return ArrayDataType(returnType);
  }
}

function makeVariable(params) {
  return `${cppReturnType(params)} ${params.name}`;
}
function generateClassSignature(functionName, returnType, ListOfParams) {
  let paramList = "";
  ListOfParams.forEach((params) => {
    paramList += `${makeVariable(params)}, `;
  });
  paramList = paramList.slice(0, -2);
  let code = `class Solution{
    public:
    ${cppReturnType(returnType)} ${functionName}(${paramList}){
        
    }
};\n\n`;
  // console.log(code);
  return code;
}

function addArray(datatype) {
  let obj = {
    name: `${datatype.name}_size`,
    type: "Basic",
    datatype: "Integer",
  };
  let code = "";
  code += addBasic(obj);
  code += `        ${makeVariable(datatype)};\n`;
  code += `        for(int i = 0; i < ${obj.name}; i++)
        {
            ${basicDataType(datatype)} tempvar;
            cin>>tempvar;
            ${datatype.name}.push_back(tempvar);
        }\n`;
  // console.log(code);
  return code;
}
function functionCallGenerator(functionName, ListOfParameters) {
  let code = "";
  code += `${functionName}(`;
  ListOfParameters.forEach((params) => {
    code += `${params.name}, `;
  });
  code = code.slice(0, -2);
  return code;
}

function addBasic(datatype) {
  let code = `        ${makeVariable(datatype)};\n`;
  code += `        cin >> ${datatype.name};\n`;
  // console.log(code);
  return code;
}
function addInputBlock(datatype) {
  if (datatype.type == "Basic") {
    return addBasic(datatype);
  } else if (datatype.type == "Array") {
    return addArray(datatype);
  }
}
function outputArray(datatype) {
  datatype.name = "ans";
  let code = `        int ${datatype.name}_size = ${datatype.name}.size();
        for(int i = 0; i < ${datatype.name}_size; i++)
        {
            cout<<ans[i];
            if(i < ${datatype.name}_size - 1)
            {
                cout<<' ';
            }
        }
        cout<<'\\n';\n`;
  return code;
}
function outputBasic(datatype) {
  datatype.name = "ans";
  let code = `        cout<<${datatype.name}<<'\\n';\n`;
  return code;
}
function addOutputBlock(datatype) {
  if (datatype.type == "Basic") {
    return outputBasic(datatype);
  } else if (datatype.type == "Array") {
    return outputArray(datatype);
  }
}
export function generateCppCode(returnTypeName, ListOfParameters, functionName) {
  // Start building the C++ class
  let cppCode = 
`#include <bits/stdc++.h>
using namespace std;\n\n`;

  // Declare the class
  cppCode += generateClassSignature(
    functionName,
    returnTypeName,
    ListOfParameters
  );

  // Main function
  cppCode += `int main(){
    int t;
    cin >> t;
    while (t--)
    {
        string testCase;
        cin >> testCase;
        cout << testCase << endl;
`;
  ListOfParameters.forEach((params) => {
    cppCode += addInputBlock(params);
  });
  cppCode += `        Solution s;
        ${cppReturnType(returnTypeName)} ans = s.${functionCallGenerator(functionName,ListOfParameters
  )});\n`;
  cppCode += addOutputBlock(returnTypeName);

  cppCode += `    }
    return 0;
}\n`;

  return cppCode;
}

// let returnTypeName = {
//   type: "Array",
//   datatype: "Integer",
// };
// let ListOfParameters = [
//     {   name:"nums",
//         type:"Array",
//         datatype:"Integer"
//     },
//     {   name:"k",
//         type:"Basic",
//         datatype:"Integer"
//     },
//     {   name:"nums2",
//         type:"Array",
//         datatype:"Long"
//     }
// ];
// let ListOfParameters = [{ name: "nums", type: "Array", datatype: "Integer" }];
// let functionName = "leaders";
//   generateClassSignature(functionName,returnTypeName,ListOfParameters);

// Example usage:
// let cppOutput = generateCppCode(returnTypeName, ListOfParameters, functionName);
// console.log(cppOutput);
