import { list } from "./script";

describe("Linked list test", () => {
  let valuesArr = ["dog", "cat", "parrot", "hamster", "snake", "turtle"];
  test("Append add a node at the end of the list", () => {
    valuesArr.forEach((element) => {
      list.append(element);
      expect(list.head.value).toBe(element);
    });
  });
});
