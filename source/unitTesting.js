import { testTests } from "./unitTesting.test.js";
import { utilitiesTests } from "./utilities.test.js";

let testsRan = 0;
let testsFailed = 0;

const testsToRun = [
  { tests: testTests, name: "test tests" },
  { tests: utilitiesTests, name: "utilities tests" },
];

export function is(receivedValue, expectedValue) {
  testsRan++;

  if (receivedValue === expectedValue) {
    console.log(
      `\t\texpected ${expectedValue}, received ${receivedValue} - OK 🟢`
    );
    return true;
  }
  console.log(
    `\t\texpected ${expectedValue}, received ${receivedValue} - NOK ❌`
  );
  testsFailed++;
  return false;
}

export function are(valuesToTest, expectedValue) {
  let result = true;

  valuesToTest.forEach((element) => {
    if (!is(element, expectedValue)) {
      result = false;
    }
  });

  return result;
}

export function areOutputs(valuesToTest, functionToTest, expectedValue) {
  valuesToTest.forEach((element) => {
    const optionalQuote = typeof element === "string" ? '"' : "";

    console.log(
      `\t\texpect ${functionToTest.name}(${optionalQuote}${element}${optionalQuote}) to be ${expectedValue}`
    );
    is(functionToTest(element), expectedValue);
  });
}

export function throws(functionToTest) {
  testsRan++;

  try {
    functionToTest();
  } catch (error) {
    console.log(`\t\tdid throw error - OK 🟢`);
    return true;
  }
  console.log(`\t\tdid not throw error - NOK ❌`);
  testsFailed++;
  return false;
}

export function doesNotThrow(functionToTest) {
  testsRan++;

  try {
    functionToTest();
  } catch (error) {
    console.log(`\t\tdid throw error - NOK ❌`);
    testsFailed++;
    return false;
  }
  console.log(`\t\tdid not throw error - OK 🟢`);
  return true;
}

function runTests() {
  testsToRun.forEach((testSuite) => {
    console.log(`running ${testSuite.name}`);
    testSuite.tests.forEach((test) => {
      console.log(`\trunning ${test.name}...`);
      test();
      console.log(`\t${test.name} completed`);
    });
  });
  console.log(`total tests ran: ${testsRan}`);
  console.log(`tests failed: ${testsFailed}`);
}

runTests();
