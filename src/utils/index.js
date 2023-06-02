import { saveAs } from "file-saver";
import { surpriseMePrompts } from "../constant";

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadDocument(documentId, documentUrl) {
  const response = await fetch(documentUrl);
  const fileBlob = await response.blob();
  saveAs(fileBlob, `result-${documentId}.png`);
}
