import type { Lab } from "../types";
import { weeks } from "./weeks";

const LAB_VERBS = ["Configure", "Verify", "Troubleshoot"];

let labCounter = 0;
const labs: Lab[] = [];

weeks.forEach((week) => {
  week.topics.forEach((topic, ti) => {
    // Every topic gets a primary hands-on lab
    labCounter++;
    labs.push({
      id: `lab-${labCounter}`,
      title: `${LAB_VERBS[ti % LAB_VERBS.length]} ${topic.title}`,
      tool: ti % 3 === 0 ? "GNS3" : "Packet Tracer",
      category: topic.category,
      weekId: week.id,
    });

    // Every other topic gets a second, deeper-dive lab
    if (ti % 2 === 0) {
      labCounter++;
      labs.push({
        id: `lab-${labCounter}`,
        title: `${LAB_VERBS[(ti + 1) % LAB_VERBS.length]} ${topic.title} — Extended`,
        tool: ti % 2 === 0 ? "Packet Tracer" : "GNS3",
        category: topic.category,
        weekId: week.id,
      });
    }
  });

  // One capstone scenario lab per week
  labCounter++;
  labs.push({
    id: `lab-${labCounter}`,
    title: `${week.theme} — Applied Scenario Lab`,
    tool: week.id % 2 === 0 ? "GNS3" : "Packet Tracer",
    category: week.topics[0]?.category ?? "General",
    weekId: week.id,
  });
});

export const allLabs = labs;
export const labCount = labs.length;
