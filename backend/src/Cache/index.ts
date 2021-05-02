import fs from "fs";
import path from "path";
import CacheItem, {CacheItemValue} from "./CacheItem";

const fileName = process.env.CACHE_FILE || "/tmp/koencache.json";
const ttl: number = process.env.CACHE_TTL ? parseInt(process.env.CACHE_TTL) : (3600 * 4);

type Options = {
	ttl: number
}

const defaultOptions: Options = {ttl};

type CacheData = Record<string, CacheItem | CacheItemValue>;

class Cache {

	private _options: Options = defaultOptions;
	private _cache: CacheData = {};

	constructor(options?: Options) {
		this._options = {...defaultOptions, ...options};
		this._readFileCache();
	}

	length = Object.keys(this._cache).length;

	exists = (key: string): boolean => {
		return !!this._cache?.[key];
	};

	read = (key: string): CacheItemValue | undefined => {
		const data: CacheItem = this._cache?.[key];
		return data && data.isValid() ? data._value : undefined;
	};

	write = (key: string, data: CacheItemValue, options?: Options) => {
		this._cache[key] = new CacheItem(data, options);
		this._saveFileCache();
	};

	delete = (key: string) => {
		delete this._cache[key];
		this._saveFileCache();
	};

	bulkRead = (keys: string[] = []): CacheData => {
		const dataKeys = Object.keys(this._cache).filter(k => keys.length > 0 ? keys.includes(k) : true);
		return dataKeys.reduce((data, key) => {
			const cachedItem = this._cache[key];

			if (cachedItem && cachedItem.isValid()) {
				const value = this._cache[key].getValue();
				return {
					...data,
					[key]: value,
				};
			}
		}, {});
	};

	bulkWrite = (bulkData: Record<string, CacheItemValue>) => {
		const data = Object.keys(bulkData).reduce((result, key) => {
			return {
				...result,
				[key]: new CacheItem(bulkData[key]),
			};
		}, {});

		this._cache = {
			...this._cache,
			...data,
		};
		this._saveFileCache();
	};

	reset = () => {
		this._cache = {};
		this._clearFileCache();
	};

	/* Internal stuff */

	_saveFileCache = () => {
		const data = Object.keys(this._cache).reduce((result, key) => {
			return ({
				...result,
				[key]: this._cache[key].serialize(),
			});
		}, {});
		fs.mkdirSync(path.dirname(fileName), {recursive: true});
		fs.writeFileSync(fileName, JSON.stringify(data), {encoding: "utf8"});
	};

	_readFileCache = () => {
		try {
			const rawData = fs.readFileSync(fileName, {encoding: "utf8"});
			const data = JSON.parse(rawData);
			this._cache = Object.keys(data).reduce((result, key) => {
				return {
					...result,
					[key]: CacheItem.load(data[key]),
				};
			}, {});
		} catch (err) {
			this._cache = {};
		}
	};

	_clearFileCache = () => {
		try {
			fs.unlinkSync(fileName);
		} catch (err) {
			// Doesn't matter
		}
	};

	debug = () => {
		return this._cache;
	};
}

export default Cache;