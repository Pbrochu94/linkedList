import { list, nodeClass } from "./script";

let valuesArr = ["dog", "cat", "parrot", "hamster", "snake", "turtle"];
describe("prepend/append and at functions testing block", () => {
  test("Append add a node at the end of the list", () => {
    valuesArr.forEach((element) => {
      list.append(element);
      expect(list.head.value).toBe(element);
    });
  });
  test("Prepend add to the beginning of the list", () => {
    valuesArr.forEach((element) => {
      list.prepend(element);
      expect(list.tail.value).toBe(element);
    });
  });
  test("at function returns error message if array empty or if index is over array length", () => {
    list.clear();
    for (let i = 0; i < 5; i++) {
      expect(list.at(i)).toBe(`The list is empty.`);
    }
    list.append("Dog");
    expect(list.at(120)).toBe(
      `There is not that many data in the list.(The list contains ${list.length} elements)`,
    );
  });
  test("at function accurately gives the value at asked index", () => {
    for (let i = 0; i < valuesArr.length; i++) {
      list.append(valuesArr[i]);
    }
    expect(list.at(3)).toBe("parrot");
  });
});
describe("pop function testing block", () => {
  test("return error message if list is empty", () => {
    list.clear();
    expect(list.pop()).toBe("The list is empty.");
  });
  test("successfully removes last node in list", () => {
    for (let i = 0; i < valuesArr.length; i++) {
      list.append(valuesArr[i]);
    }
    let length = list.length;
    for (let i = length - 1; i > 0; i--) {
      list.pop();
      expect(list.head.value).toBe(valuesArr[i - 1]);
    }
  });
});
describe("contains function testing block", () => {
  test("return error message if list is empty", () => {
    list.clear();
    expect(list.contains("hamster")).toBe("The list is empty.");
  });
  test("successfully returns true if list contains the value", () => {
    for (let i = 0; i < valuesArr.length; i++) {
      list.append(valuesArr[i]);
    }
    expect(list.contains("hamster")).toBeTruthy();
  });
  test("successfully returns false if list does not contain the value", () => {
    expect(list.contains("Not in list")).toBeFalsy();
  });
});
describe("find function testing block", () => {
  test("return error message if list is empty", () => {
    list.clear();
    expect(list.find("hamster")).toBe("The list is empty.");
  });
  test("successfully returns the index if list contains the asked value", () => {
    for (let i = 0; i < valuesArr.length; i++) {
      list.append(valuesArr[i]);
    }
    list.toString(); //visualize the list in strings
    expect(list.find("hamster")).toBe(4);
  });
  test("successfully returns null if value is not in the list", () => {
    expect(list.find("not in list")).toBeNull();
  });
});
describe("toString function testing block", () => {
  test("return error message if list is empty", () => {
    list.clear();
    expect(list.find("hamster")).toBe("The list is empty.");
  });
  test("successfully returns the index if list contains the asked value", () => {
    let result = [];
    for (let i = 0; i < valuesArr.length; i++) {
      list.append(valuesArr[i]);
      if (i === 0) {
        //for the first element of the list
        result.push(` (${list.tail.value})`);
      } else {
        result.push(`(${valuesArr[i]})`);
      }
    }
    result.push(`${list.head.nextNode}`); //the null at the end
    expect(list.toString()).toBe(result.join(" -> "));
  });
});
describe("insertAt function testing block", () => {
  test("Return out of bound if outside of the list length", () => {
    list.clear();
    let mockFunction = jest.fn((value, index) => {
      let newNode = new nodeClass(value);
      return list.insertAt(newNode, index);
    });
    mockFunction("dragon", 2); //out of the list length
    expect(mockFunction.mock.results[0].value).toBe("Out of bound");
  });
  test("Successfully set the list head/tail if first value is inserted", () => {
    list.clear();
    let mockFunction = jest.fn((value, index) => {
      let newNode = new nodeClass(value);
      list.insertAt(newNode, index);
      return newNode;
    });
    mockFunction("dragon", 1);
    expect(list.tail).toBe(mockFunction.mock.results[0].value);
  });
  test("Successfully insert the value in the correct index", () => {
    list.clear();
    for (let i = 0; i < valuesArr.length; i++) {
      list.append(valuesArr[i]);
    }
    let mockFunction = jest.fn((value, index) => {
      let newNode = new nodeClass(value);
      list.insertAt(newNode, index);
      return newNode;
    });
    mockFunction("dragon", 4);
    expect(list.at(4)).toBe(mockFunction.mock.results[0].value.value);
  });
  test("Return Can't insert at end/start of the list, use append or prepend for that when trying to insert at the edges", () => {
    let mockFunction = jest.fn((value, index) => {
      let newNode = new nodeClass(value);
      return list.insertAt(newNode, index);
    });
    mockFunction("T-rex", 0); //out of the list length
    expect(mockFunction.mock.results[0].value).toBe(
      "Can't insert at end/start of the list, use append or prepend for that.",
    );
  });
});
describe("removeAt function testing block", () => {
  test("return `theres no node to remove` if list is empty", () => {
    list.clear();
    expect(list.removeAt()).toBe("theres no node to remove.");
  });
  test("return `Can't remove at end of list, use pop for that` if trying to remove last data", () => {
    list.append("mammoth");
    expect(list.removeAt(1)).toBe(
      "Can't remove at end of list, use pop for that",
    );
  });
  test("Remove first data if list.length is bigger than 1", () => {
    let listLength = list.length;
    list.append("crow");
    list.removeAt(0);
    expect(list.length).toBe(listLength);
  });
  test("Correctly removes value and rearrange the list", () => {
    for (let i = 0; i < valuesArr.length; i++) {
      list.append(valuesArr[i]);
    }
    let nextNode = list.at(4);
    list.removeAt(3);
    expect(list.at(3)).toBe(nextNode);
  });
});
