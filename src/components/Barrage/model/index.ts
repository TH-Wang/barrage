import Mock from "mockjs";
import { Text } from "../types";

const Random = Mock.Random;

export function getBulltes(total = 10): Array<Text> {
  const res: Array<Text> = [];
  for (let i = 0; i < total; i++) {
    res.push({
      id: Random.guid(),
      value: i % 3 === 0 ? Random.sentence(3, 5) : Random.csentence(5, 8),
    });
  }
  return res;
}