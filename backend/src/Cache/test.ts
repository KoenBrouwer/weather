import Cache from "./index";

describe("Testing cache", () => {

	it("Returns undefined when item doesn't exist", () => {
		const cache = new Cache();
		cache.reset();

		const item = cache.read("myItem");
		expect(item).toBeUndefined();
	});

	it("Returns the value when item exists", () => {
		const cache = new Cache();
		cache.write("myItem", "Yes, it exists");

		const item = cache.read("myItem");
		expect(item).toEqual("Yes, it exists");
	});

	it("Returns false when item doesn't exist", () => {
		const cache = new Cache();
		cache.reset();

		const exists = cache.exists("non-existing-item");
		expect(exists).toBe(false);
	})

	it("Returns true when item exists", () => {
		const cache = new Cache();
		cache.reset();

		cache.write("myItem", "it exists");

		const exists = cache.exists("myItem");
		expect(exists).toBe(true);
	})

	it("Returns the new value when item is changed", () => {
		const cache = new Cache();
		cache.write("myItem", "Yes, it exists");

		const data = cache.read("myItem");
		expect(data).toEqual("Yes, it exists");

		cache.write("myItem", "It still exists, but value changed");
		const data2 = cache.read("myItem");
		expect(data2).toEqual("It still exists, but value changed");
	});

	it("Returns undefined when item is deleted", () => {
		const cache = new Cache();
		cache.write("myItem", "yesyes");

		const data = cache.read("myItem");
		expect(data).toEqual("yesyes");

		cache.delete("myItem");
		const data2 = cache.read("myItem");
		expect(data2).toBeUndefined();
	});

	it("Returns undefined when item is no longer valid", () => {
		const cache = new Cache();
		cache.write("myItem", "yesyes", {
			ttl: -3600,
		});

		const data = cache.read("myItem");
		expect(data).toBeUndefined();
	});

	it("Bulk writes a bunch of data", () => {
		const cache = new Cache();

		cache.bulkWrite({
			myItem: "a value",
			anotherItem: "another value",
		});

		const myItem = cache.read("myItem");
		expect(myItem).toEqual("a value");

		const anotherItem = cache.read("anotherItem");
		expect(anotherItem).toEqual("another value");
	});

	it("Bulk reads a bunch of data", () => {
		const cache = new Cache();
		cache.reset();

		cache.bulkWrite({
			myItem: "a value",
			anotherItem: "another value",
		});

		const data = cache.bulkRead();
		expect(data).toEqual({
			myItem: "a value",
			anotherItem: "another value",
		});

		const data2 = cache.bulkRead(["myItem"]);
		expect(data2).toEqual({
			myItem: "a value",
		});

		const {myItem} = cache.bulkRead(["myItem"]);
		expect(myItem).toEqual("a value");
	});

	it("Initializes with the cache loaded from the cache file", () => {
		const cache = new Cache();

		cache.bulkWrite({
			firstName: "James",
			lastName: "Wright",
		});

		const newCache = new Cache();
		expect(newCache.length).toEqual(cache.length);
	});

});