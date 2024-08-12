"use server";

import {
  AzureKeyCredential,
  DocumentAnalysisClient,
  DocumentSpan,
  FormRecognizerRequestBody,
} from "@azure/ai-form-recognizer";
import { parseCv } from "./parse/parse";

function* getTextOfSpans(content: string, spans: DocumentSpan[]) {
  for (const span of spans) {
    yield content.slice(span.offset, span.offset + span.length);
  }
}

/*
  Remember to remove the key from your code when you're done, and never post it publicly. For production, use
  secure methods to store and access your credentials. For more information, see 
  https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-security?tabs=command-line%2Ccsharp#environment-variables-and-application-configuration
*/
const endpoint = "https://sthuck-test.cognitiveservices.azure.com/";
const key = process.env.DOCUMENT_AI_KEY!;

export async function analyze(formData: FormData) {
  const file = formData.get("file") as File;
  const prompt = formData.get("prompt") as string;
  console.log("Prompt", typeof prompt, prompt);
  const promptObject = prompt ? JSON.parse(prompt) : undefined;
  console.log("Prompt", typeof promptObject, promptObject);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
  const client = new DocumentAnalysisClient(
    endpoint,
    new AzureKeyCredential(key)
  );
  const poller = await client.beginAnalyzeDocument("prebuilt-read", buffer);

  const { content, pages, languages, styles, paragraphs } =
    await poller.pollUntilDone();

  // return { languages, paragraphs };
  const response = await parseCv(content, promptObject);
  return {
    parsed: response.choices[0].message.content,
    rawCv: content,
    languages,
  };
  // if (!pages) {
  //   console.log("No pages were extracted from the document.");
  // } else if (pages.length <= 0) {
  //   console.log("No pages were extracted from the document.");
  // } else {
  //   console.log("Pages:");
  //   for (const page of pages) {
  //     console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
  //     console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
  //     console.log(`  ${page.lines?.length} lines, ${page.words?.length} words`);

  //     if (page.lines && page.lines.length > 0) {
  //       console.log("  Lines:");

  //       for (const line of page?.lines || []) {
  //         console.log(`  - "${line.content}"`);

  //         // The words of the line can also be iterated independently. The words are computed based on their
  //         // corresponding spans.
  //         for (const word of line.words()) {
  //           console.log(`    - "${word.content}"`);
  //         }
  //       }
  //     }
  //   }
  // }

  // if (!languages || languages.length <= 0) {
  //   console.log("No language spans were extracted from the document.");
  // } else {
  //   console.log("Languages:");
  //   for (const languageEntry of languages) {
  //     console.log(
  //       `- Found language: ${languageEntry.locale} (confidence: ${languageEntry.confidence})`
  //     );
  //     for (const text of getTextOfSpans(content, languageEntry.spans)) {
  //       const escapedText = text.replace(/\r?\n/g, "\\n").replace(/"/g, '\\"');
  //       console.log(`  - "${escapedText}"`);
  //     }
  //   }
  // }

  // if (!styles || styles.length <= 0) {
  //   console.log("No text styles were extracted from the document.");
  // } else {
  //   console.log("Styles:");
  //   for (const style of styles) {
  //     console.log(
  //       `- Handwritten: ${style.isHandwritten ? "yes" : "no"} (confidence=${
  //         style.confidence
  //       })`
  //     );

  //     for (const word of getTextOfSpans(content, style.spans)) {
  //       console.log(`  - "${word}"`);
  //     }
  //   }
  // }
  // return { content, pages, languages, styles };
}
