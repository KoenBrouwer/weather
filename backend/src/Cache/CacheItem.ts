import d from "dayjs";

type CacheItemOptions = {
	ttl: number;
}

const defaultCacheItemOptions: CacheItemOptions = {
	ttl: 3600,
};

export type CacheItemValue = any;

class CacheItem {

	_value: CacheItemValue;
	_timestamp: Date;
	_options?: CacheItemOptions = defaultCacheItemOptions;

	constructor(value, options?: CacheItemOptions) {
		this._options = {...defaultCacheItemOptions, ...options};
		this._timestamp = d().toDate();
		this._value = value;
	}

	getValue() {
		return this._value;
	}

	isValid() {
		const validThrough = d(this._timestamp).add(this._options.ttl, "s");
		return d().isBefore(validThrough);
	}

	serialize() {
		return {
			value: this._value,
			timestamp: this._timestamp,
			options: this._options,
		};
	}

	static load = (data: any): CacheItem => {
		const {value, options, timestamp} = data;
		let newItem = new CacheItem(value, options);
		newItem._timestamp = d(timestamp).toDate();
		return newItem;
	}

}

export default CacheItem;