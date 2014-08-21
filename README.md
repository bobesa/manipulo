Manipulo.js
===========

Simple extension for JavaScript arrays that allows you to group by keys, sort by keys, clear keys and go to path in array/objects combo.

# Todo

- Add clear/getByPath functionality to Object prototype
- Remove objects by including "key"/{key:value} pairs
- Add more tests on clear functionality

# Examples

Those are just some examples of manipulo

## Array.sortBy

Allows you to sort objects in Array by keys

### Single key

```javascript
Array.sortBy( "key" );
```

```javascript
var countries = [
	{country:"Poland",shortcut:"pl"},
	{country:"France",shortcut:"fr"},
	{country:"Czech republic",shortcut:"cs"},
	{country:"Spain",shortcut:"es"}
];

countries.sortBy("country");
```

```javascript
[
	{country:"Czech republic",shortcut:"cs"},
	{country:"France",shortcut:"fr"},
	{country:"Poland",shortcut:"pl"},
	{country:"Spain",shortcut:"es"}
]
```

### Multiple keys

```javascript
Array.sortBy( ["key1", "key2"...] );
```

```javascript
var values = [
	true,
	1,
	"stringie",
	{key:2,value:57},
	{key:1,value:55},
	{key:2,value:56}
];

values.sortBy(["key","value"]);
```

```javascript
[
	1,
	"stringie",
	true,
	{key:1,value:55},
	{key:2,value:56},
	{key:2,value:57}
]
```

## Array.groupBy

Allows you to make collections from object groups by keys. Each value of that key is a single group.

```javascript
Array.groupBy( "key" );
```

```javascript
var values = [
	true,
	"something",
	{category:1,name:"jogurt"},
	{category:1,name:"milk"},
	{category:2,name:"cider"},
	{category:3,name:"game"}
];

values.groupBy("category");
```

```javascript
[
	[ true, "something" ],
	[ {category: 1, name: "jogurt"}, {category: 1, name: "milk"} ],
	[ {category: 2, name: "cider"} ],
	[ {category: 3, name: "game"} ]
]
```

## Array.clear

Allows you to remove fields from all object in Array.
__Key are case insensitive__

### Exactly matching

This will clear just exactly matching field

```javascript
Array.clear( "key" );
```

```javascript
var values = [
	{country:"Poland",shortcut:"pl"},
	{country:"France",shortcut:"fr"},
	{country:"Czech republic",shortcut:"cs"},
	{country:"Spain",shortcut:"es"}
];

values.clear( "country" );
```

```javascript
[
	{shortcut:"pl"},
	{shortcut:"fr"},
	{shortcut:"cs"},
	{shortcut:"es"}
]
```

### Exactly matching + any suffix

This will clear any exactly matching field with any suffix

```javascript
Array.clear( "key*" );
```

```javascript
var values = [
	{countryWithSuffix:"Poland",shortcut:"pl"},
	{country:"France",shortcut:"fr"},
	{country:"Czech republic",shortcut:"cs"},
	{country:"Spain",shortcut:"es"}
];

values.clear( "country*" );
```

```javascript
[
	{shortcut:"pl"},
	{shortcut:"fr"},
	{shortcut:"cs"},
	{shortcut:"es"}
]
```

### Exactly matching + any prefix

This will clear any exactly matching field with any prefix 

```javascript
Array.clear( "*key" );
```

```javascript
var values = [
	{prefixCountry:"Poland",shortcut:"pl"},
	{country:"France",shortcut:"fr"},
	{country:"Czech republic",shortcut:"cs"},
	{country:"Spain",shortcut:"es"}
];

values.clear( "*country" );
```

```javascript
[
	{shortcut:"pl"},
	{shortcut:"fr"},
	{shortcut:"cs"},
	{shortcut:"es"}
]
```

### Including or matching

This will clear any field that includes or matches the key

```javascript
Array.clear( "*key*" );
```

```javascript
var values = [
	{prefixCountry:"Poland",shortcut:"pl"},
	{countrySuffixed:"France",shortcut:"fr"},
	{prefixedCountryAndSuffixed:"Czech republic",shortcut:"cs"},
	{country:"Spain",shortcut:"es"}
];

values.clear( "*country*" );
```

```javascript
[
	{shortcut:"pl"},
	{shortcut:"fr"},
	{shortcut:"cs"},
	{shortcut:"es"}
]
```

## Array.getByPath

Returns object/array on stated path.
- To select item in Array use numbers (starting with 0)
- To select value in Object use key
- Use > between numbers and keys
- If path is not found empty array is returned 

```javascript
Array.getByPath( "path" );
```

```javascript
var values = [
	"notWanted",
	true,
	42,
	[
		{
			data:[
				0,
				{finishLine:true},
				true
			]
		},
		{
			something:123
		}
	]
];

values.getByPath("3>0>data>1");
```

```javascript
{finishLine:true}
```

# Tests

To run test use NodeJS

```bash
$ node manipulo-tests.js
```

```
+ Test passed: Array.clear
+ Test passed: Array.sortBy #1
+ Test passed: Array.sortBy #2
+ Test passed: Array.groupBy
+ Test passed: Array.getByPath
= Tests passed 5/5 = 100.00% success
```
