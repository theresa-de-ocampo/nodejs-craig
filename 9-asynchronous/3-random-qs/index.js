import fetch from "node-fetch";
import { writeFile, mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, sep } from "path";

const OPEN_TRIVIA_URL = "https://opentdb.com/api.php?type=multiple&amount=1";

const CATEGORIES = {
  GENERAL_KNOWLEDGE: 9,
  COMPUTERS: 18,
  GADGETS: 30
};

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;
const outputFilePath = __dirname + "public" + sep;
const outputFileName = "questions.json";

const results = await Promise.allSettled(
  Object.values(CATEGORIES).map((category) =>
    fetch(`${OPEN_TRIVIA_URL}&category=${category}`)
  )
);

const filteredResults = results.filter(
  (result) => result.status === "fulfilled"
);

const data = await Promise.all(
  filteredResults.map(async (filteredResult) => {
    return await filteredResult.value.json();
  })
);

const questions = data.map((item) => item.results[0]);

try {
  console.log(outputFilePath);
  await mkdir(outputFilePath, { recursive: true });
  await writeFile(
    outputFilePath + outputFileName,
    JSON.stringify(questions, null, 4)
  );
  console.log(`Quiz saved in ${outputFilePath}`);
} catch (error) {
  console.log(error);
}
